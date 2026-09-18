import React, { useEffect, useRef, useState } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import { makeAuthFetch } from '../lib/authFetch'


const statusConfig = {
  done: { label: 'Done', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  pending: { label: 'Pending', cls: 'bg-yellow-100  text-yellow-700  border-yellow-200' },
  uploading: { label: 'Uploading', cls: 'bg-blue-100    text-blue-700    border-blue-200' },
  extracting: { label: 'Extracting', cls: 'bg-purple-100  text-purple-700  border-purple-200' },
  embedding: { label: 'Embedding', cls: 'bg-indigo-100  text-indigo-700  border-indigo-200' },
  indexing: { label: 'Indexing', cls: 'bg-cyan-100    text-cyan-700    border-cyan-200' },
  failed: { label: 'Failed', cls: 'bg-red-100     text-red-700     border-red-200' },
}


const FileIcon = ({ className = 'w-7 h-7' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
)
const PlusIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
)
const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)
const UploadIcon = () => (
  <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
)


function UploadDialog({ open, onClose, authFetch, onSuccess }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [status, Setstatus] = useState(null)
  const fileRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !file) return
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', name.trim())
      formData.append('description', description.trim())


      const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
      const res = await authFetch(`${API}/api/documents`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      onSuccess(data)
      Setstatus(data.status)

      setName(''); setDescription(''); setFile(null)
      onClose()
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-10">
        {}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
              <FileIcon className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">New Document</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Resume"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description..."
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition resize-none"
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Document <span className="text-red-500">*</span></label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); setFile(e.dataTransfer.files[0]) }}
              onClick={() => fileRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-2 py-6 rounded-xl border-2 border-dashed cursor-pointer transition ${dragOver ? 'border-purple-400 bg-purple-50' : file ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
            >
              <UploadIcon />
              {file
                ? <p className="text-sm font-medium text-emerald-700">{file.name}</p>
                : <>
                  <p className="text-sm font-medium text-slate-600">Drag & drop or <span className="text-purple-600">browse</span></p>
                  <p className="text-xs text-slate-400">PDF, DOCX, PPTX, images and more</p>
                </>
              }
              <input ref={fileRef} type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            </div>
          </div>

          {}
          <button
            type="submit"
            disabled={submitting || !name.trim() || !file}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:shadow-lg hover:shadow-purple-200 hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {submitting ? 'Uploading...' : 'Generate →'}
          </button>
        </form>
      </div>
    </div>
  )
}


const Dashboard = () => {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const authFetch = makeAuthFetch(getToken)

  useEffect(() => {
    if (!isLoaded || !user) return

    const fetchDocuments = async () => {
      try {
        const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
        const res = await authFetch(`${API}/api/documents/user/${user.id}`)
        if (!res.ok) throw new Error('Failed to fetch documents')
        const data = await res.json()
        setDocuments(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [isLoaded, user])

  const handleUploadSuccess = (newDoc) => {

    setDocuments((prev) => [{ _id: newDoc.documentId, name: 'Processing…', status: 'pending', createdAt: new Date().toISOString(), chunkCount: 0 }, ...prev])
  }


  const TERMINAL = ['done', 'failed']
  const MAX_BACKOFF_MS = 30_000

  useEffect(() => {
    const inProgress = documents.filter((d) => !TERMINAL.includes(d.status))
    if (inProgress.length === 0) return

    const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'


    const controllers = inProgress.map((doc) => {
      let es = null
      let retryDelay = 1000
      let unmounted = false
      let retryTimer = null

      const connect = async () => {
        if (unmounted) return
        try {
          const token = await getToken()
          const url = `${API}/api/documents/${doc._id}/status-stream${token ? `?token=${encodeURIComponent(token)}` : ''}`
          es = new EventSource(url)

          es.onmessage = (e) => {
            try {
              const updated = JSON.parse(e.data)
              setDocuments((prev) =>
                prev.map((d) => (d._id === updated._id ? { ...d, ...updated } : d))
              )
              if (TERMINAL.includes(updated.status)) {
                es.close()

              }
            } catch {  }
          }

          es.onopen = () => {

            retryDelay = 1000
          }

          es.onerror = () => {
            es.close()
            if (unmounted) return

            retryTimer = setTimeout(() => {
              retryDelay = Math.min(retryDelay * 2, MAX_BACKOFF_MS)
              connect()
            }, retryDelay)
          }
        } catch {  }
      }

      connect()

      return {
        close: () => {
          unmounted = true
          clearTimeout(retryTimer)
          es?.close()
        },
      }
    })

    return () => controllers.forEach((c) => c.close())
  }, [documents.map((d) => d._id + d.status).join(',')])

  if (!isLoaded || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-t-transparent border-purple-500 rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Loading your documents...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 pt-20">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">My Documents</h1>
            <p className="text-slate-500 mt-1 text-sm">
              {documents.length > 0
                ? `${documents.length} document${documents.length !== 1 ? 's' : ''} • click any card to chat`
                : 'Upload your first document to get started'}
            </p>
          </div>

          {}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {}
          {!error && documents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-4">
                <FileIcon className="w-8 h-8 text-purple-500" />
              </div>
              <h2 className="text-lg font-semibold text-slate-700">No documents yet</h2>
              <p className="text-slate-400 text-sm mt-1">Click the + button to upload your first document</p>
            </div>
          )}

          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {documents.map((doc) => {
              const status = statusConfig[doc.status] ?? { label: doc.status, cls: 'bg-slate-100 text-slate-600 border-slate-200' }
              return (
                <Link
                  to={`/chat/${doc._id}`}
                  key={doc._id}
                  className="group relative bg-white border border-slate-300 rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-lg hover:border-purple-300 hover:-translate-y-0.5 hover:scale-105 hover:z-20 transition-all duration-300 cursor-pointer no-underline"
                >
                  {}
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center">
                      <FileIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${status.cls}`}>
                      {status.label}
                    </span>
                  </div>

                  {}
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2">
                      {doc.name || 'Uploading…'}
                    </h3>
                    {doc.description && (
                      <p className="text-slate-400 text-xs mt-1 line-clamp-2">{doc.description}</p>
                    )}
                  </div>

                  {}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-50">
                    <span>{doc.chunkCount ? `${doc.chunkCount} chunks` : '—'}</span>
                    <span>{new Date(doc.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {}
      <button
        onClick={() => setDialogOpen(true)}
        title="Upload new document"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xl shadow-purple-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-300 transition-all duration-200 flex items-center justify-center z-40"
      >
        <PlusIcon />
      </button>

      {}
      <UploadDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        authFetch={authFetch}
        onSuccess={handleUploadSuccess}
      />
    </>
  )
}

export default Dashboard
