import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignUpButton, useUser } from '@clerk/clerk-react';
import Navbar from '../components/navbar';


function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, start]);
  return count;
}


function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}


const stats = [
  { label: 'Active Members',     value: 10000, suffix: '+', icon: '👥' },
  { label: 'Sessions Completed', value: 45000, suffix: '+', icon: '✅' },
  { label: 'Regional Languages', value: 6,     suffix: '',  icon: '🌐' },
  { label: 'Documents Decoded',  value: 32000, suffix: '+', icon: '📄' },
];

const steps = [
  { step: '01', title: 'Upload or Search',  icon: '🔍', color: 'from-violet-500 to-purple-600',
    desc: 'Find your procedure by name or upload a document — passport form, tax notice, land registration — anything.' },
  { step: '02', title: 'Get the Blueprint', icon: '🗺️', color: 'from-purple-500 to-fuchsia-500',
    desc: 'Receive a clear step-by-step decision tree explained in plain language — no jargon, no confusion.' },
  { step: '03', title: 'Gather & Submit',   icon: '📋', color: 'from-fuchsia-500 to-rose-400',
    desc: 'Get a smart checklist of required docs, the exact government portal link, and the office to visit.' },
];

const useCases = [
  { icon: '🏠', title: 'Property Registration',       desc: 'Land records, title deeds, mutation & encumbrance certificates.' },
  { icon: '📊', title: 'Tax Notices & Compliance',    desc: 'GST, income tax, property tax notices decoded with required actions.' },
  { icon: '✈️', title: 'Visa & Immigration',          desc: 'End-to-end guidance for travel documents and immigration forms.' },
  { icon: '🏢', title: 'Business Licenses',           desc: 'Start your MSME, shop license, FSSAI, or trade license hassle-free.' },
  { icon: '🎓', title: 'Education & Scholarships',    desc: 'Government scholarship applications and certificate verification.' },
  { icon: '⚖️', title: 'Legal Notices & RTI',         desc: 'Respond to legal notices and file RTI requests confidently.' },
];

const testimonials = [
  { quote: "I was terrified of my land mutation notice. CitizenBridge gave me a 5-step checklist and I was done in 2 days instead of months.",
    name: 'Ravi Kumar', location: 'Farmer, Telangana', avatar: 'RK', color: 'from-violet-500 to-purple-600' },
  { quote: "My GST notice looked like code. The platform translated it into Hindi and showed exactly what to file. My accountant was shocked!",
    name: 'Meena Sharma', location: 'Business Owner, Rajasthan', avatar: 'MS', color: 'from-pink-500 to-rose-500' },
  { quote: "Passport renewal used to mean 4 trips to the office. With CitizenBridge I knew exactly what to bring. One trip. Done.",
    name: 'Arjun Nair', location: 'Software Engineer, Kerala', avatar: 'AN', color: 'from-emerald-500 to-teal-500' },
];


function StatCard({ icon, label, value, suffix, animate }) {
  const count = useCounter(value, 2200, animate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center p-7 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    >
      <span className="text-3xl mb-3 leading-none">{icon}</span>
      <span className="text-3xl font-extrabold text-slate-900">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-sm text-slate-500 mt-1 font-medium text-center">{label}</span>
    </motion.div>
  );
}


