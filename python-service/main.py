from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import tempfile
import os
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.datamodel.pipeline_options import PdfPipelineOptions

app = FastAPI(title="Docling Extraction Service")

SUPPORTED_EXTENSIONS = {
    ".pdf", ".docx", ".doc", ".pptx", ".ppt",
    ".xlsx", ".xls", ".html", ".htm", ".md", ".txt",
    ".png", ".jpg", ".jpeg", ".tiff", ".bmp",
}

def get_extension_from_url(url: str) -> str:
    """Extract file extension from URL, default to .pdf if unknown."""
    path = url.split("?")[0]
    _, ext = os.path.splitext(path.lower())
    return ext if ext in SUPPORTED_EXTENSIONS else ".pdf"

class ExtractRequest(BaseModel):
    cloudinary_url: str
    document_id: str
    mime_type: str | None = None

class ExtractResponse(BaseModel):
    document_id: str
    extracted_text: str

@app.get("/")
def health():
    return {"status": "ok", "service": "docling-extractor"}

@app.post("/extract", response_model=ExtractResponse)
async def extract(req: ExtractRequest):
    print("===== NEW PYTHON CODE IS RUNNING =====")
    """
    Downloads a document from Cloudinary and extracts its text using Docling.
    Supports PDF, DOCX, PPTX, XLSX, HTML, Markdown, images, and more.
    Returns the extracted text as markdown.
    """

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            print("Downloading:", req.cloudinary_url)
            response = await client.get(req.cloudinary_url,follow_redirects=True)
            print("Status:", response.status_code)
            print("Headers:", response.headers)
            print("Body:", response.text[:500])
            response.raise_for_status()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"Failed to download file: {e}")

    ext = get_extension_from_url(req.cloudinary_url)

    with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
        tmp.write(response.content)
        tmp_path = tmp.name

    try:

        is_pdf = ext == ".pdf"
        if is_pdf:
            pipeline_options = PdfPipelineOptions()
            pipeline_options.do_ocr = False
            converter = DocumentConverter(
                format_options={"pdf": PdfFormatOption(pipeline_options=pipeline_options)}
            )
        else:
            converter = DocumentConverter()

        result = converter.convert(tmp_path)
        extracted_text = result.document.export_to_markdown()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Docling extraction failed: {e}")
    finally:
        os.unlink(tmp_path)

    return ExtractResponse(
        document_id=req.document_id,
        extracted_text=extracted_text,
    )
