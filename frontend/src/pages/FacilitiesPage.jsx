import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';


const facilities = [
  {
    icon: '🤖',
    title: 'AI Document Analysis',
    desc: 'Upload any government document — PDF, image, or scanned copy. Our AI reads it and extracts the key obligations, deadlines, and required actions automatically.',
    points: ['Supports 20+ document types', 'Reads handwritten forms via OCR', 'Extracts key dates & penalties', 'Flags urgent action items'],
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    icon: '🗺️',
    title: 'Visual Decision Trees',
    desc: 'Complex procedures become clear flowcharts. See exactly which path applies to your situation with branch-by-branch visual guides you can follow step by step.',
    points: ['Interactive flow diagrams', 'Condition-based branching', 'Printable visual guides', 'DAG-based backend logic'],
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    icon: '🌐',
    title: 'Multilingual Support',
    desc: 'All guidance is available in 12 regional Indian languages. Switch language at any time and see every explanation, checklist, and label in your preferred tongue.',
    points: ['Hindi, Bengali, Tamil, Telugu', 'Kannada, Malayalam, Marathi', 'Gujarati, Punjabi & more', 'Language auto-detection'],
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: '🔊',
    title: 'Voice Guidance',
    desc: 'For users who prefer audio assistance, our voice-guided mode reads out every step, document name, and instruction clearly in the selected regional language.',
    points: ['Natural-sounding TTS voice', 'Pauseable step-by-step audio', 'Works offline on mobile', 'Screen reader compatible'],
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: '📋',
    title: 'Document Checklist Generator',
    desc: 'Stop guessing what documents to bring. Our smart checklist builder generates a personalized list of required documents based on your specific case.',
    points: ['Situation-specific checklists', 'Downloadable PDF format', 'Share via WhatsApp/Email', 'Checklist progress tracking'],
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: '🔗',
    title: 'Direct Portal Links',
    desc: 'No more searching the internet for government portals. Every procedure comes with verified, direct links to the correct official government website or form.',
    points: ['Verified official links only', 'State-specific portal routing', 'Links to downloadable forms', 'Regularly audited for accuracy'],
    color: 'from-rose-500 to-pink-500',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },
  {
    icon: '💬',
    title: 'Plain-Language Simplification',
    desc: 'Legal and bureaucratic language is automatically converted into simple, plain English (or your regional language) so anyone can understand what a notice means.',
    points: ['Reading level: Grade 6', 'Glossary for legal terms', 'Section-wise breakdown', 'Summary in 3 bullets'],
    color: 'from-indigo-500 to-blue-500',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
  {
    icon: '📅',
    title: 'Deadline & Reminder Alerts',
    desc: 'Never miss a filing deadline. Set reminders for tax due dates, license renewals, court dates, or any government compliance deadline.',
    points: ['Email & SMS reminders', 'Calendar integration', 'Compliance calendar view', 'Auto-repeating annual alerts'],
    color: 'from-fuchsia-500 to-purple-500',
    bg: 'bg-fuchsia-50',
    border: 'border-fuchsia-100',
  },
];

const comparisonRows = [
  { feature: 'Understand legal notices', before: '❌ Requires a lawyer (₹2000+)', after: '✅ Free, instant AI explanation' },
  { feature: 'Know which documents to bring', before: '❌ Multiple office visits to find out', after: '✅ Smart checklist in 30 seconds' },
  { feature: 'Find the right government office', before: '❌ Ask 5 people, get 5 answers', after: '✅ Direct portal link provided' },
  { feature: 'Language accessibility', before: '❌ Only in official language', after: '✅ 12 regional languages available' },
  { feature: 'Step-by-step guidance', before: '❌ No structured guidance', after: '✅ Visual decision tree walkthrough' },
  { feature: 'Deadline tracking', before: '❌ Easy to miss, leads to fines', after: '✅ Automated reminder system' },
  { feature: 'Accessibility for differently-abled', before: '❌ No support', after: '✅ Voice guidance & screen reader' },
];

const pricingPlans = [
  {
    name: 'Citizen',
    price: 'Free',
    period: 'Forever',
    desc: 'For individuals navigating personal government procedures.',
    features: ['10 procedure searches/month', 'Document checklist generation', 'Multilingual support', 'Official portal links', 'Community Q&A access'],
    cta: 'Get Started Free',
    href: '/signup',
    highlight: false,
    color: 'border-slate-200',
  },
  {
    name: 'Pro Citizen',
    price: '₹199',
    period: 'per month',
    desc: 'For power users and professionals handling multiple procedures.',
    features: ['Unlimited procedure searches', 'AI document upload & analysis', 'Voice guidance in all languages', 'Deadline reminder system', 'Priority support', 'PDF export of guides'],
    cta: 'Start 7-Day Trial',
    href: '/signup',
    highlight: true,
    color: 'border-purple-400',
  },
  {
    name: 'Community / NGO',
    price: '₹999',
    period: 'per month',
    desc: 'For organizations helping multiple citizens at scale.',
    features: ['10 team member accounts', 'Bulk document processing', 'Custom language packs', 'Analytics dashboard', 'Dedicated account manager', 'API access for integration'],
    cta: 'Contact Us',
    href: '/about',
    highlight: false,
    color: 'border-slate-200',
  },
];


function FeatureCard({ f }) {
  return (
    <div className={`relative p-6 rounded-2xl border ${f.bg} ${f.border} hover:shadow-xl hover:-translate-y-1 hover:scale-105 hover:z-20 transition-all duration-300 group`}>
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-110 transition-transform notranslate leading-none`}>
        {f.icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">{f.desc}</p>
      <ul className="space-y-1.5">
        {f.points.map((pt) => (
          <li key={pt} className="flex items-center gap-2 text-sm text-slate-600">
            <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-xs flex-shrink-0 shadow-sm">✓</span>
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans">
      <Navbar />

{}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-28 pb-16 px-4 text-center bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-100 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-slate-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md text-indigo-700 text-sm font-medium mb-4 border border-slate-200 shadow-sm">
            Everything You Need
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            Powerful Facilities for <br className="hidden sm:block" />
            Every Citizen
          </h1>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            From AI document analysis to multilingual voice guidance — CitizenBridge is a complete toolkit for navigating government complexity.
          </p>
        </div>
      </motion.section>

      {}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1, duration: 0.6 }}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3">Our Core Facilities</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Eight powerful tools working together to make government procedures accessible.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((f) => <FeatureCard key={f.title} f={f} />)}
          </div>
        </div>
      </motion.section>

      {}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-20 px-4 bg-slate-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3">Before vs. After CitizenBridge</h2>
            <p className="text-slate-500 max-w-xl mx-auto">The difference is night and day.</p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-purple-100 shadow-xl">
            {}
            <div className="grid grid-cols-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-sm font-bold">
              <div className="p-4">Scenario</div>
              <div className="p-4 text-center border-l border-white/20">❌ Without CitizenBridge</div>
              <div className="p-4 text-center border-l border-white/20">✅ With CitizenBridge</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-t border-slate-100`}
              >
                <div className="p-4 font-medium text-slate-700">{row.feature}</div>
                <div className="p-4 text-slate-500 border-l border-slate-100">{row.before}</div>
                <div className="p-4 text-slate-700 border-l border-slate-100 font-medium">{row.after}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3">Simple, Honest Pricing</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Core features are free for all citizens. Upgrade only if you need more.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-3xl border-2 ${plan.color} ${plan.highlight ? 'bg-gradient-to-br from-purple-700 to-violet-800 text-white shadow-2xl shadow-purple-200 scale-105' : 'bg-white shadow-md'} transition-all duration-300`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-amber-900 text-xs font-black">
                    MOST POPULAR
                  </div>
                )}
                <h3 className={`font-extrabold text-lg mb-1 ${plan.highlight ? 'text-white' : 'text-slate-800'}`}>{plan.name}</h3>
                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-slate-800'} notranslate`}>{plan.price}</span>
                  <span className={`text-sm mb-1 ${plan.highlight ? 'text-purple-200' : 'text-slate-400'}`}>/{plan.period}</span>
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-purple-200' : 'text-slate-500'}`}>{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-purple-100' : 'text-slate-600'}`}>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${plan.highlight ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-600'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.href}
                  className={`block text-center py-3 rounded-2xl font-bold text-sm transition-all duration-200 ${
                    plan.highlight
                      ? 'bg-white text-purple-700 hover:bg-purple-50 hover:shadow-lg'
                      : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:shadow-lg hover:shadow-purple-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 bg-purple-50"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Frequently Asked Questions</h2>
          </div>
          {[
            { q: 'Is CitizenBridge affiliated with the government?', a: 'No. CitizenBridge is an independent civic-tech platform. We do not represent any government body. All information is for guidance purposes only.' },
            { q: 'Is my uploaded document safe?', a: 'Yes. Documents are encrypted in transit and at rest. We do not store personal documents beyond your session unless you choose to save them to your account.' },
            { q: 'How accurate is the AI analysis?', a: 'Our AI is trained on thousands of government procedure documents and achieves high accuracy. However, always verify critical legal deadlines with the official portal.' },
            { q: 'Which languages are supported?', a: 'Currently: English, Hindi, Bengali, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Punjabi, Odia, and Assamese. More being added.' },
            { q: 'Can I use this on mobile?', a: 'Absolutely. CitizenBridge is fully responsive and works on any smartphone browser. A native app is in development.' },
          ].map((faq, i) => (
            <details key={i} className="group mb-3 p-5 rounded-2xl bg-white border border-purple-100 shadow-sm cursor-pointer hover:shadow-md transition">
              <summary className="font-semibold text-slate-700 flex items-center justify-between list-none">
                {faq.q}
                <span className="ml-4 text-purple-500 group-open:rotate-180 transition-transform duration-200 flex-shrink-0">▼</span>
              </summary>
              <p className="mt-3 text-slate-500 text-sm leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </motion.section>
    </div>
  );
}