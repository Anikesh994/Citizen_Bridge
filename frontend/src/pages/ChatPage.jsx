import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { makeAuthFetch } from '../lib/authFetch'


const BackIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)
const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)
const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
)
const MicIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
)

const statusConfig = {
  done: { label: 'Done', cls: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Pending', cls: 'bg-yellow-100  text-yellow-700' },
  uploading: { label: 'Uploading', cls: 'bg-blue-100    text-blue-700' },
  extracting: { label: 'Extracting', cls: 'bg-purple-100  text-purple-700' },
  embedding: { label: 'Embedding', cls: 'bg-indigo-100  text-indigo-700' },
  indexing: { label: 'Indexing', cls: 'bg-cyan-100    text-cyan-700' },
  failed: { label: 'Failed', cls: 'bg-red-100     text-red-700' },
}


function AskPanel({ documentId, authFetch, onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef()

  const sendMessage = async () => {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: q }])
    setLoading(true)
    try {
      const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/chat/${documentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', text: data.answer, sources: data.sources }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Something went wrong. Try again.' }])
    } finally {
      setLoading(false)
    }
  }
  const [isListening, setIsListening] = useState(false)

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Your browser does not support Speech Recognition.");
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => (prev ? prev + ' ' + transcript : transcript));
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  }

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  return (
    <div className="flex flex-col h-full bg-purple-50 shadow-inner">
      {}
      <div className="flex items-center justify-between px-5 py-4 border-b border-purple-100 shrink-0 bg-purple-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-violet-600 shadow-sm shadow-purple-200">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 leading-tight">Ask the Document</p>
            <p className="text-xs text-slate-500 mt-0.5">AI-powered answers</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition">
          <CloseIcon />
        </button>
      </div>

      {}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-purple-100 border border-purple-200">
              <svg className="w-7 h-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-700">Ask anything about this document</p>
            <p className="text-xs text-slate-500 max-w-[250px]">I will search through the content and give you answers</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`shadow-sm max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === 'user'
                ? 'bg-slate-800 text-white rounded-br-sm'
                : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
              }`}>
              {m.role === 'assistant' && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">CitizenBridge AI</p>}
              {m.text}
              {m.sources?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sources</p>
                  {m.sources.map((s, si) => (
                    <div key={si} className="text-xs px-3 py-2 rounded-lg italic line-clamp-2 bg-slate-50 border-l-2 border-purple-400 text-slate-600">
                      {s.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-bl-sm px-5 py-4 flex gap-1.5 items-center">
              {[0, 1, 2].map((i) => <span key={i} className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {}
      <div className="px-5 py-4 border-t border-purple-100 bg-white">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask a question..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />
          <button
            onClick={startListening}
            className={`p-3 rounded-xl transition ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            title="Use Microphone"
          >
            <MicIcon />
          </button>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="p-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 hover:shadow-md hover:scale-105 transition disabled:opacity-40 disabled:hover:scale-100"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  )
}


function FlowPanel({ documentId, authFetch, onClose }) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [flow, setFlow] = useState(null)
  const [expandedSteps, setExpandedSteps] = useState({})

  const generate = async () => {
    const q = query.trim()
    if (!q || loading) return
    setLoading(true)
    setFlow(null)
    setExpandedSteps({})
    try {
      const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/flow/${documentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      const data = await res.json()
      setFlow(data)
    } catch {
      setFlow({ error: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const toggleStep = (key) => setExpandedSteps(prev => ({ ...prev, [key]: !prev[key] }))

  const [isListening, setIsListening] = useState(false)

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Your browser does not support Speech Recognition.");
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(prev => (prev ? prev + ' ' + transcript : transcript));
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  }

  return (
    <div className="flex flex-col h-full bg-purple-50 shadow-inner">

      {}
      <div className="flex items-center justify-between px-5 py-4 shrink-0 border-b border-purple-100 bg-purple-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-violet-600 shadow-sm shadow-purple-200">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 leading-tight">Generate Flow</p>
            <p className="text-xs mt-0.5 text-slate-500">Action plan from your document</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition">
          <CloseIcon />
        </button>
      </div>

      {}
      <div className="px-5 py-4 shrink-0 border-b border-purple-100 bg-white">
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generate()}
            placeholder="What is your goal? (e.g., How to apply?)"
            className="flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none border border-slate-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
          />
          <button
            onClick={startListening}
            className={`p-3 rounded-xl transition ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            title="Use Microphone"
          >
            <MicIcon />
          </button>
          <button
            onClick={generate}
            disabled={!query.trim() || loading}
            className="px-5 py-2.5 rounded-xl gap-2 font-semibold text-sm text-white hover:shadow-md hover:scale-[1.02] active:scale-95 transition disabled:opacity-40 disabled:hover:scale-100 flex items-center justify-center bg-slate-800 hover:bg-slate-700"
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Generate'}
          </button>
        </div>
      </div>

      {}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {!flow && !loading && (
          <p className="text-slate-400 text-sm text-center mt-10">Enter a goal above to generate a plan</p>
        )}
        {loading && (
          <div className="flex flex-col items-center gap-3 mt-12">
            <div className="w-8 h-8 border-2 border-t-transparent border-purple-500 rounded-full animate-spin" />
            <p className="text-slate-500 font-medium text-sm">Generating your flow…</p>
          </div>
        )}
        {flow?.error && <p className="text-red-500 text-sm p-4 bg-red-50 border border-red-100 rounded-xl">{flow.error}</p>}
        {flow && !flow.error && (
          <div className="animate-fade-in">
            <h3 className="text-lg font-bold text-slate-800 mb-1">{flow.title}</h3>
            <p className="text-slate-500 text-sm mb-6">{flow.description}</p>
            <div className="space-y-4 pb-10">
              {Object.entries(flow.flow ?? {}).map(([key, step], idx) => {
                const isOpen = expandedSteps[key]
                return (
                  <div key={key} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
                    {}
                    <button
                      onClick={() => toggleStep(key)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 shrink-0 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          {idx + 1}
                        </div>
                        <h4 className="font-semibold text-slate-800 text-sm flex-1">{step.name}</h4>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        {step.time && (
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full uppercase tracking-widest hidden sm:block">{step.time}</span>
                        )}
                        <svg className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {}
                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="p-5 border-t border-slate-200 text-slate-700 text-sm leading-relaxed bg-white">
                          {step.do}
                          {step.time && (
                            <div className="sm:hidden mt-3 inline-block text-[10px] items-center font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full uppercase tracking-widest">{step.time}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


export default function ChatPage() {
  const { documentId } = useParams()
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const authFetch = makeAuthFetch(getToken)

  const [doc, setDoc] = useState(null)
  const [loading, setLoading] = useState(true)
  const [panel, setPanel] = useState(null)

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
        const res = await authFetch(`${API}/api/documents/${documentId}`)
        const data = await res.json()
        setDoc(data)
      } catch {
        setDoc(null)
      } finally {
        setLoading(false)
      }
    }
    fetchDoc()
  }, [documentId])

  const status = doc ? (statusConfig[doc.status] ?? { label: doc.status, cls: 'bg-slate-100 text-slate-600' }) : null

  return (
    <>
      <div className="fixed inset-0 z-50 flex flex-col bg-slate-50 overflow-hidden">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-t-transparent border-purple-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">

            {}
            <div className="w-1/2 flex flex-col border-r border-slate-200 bg-white overflow-hidden">
              {}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 shrink-0">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-purple-600 transition"
                >
                  <BackIcon /> Back
                </button>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 truncate max-w-[200px]">{doc?.name ?? 'Document'}</span>
                  {status && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${status.cls}`}>{status.label}</span>
                  )}
                </div>
                {doc?.cloudinaryUrl && (
                  <a
                    href={doc.cloudinaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-purple-600 hover:underline shrink-0"
                  >
                    Open ↗
                  </a>
                )}
              </div>

              {}
              <div className="flex-1 overflow-hidden bg-slate-100">
                {!doc ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-slate-400 text-sm">Document not found.</p>
                  </div>
                ) : !doc.cloudinaryUrl ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-slate-400 text-sm">No file preview available.</p>
                  </div>
                ) : (() => {
                  const url = doc.cloudinaryUrl
                  const ext = url.split('?')[0].split('.').pop().toLowerCase()
                  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext)
                  const isPdf = ext === 'pdf'

                  if (isPdf) return (
                    <iframe
                      src={url}
                      title={doc.name}
                      className="w-full h-full border-0"
                      allow="fullscreen"
                    />
                  )
                  if (isImage) return (
                    <div className="h-full flex items-center justify-center p-4 overflow-auto">
                      <img
                        src={url}
                        alt={doc.name}
                        className="max-w-full max-h-full object-contain rounded-xl shadow"
                      />
                    </div>
                  )

                  return (
                    <iframe
                      src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
                      title={doc.name}
                      className="w-full h-full border-0"
                    />
                  )
                })()}
              </div>
            </div>

            {}
            <div className="w-1/2 flex flex-col relative overflow-hidden">

              {}
              {!panel && (
                <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
                  <div className="text-center mb-2">
                    <h2 className="text-xl font-bold text-slate-800">What would you like to do?</h2>
                    <p className="text-slate-400 text-sm mt-1">Choose an action for this document</p>
                  </div>

                  {}
                  <button
                    onClick={() => setPanel('ask')}
                    disabled={doc?.status !== 'done'}
                    className="w-full max-w-xs p-5 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-100 bg-white group transition-all duration-200 text-left disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-1">Ask</h3>
                    <p className="text-slate-500 text-xs">Chat with the document using AI. Get instant answers from the content.</p>
                  </button>

                  {}
                  <button
                    onClick={() => setPanel('flow')}
                    disabled={doc?.status !== 'done'}
                    className="w-full max-w-xs p-5 rounded-2xl border-2 border-violet-200 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-100 bg-white group transition-all duration-200 text-left disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-1">Flow</h3>
                    <p className="text-slate-500 text-xs">Generate a step-by-step action plan from the document content.</p>
                  </button>

                  {doc?.status !== 'done' && (
                    <p className="text-xs text-slate-400 text-center">Document must finish processing before you can use these features.</p>
                  )}
                </div>
              )}

              {}
              {panel === 'ask' && (
                <AskPanel documentId={documentId} authFetch={authFetch} onClose={() => setPanel(null)} />
              )}

              {}
              {panel === 'flow' && (
                <FlowPanel documentId={documentId} authFetch={authFetch} onClose={() => setPanel(null)} />
              )}
            </div>

          </div>
        )}
      </div>
    </>
  )
}
