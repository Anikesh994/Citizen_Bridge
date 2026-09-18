import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';


const categories = [
  { id: 'all', label: 'All', emoji: '🗂️' },
  { id: 'property', label: 'Property', emoji: '🏠' },
  { id: 'tax', label: 'Tax & Finance', emoji: '📊' },
  { id: 'travel', label: 'Travel & Visa', emoji: '✈️' },
  { id: 'business', label: 'Business', emoji: '🏢' },
  { id: 'education', label: 'Education', emoji: '🎓' },
  { id: 'legal', label: 'Legal', emoji: '⚖️' },
  { id: 'social', label: 'Social Welfare', emoji: '🤝' },
  { id: 'health', label: 'Health', emoji: '🏥' },
];

const procedures = [
  {
    id: 1, category: 'property',
    title: 'Property Registration',
    desc: 'Register your property with sub-registrar office including title verification, stamp duty payment, and deed execution.',
    steps: 7, time: '3–7 days', difficulty: 'Medium',
    tags: ['Land Records', 'Sub-Registrar', 'Stamp Duty'],
    icon: '🏠', portal: 'https://revenue.delhi.gov.in/revenue/property-registration',
    docs: ['Sale Deed', 'EC Certificate', 'PAN Card', 'Identity Proof', 'Property Tax Receipt'],
  },
  {
    id: 2, category: 'property',
    title: 'Land Mutation (Khata Transfer)',
    desc: 'Transfer ownership of land records in municipal records after sale or inheritance.',
    steps: 5, time: '15–30 days', difficulty: 'Medium',
    tags: ['Khata', 'Mutation', 'Revenue Dept'],
    icon: '📜', portal: 'https://services.india.gov.in/service/detail/apply-for-mutation-of-revenue-records-jammu-and-kashmir',
    docs: ['Sale Deed', 'Encumbrance Certificate', 'Tax Receipts', 'Affidavit'],
  },
  {
    id: 3, category: 'tax',
    title: 'Income Tax Return (ITR) Filing',
    desc: 'File your annual income tax return online using the Income Tax e-filing portal.',
    steps: 6, time: '1–2 hours', difficulty: 'Easy',
    tags: ['ITR', 'E-Filing', 'Refund'],
    icon: '📊', portal: 'https://www.incometax.gov.in/iec/foportal/',
    docs: ['Form 16', 'PAN Card', 'Bank Statements', 'Form 26AS'],
  },
  {
    id: 4, category: 'tax',
    title: 'GST Registration',
    desc: 'Register your business for Goods and Services Tax. Mandatory for turnover above ₹20 lakhs.',
    steps: 8, time: '5–7 working days', difficulty: 'Medium',
    tags: ['GST', 'GSTIN', 'Business'],
    icon: '💼', portal: 'https://www.gst.gov.in/',
    docs: ['Aadhaar', 'PAN', 'Bank Statement', 'Business Address Proof', 'Trade License'],
  },
  {
    id: 5, category: 'travel',
    title: 'Passport Application (Fresh)',
    desc: 'Apply for a new Indian passport through the Passport Seva portal with police verification.',
    steps: 5, time: '7–30 days', difficulty: 'Easy',
    tags: ['Passport Seva', 'MEA', 'Police Verification'],
    icon: '🛂', portal: 'https://www.passportindia.gov.in',
    docs: ['Aadhaar', 'Birth Certificate', 'Class 10 Certificate', 'Address Proof'],
  },
  {
    id: 6, category: 'travel',
    title: 'Visa Application (Tourist)',
    desc: 'Apply for tourist visa through Indian e-Visa portal or at respective country embassy.',
    steps: 6, time: '3–15 days', difficulty: 'Medium',
    tags: ['e-Visa', 'Embassy', 'Tourism'],
    icon: '✈️', portal: 'https://www.passportindia.gov.in/psp/ApplyPassport',
    docs: ['Passport', 'Photographs', 'Bank Statement', 'Travel Itinerary', 'Hotel Booking'],
  },
  {
    id: 7, category: 'business',
    title: 'MSME / Udyam Registration',
    desc: 'Register your micro, small, or medium enterprise on the Udyam portal for government benefits.',
    steps: 4, time: 'Same Day', difficulty: 'Easy',
    tags: ['Udyam', 'MSME', 'Subsidies'],
    icon: '🏭', portal: 'https://udyamregistration.gov.in/PrintUdyamApplication.aspx',
    docs: ['Aadhaar', 'PAN', 'GSTIN (if applicable)'],
  },
  {
    id: 8, category: 'business',
    title: 'FSSAI Food License',
    desc: 'Get Food Safety and Standards Authority of India license to operate a food business legally.',
    steps: 7, time: '30–60 days', difficulty: 'Hard',
    tags: ['Food Safety', 'FSSAI', 'License'],
    icon: '🍽️', portal: 'https://foscos.fssai.gov.in/apply-for-lic-and-reg',
    docs: ['Identity Proof', 'Address Proof', 'Site Plan', 'NOC from Municipality', 'Water Analysis Report'],
  },
  {
    id: 9, category: 'education',
    title: 'National Scholarship Portal',
    desc: 'Apply for central government scholarships for students from SC/ST/OBC/Minority communities.',
    steps: 5, time: '1–3 months', difficulty: 'Easy',
    tags: ['NSP', 'Scholarship', 'Students'],
    icon: '🎓', portal: 'https://scholarships.gov.in/',
    docs: ['Aadhaar', 'Income Certificate', 'Mark Sheets', 'Bank Passbook', 'Caste Certificate'],
  },
  {
    id: 10, category: 'legal',
    title: 'RTI (Right to Information) Application',
    desc: 'File a Right to Information request to any central or state government department online.',
    steps: 4, time: '30 days (by law)', difficulty: 'Easy',
    tags: ['RTI', 'Transparency', 'PIO'],
    icon: '📋', portal: 'https://rtionline.gov.in/',
    docs: ['Identity Proof', 'RTI Application Fee (₹10)'],
  },
  {
    id: 11, category: 'social',
    title: 'Ration Card Application',
    desc: 'Apply for a new ration card or make modifications to existing ration card via state portal.',
    steps: 5, time: '15–30 days', difficulty: 'Easy',
    tags: ['PDS', 'Food Security', 'NFSA'],
    icon: '🛒', portal: 'https://nfsa.gov.in/portal/ration_card_state_portals_aa',
    docs: ['Aadhaar', 'Address Proof', 'Income Proof', 'Family Photo', 'Existing Ration Card (if any)'],
  },
  {
    id: 12, category: 'health',
    title: 'Ayushman Bharat (PMJAY) Enrollment',
    desc: 'Enroll in PM Jan Arogya Yojana for health insurance cover of ₹5 lakh per family per year.',
    steps: 3, time: '1–3 days', difficulty: 'Easy',
    tags: ['PMJAY', 'Health Insurance', 'Ayushman'],
    icon: '🏥', portal: 'https://beneficiary.nha.gov.in/',
    docs: ['Aadhaar', 'Ration Card', 'Income Certificate'],
  },
];