export default function HomePage() {
  const [statsRef, statsInView] = useInView(0.3);
  const { isSignedIn } = useUser();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />

      {

}
      <section className="relative min-h-screen flex items-center pt-16 bg-[#f8f7ff]">
        {}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full bg-purple-100/60 blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-violet-100/50 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-20 lg:py-0 min-h-[calc(100vh-4rem)] flex items-center">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center w-full">

            {}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative flex justify-center order-2 lg:order-1"
            >
              {}
              <div className="relative w-full max-w-[400px] lg:max-w-[460px]">
                {imgError ? (
                  <div className="h-[460px] rounded-[2.5rem] bg-gradient-to-br from-purple-100 via-violet-100 to-indigo-50 flex flex-col items-center justify-center gap-4 shadow-lg">
                    <span className="text-9xl">⚖️</span>
                    <p className="text-purple-600 font-semibold">CitizenBridge</p>
                  </div>
                ) : (
                  <img
                    src="/lawyer.png"
                    alt="Legal professional"
                    className="w-full h-auto object-cover rounded-[2.5rem] drop-shadow-2xl"
                    onError={() => setImgError(true)}
                  />
                )}

                {}
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="hidden sm:flex absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-2.5 items-center gap-2.5 border border-slate-100"
                >
                  <span className="text-emerald-500 text-xl">✅</span>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-tight">Document Decoded</p>
                    <p className="text-[11px] text-slate-400">3 steps · just now</p>
                  </div>
                </motion.div>

                {}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="hidden sm:block absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-2.5 border border-slate-100"
                >
                  <p className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Languages</p>
                  <div className="flex gap-1.5">
                    {['EN', 'हि', 'বাং', 'தமி', 'తె', 'ಕ'].map(l => (
                      <span key={l} className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 text-[10px] font-bold flex items-center justify-center">{l}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="order-1 lg:order-2 flex flex-col gap-7"
            >
              <div className="inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/60 text-purple-700 text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse inline-block" />
                AI-Powered · Free to Use · 12 Languages
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-[3.5rem] font-extrabold text-slate-900 leading-[1.08] tracking-tight">
                Government<br />Procedures,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-500 to-fuchsia-500">
                  Decoded<br />for You.
                </span>
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed max-w-[480px]">
                Upload any legal notice or government form. We translate it into
                simple, step-by-step instructions — in your language, in minutes.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {isSignedIn ? (
                  <Link to="/dashboard" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow-lg shadow-purple-200 hover:-translate-y-0.5 hover:shadow-purple-300/60 transition-all duration-200">
                    Go to Dashboard →
                  </Link>
                ) : (
                  <SignUpButton mode="modal">
                    <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow-lg shadow-purple-200 hover:-translate-y-0.5 hover:shadow-purple-300/60 transition-all duration-200">
                      Get Started Free →
                    </button>
                  </SignUpButton>
                )}
                <Link to="/explore" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-purple-300 hover:text-purple-700 hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
                  Explore Procedures
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {['🔒 100% Secure', '⚡ Under 30 sec', '📱 Mobile Ready', '🆓 Always Free'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-medium shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

{

}
      <section className="relative py-20 px-6 bg-white overflow-hidden" ref={statsRef}>
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl translate-x-1/2" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">Our Impact</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Trusted by Citizens Across India</h2>
            <p className="text-slate-500">Real impact. Real people. Real results.</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => <StatCard key={s.label} {...s} animate={statsInView} />)}
          </div>
        </div>
      </section>

      {

}

      <section className="relative py-20 px-6 bg-white overflow-hidden">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl translate-x-1/2" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">The Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">How It Works</h2>
            <p className="text-slate-500 max-w-md mx-auto">Three simple steps. No jargon. No office runs.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative bg-white/60 backdrop-blur-md rounded-2xl p-7 border border-indigo-100 hover:border-amber-300 hover:bg-white hover:shadow-xl hover:shadow-amber-100 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="absolute top-5 right-6 text-5xl font-black text-indigo-100 select-none leading-none">{s.step}</span>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl mb-5 shadow-md`}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {

}
      <section className="relative py-20 px-6 bg-slate-50 overflow-hidden">
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-teal-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-amber-300/30 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">Why CitizenBridge</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Built for Every Indian</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🔒', title: 'Bank-Grade Privacy',  desc: 'Your documents are encrypted and never stored permanently.', color: 'from-indigo-500 to-indigo-700' },
              { icon: '⚡', title: 'Instant Analysis',    desc: 'AI processes your document in under 30 seconds.', color: 'from-amber-500 to-orange-600' },
              { icon: '🌐', title: '12 Languages',         desc: 'Guidance in Hindi, Tamil, Telugu, Kannada and more.', color: 'from-teal-500 to-emerald-600' },
              { icon: '📱', title: 'Works Everywhere',     desc: 'Fully responsive on mobile, tablet, and desktop.', color: 'from-rose-500 to-pink-600' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-xl mb-4 shadow-md`}>{f.icon}</div>
                <h3 className="font-bold text-slate-800 mb-1.5">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {

}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-3">What We Cover</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Every Procedure, Simplified</h2>
            <p className="text-slate-500 max-w-md mx-auto">From taxes to travel docs — we've got the blueprint.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center text-xl mb-4 transition-colors">
                  {uc.icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-1.5">{uc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{uc.desc}</p>
                <span className="text-xs font-bold text-purple-600 group-hover:underline">Explore →</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-3">Success Stories</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Voices of the People</h2>
            <p className="text-slate-500 max-w-md mx-auto">Real citizens who navigated procedures without stress.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex flex-col bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-purple-100 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed flex-1 italic mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 px-6 bg-[#f3f0ff]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            Ready to Decode Your<br />Government Documents?
          </h2>
          <p className="text-slate-500 text-lg mb-8">
            Join 10,000+ citizens who stopped dreading paperwork. Free forever.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {isSignedIn ? (
              <Link to="/dashboard" className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow-md hover:-translate-y-0.5 transition-all duration-200">
                Go to Dashboard →
              </Link>
            ) : (
              <SignUpButton mode="modal">
                <button className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  Start for Free →
                </button>
              </SignUpButton>
            )}
            <Link to="/explore" className="px-8 py-3.5 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-purple-300 hover:text-purple-700 hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
              Browse Procedures
            </Link>
          </div>
        </motion.div>
      </section>

      
      <footer className="bg-slate-900 text-slate-400 py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-white font-bold">CitizenBridge</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">Making government accessible to every citizen of India.</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm">
                {['Explore Procedures', 'Upload Document', 'Legal Glossary', 'FAQs'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Disclaimer', 'Contact Us'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Languages</h4>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {['English', 'हिंदी', 'বাংলা', 'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ', 'मराठी', 'ਪੰਜਾਬੀ'].map(l => (
                  <span key={l} className="px-2 py-1 rounded bg-slate-800 hover:text-white cursor-pointer transition-colors">{l}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <p>© 2025 CitizenBridge. Built with ❤️ for India.</p>
            <p>Free Legal Guidance · Not a Law Firm · Educational Purposes Only</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