const difficultyColor = {
  Easy: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-red-100 text-red-700',
};


function ProcedureCard({ proc, onSelect }) {
  return (
    <div
      onClick={() => onSelect(proc)}
      className="group relative cursor-pointer p-5 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-xl hover:shadow-purple-100 hover:border-purple-300 hover:-translate-y-1 hover:scale-105 hover:z-20 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform notranslate leading-none">
          {proc.icon}
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[proc.difficulty]}`}>
          {proc.difficulty}
        </span>
      </div>
      <h3 className="font-bold text-slate-800 text-base mb-1.5 group-hover:text-purple-700 transition-colors">{proc.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">{proc.desc}</p>
      <div className="flex items-center gap-3 text-xs text-slate-400 border-t border-slate-100 pt-3">
        <span className="flex items-center gap-1"><span className="notranslate leading-none">📌</span> {proc.steps} steps</span>
        <span className="flex items-center gap-1"><span className="notranslate leading-none">⏱</span> {proc.time}</span>
      </div>
    </div>
  );
}


function ProcedureModal({ proc, onClose }) {
  if (!proc) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl notranslate leading-none">{proc.icon}</div>
            <div>
              <h2 className="font-extrabold text-slate-800 text-xl">{proc.title}</h2>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[proc.difficulty]}`}>{proc.difficulty}</span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-purple-100 hover:text-purple-600 transition notranslate leading-none" aria-label="Close modal">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-5">{proc.desc}</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-xl bg-purple-50 text-center">
            <p className="text-2xl font-bold text-purple-700">{proc.steps}</p>
            <p className="text-xs text-purple-500">Steps Required</p>
          </div>
          <div className="p-3 rounded-xl bg-violet-50 text-center">
            <p className="text-sm font-bold text-violet-700">{proc.time}</p>
            <p className="text-xs text-violet-500">Estimated Time</p>
          </div>
        </div>
        <div className="mb-5">
          <h4 className="font-bold text-slate-700 text-sm mb-2 flex items-center gap-2"><span className="notranslate leading-none">📂</span> Required Documents</h4>
          <ul className="space-y-1.5">
            {proc.docs.map((d) => (
              <li key={d} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs flex-shrink-0">✓</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-5">
          <h4 className="font-bold text-slate-700 text-sm mb-2 flex items-center gap-2"><span className="notranslate leading-none">🏷️</span> Tags</h4>
          <div className="flex flex-wrap gap-2">
            {proc.tags.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium border border-purple-100">{t}</span>
            ))}
          </div>
        </div>
        <a
          href={proc.portal}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-200 hover:scale-105 transition-all"
        >
          🔗 Open Official Portal
        </a>
      </div>
    </div>
  );
}


export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = procedures.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans">
      <Navbar />

      {}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-28 pb-10 px-4 text-center bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-100 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-slate-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md text-indigo-700 text-sm font-medium mb-4 border border-slate-200 shadow-sm">
            100+ Government Procedures
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            Explore Every Procedure
          </h1>
          <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
            Search and browse simplified guides for any government process — with required documents, timelines, and official portal links.
          </p>
          {}
          <div className="relative max-w-xl mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="explore-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search procedures, documents, or keywords..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white shadow-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-base"
            />
          </div>
        </div>
      </motion.section>

      {}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm px-4 py-3"
      >
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              <span className="notranslate leading-none">{cat.emoji}</span> <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </motion.section>

      {}
      <motion.section
        key={activeCategory + search}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-500 text-sm">
              Showing <span className="font-bold text-purple-600">{filtered.length}</span> procedure{filtered.length !== 1 ? 's' : ''}
              {search && <span> for "<span className="font-semibold">{search}</span>"</span>}
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((proc) => (
                <ProcedureCard key={proc.id} proc={proc} onSelect={setSelected} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 notranslate leading-none">🔍</div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No procedures found</h3>
              <p className="text-slate-400">Try a different keyword or category</p>
            </div>
          )}
        </div>
      </motion.section>

      {}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-16 px-4 bg-purple-50"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3">
            Can't Find Your Procedure?
          </h2>
          <p className="text-slate-500 mb-6">Upload your document and our AI will decode it for you instantly.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:shadow-xl hover:shadow-purple-200 hover:scale-105 transition-all duration-200"
          >
            📄 Upload a Document
          </Link>
        </div>
      </motion.section>

      <ProcedureModal proc={selected} onClose={() => setSelected(null)} />
    </div>
  );
}