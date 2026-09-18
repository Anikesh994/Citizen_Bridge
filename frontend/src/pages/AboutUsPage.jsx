import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignUpButton } from '@clerk/clerk-react';
import Navbar from '../components/navbar';


const teamMembers = [
  {
    name: 'Priya Rajan', role: 'Co-founder & CEO', avatar: 'PR',
    color: 'from-violet-400 to-purple-600',
    bio: 'Former IAS officer. Spent 12 years in district administration witnessing citizens struggle with paperwork. Founded CitizenBridge to fix this at scale.',
    linkedin: '#',
  },
  {
    name: 'Arjun Mehta', role: 'Co-founder & CTO', avatar: 'AM',
    color: 'from-blue-400 to-cyan-600',
    bio: 'NIT Trichy CS graduate. Built ML systems at a major IT firm. Leads the AI document analysis engine and multilingual NLP pipeline.',
    linkedin: '#',
  },
  {
    name: 'Sunita Pillai', role: 'Head of Legal Content', avatar: 'SP',
    color: 'from-pink-400 to-rose-500',
    bio: 'Practising advocate with 8 years of experience in administrative law. Ensures all platform content is legally accurate and up-to-date.',
    linkedin: '#',
  },
  {
    name: 'Devraj Choudhury', role: 'Head of Inclusion', avatar: 'DC',
    color: 'from-emerald-400 to-teal-500',
    bio: 'Worked with rural development NGOs for a decade. Leads voice guidance, accessibility, and the regional language localization program.',
    linkedin: '#',
  },
];

const milestones = [
  { year: '2022', title: 'The Problem Identified', desc: 'Our co-founder spent hours helping a farmer in Tamil Nadu decipher a land mutation notice. The lightbulb moment for CitizenBridge.' },
  { year: 'Jan 2023', title: 'Prototype Built', desc: 'First working prototype that could simplify a passport application form built in 30 days. Tested with 50 users in Hyderabad.' },
  { year: 'Jun 2023', title: 'Seed Funding', desc: 'Raised ₹1.2 Cr seed round from two impact-focused investors to expand the team and add NLP capabilities.' },
  { year: 'Dec 2023', title: '5,000 Users Milestone', desc: 'Reached 5,000 active users. Launched Hindi and Tamil support. Partnership with two rural NGOs for free citizen camps.' },
  { year: 'Apr 2024', title: '12 Languages Launched', desc: 'Full multilingual support rolled out for 12 Indian languages with voice guidance. Crossed 10,000 active members.' },
  { year: '2025', title: 'Expanding Nationwide', desc: 'Active in 18 states. Partnered with state e-governance initiatives. 45,000+ sessions completed. Building the mobile app.' },
];

const values = [
  { icon: '🤲', title: 'Radical Accessibility', desc: 'Every citizen deserves to understand their government\'s demands — regardless of literacy, language, or economic status.' },
  { icon: '🔍', title: 'Ruthless Accuracy', desc: 'We only publish procedures verified against official sources. Legal accuracy is non-negotiable on our platform.' },
  { icon: '🌐', title: 'Language Equality', desc: 'The official language shouldn\'t be a barrier. Our goal: full support for every scheduled Indian language.' },
  { icon: '🔒', title: 'Privacy First', desc: 'Your documents and queries are private. We do not sell data. We do not monetize personal information.' },
  { icon: '❤️', title: 'Community Driven', desc: 'Built with and for communities. Citizen feedback drives every feature decision we make.' },
  { icon: '⚡', title: 'Open & Free Core', desc: 'Core features will always be free. Legal knowledge should not be locked behind a paywall.' },
];

const partners = [
  { name: 'DigiLocker', role: 'Document Sync Partner', logo: '📱' },
  { name: 'Common Service Centres', role: 'Offline Access Partner', logo: '🏪' },
  { name: 'UMANG Platform', role: 'Government API Integration', logo: '🏛️' },
  { name: 'Bhashini', role: 'Regional Language AI', logo: '🗣️' },
  { name: 'NASSCOM Foundation', role: 'Social Impact Partner', logo: '💼' },
  { name: 'iSpirt', role: 'Digital Public Goods', logo: '🚀' },
];

const stats = [
  { value: '10,000+', label: 'Active Members', icon: '👥' },
  { value: '45,000+', label: 'Sessions Completed', icon: '✅' },
  { value: '12', label: 'Regional Languages', icon: '🌐' },
  { value: '18', label: 'States Covered', icon: '🗺️' },
  { value: '32,000+', label: 'Documents Decoded', icon: '📄' },
  { value: '98%', label: 'User Satisfaction', icon: '⭐' },
];


export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans">
      <Navbar />

{}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-28 pb-20 px-4 text-center bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-100 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-200 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-slate-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md text-indigo-700 text-sm font-medium mb-4 border border-slate-200 shadow-sm">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            We Believe Every Citizen Deserves <br className="hidden sm:block" />
            <span className="text-amber-600">Clear Answers.</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            CitizenBridge was born out of frustration — watching ordinary people lose time, money, and dignity navigating a system that wasn't designed for them. We're here to change that.
          </p>
        </div>
      </motion.section>

      {}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1, duration: 0.6 }}
        className="py-16 px-4 max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="relative text-center p-4 rounded-2xl bg-white shadow-md border border-purple-100 hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:z-20 transition-all duration-300">
              <div className="text-3xl mb-1"><span className="notranslate leading-none">{s.icon}</span></div>
              <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500 notranslate">{s.value}</div>
              <div className="text-xs text-slate-400 mt-0.5 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-16 px-4"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-600 to-violet-700 text-white shadow-xl shadow-purple-200 hover:scale-[1.02] hover:z-20 hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl mb-4"><span className="notranslate leading-none">🎯</span></div>
            <h2 className="text-2xl font-extrabold mb-3">Our Mission</h2>
            <p className="text-purple-100 leading-relaxed">
              To make every government procedure understandable to every citizen — regardless of their language, education level, or prior knowledge of bureaucratic systems. We remove the gatekeepers between people and the services they are entitled to.
            </p>
          </div>
          <div className="relative p-8 rounded-3xl bg-white border border-purple-100 shadow-xl shadow-purple-50 hover:scale-[1.02] hover:z-20 hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl mb-4"><span className="notranslate leading-none">🌟</span></div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-3">Our Vision</h2>
            <p className="text-slate-500 leading-relaxed">
              An India where no citizen is penalized, fined, or denied a service simply because they couldn't decode bureaucratic language. A future where digital public services are truly accessible from the first point of contact — not just for the few, but for all 1.4 billion.
            </p>
          </div>
        </div>
      </motion.section>

      
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 bg-slate-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3">The Problem We're Solving</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📄', stat: '73%', label: 'of citizens cannot understand a standard government notice without external help', source: 'NCAER Survey 2022' },
              { icon: '💸', stat: '₹2,000+', label: 'average amount spent on middlemen or consultants for a single government procedure', source: 'CitizenBridge Research' },
              { icon: '⏱️', stat: '14 hours', label: 'average time lost per government process due to wrong office visits and missing documents', source: 'NASSCOM Report 2023' },
            ].map((item) => (
              <div key={item.stat} className="relative p-6 rounded-2xl bg-white border border-red-100 shadow-sm text-center hover:scale-105 hover:z-20 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="text-4xl mb-3"><span className="notranslate leading-none">{item.icon}</span></div>
                <div className="text-4xl font-black text-red-500 mb-2 notranslate">{item.stat}</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.label}</p>
                <p className="text-slate-400 text-xs italic">{item.source}</p>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3">What We Stand For</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Six values that shape every decision we make.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="relative p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-lg hover:border-purple-200 hover:-translate-y-1 hover:scale-105 hover:z-20 transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block"><span className="notranslate leading-none">{v.icon}</span></div>
                <h3 className="font-bold text-slate-800 mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>


      {}
      <motion.section
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3">Our Journey</h2>
            <p className="text-slate-500">From a single frustration to a nationwide platform.</p>
          </div>
          <div className="relative">
            {}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-100" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative pl-20">
                  <div className="absolute left-5 top-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-md shadow-purple-200">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="relative p-5 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md hover:scale-[1.03] hover:z-20 transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold mb-2">{m.year}</span>
                    <h3 className="font-bold text-slate-800 mb-1">{m.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 bg-purple-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">Our Partners & Integrations</h2>
            <p className="text-slate-500 text-sm">Working with trusted organizations to amplify impact.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((p) => (
              <div key={p.name} className="relative p-4 rounded-2xl bg-white border border-purple-100 shadow-sm text-center hover:shadow-md hover:border-purple-200 hover:scale-105 hover:z-20 transition-all duration-300 group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform"><span className="notranslate leading-none">{p.logo}</span></div>
                <p className="text-xs font-bold text-slate-700">{p.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4">Get in Touch</h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">
            Questions, partnerships, media inquiries, or just want to say hello? We read every message.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            {[
              { icon: '✉️', label: 'Email Us', value: 'hello@citizenbridge.in' },
              { icon: '📞', label: 'Call Us', value: '+91 98765 43210' },
              { icon: '🏢', label: 'Office', value: 'Bengaluru, Karnataka, India' },
            ].map((c) => (
              <div key={c.label} className="relative p-5 rounded-2xl bg-white border border-purple-100 shadow-sm hover:scale-[1.03] hover:z-20 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="text-2xl mb-2"><span className="notranslate leading-none">{c.icon}</span></div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{c.label}</p>
                <p className="text-sm font-medium text-slate-700">{c.value}</p>
              </div>
            ))}
          </div>
          <SignUpButton mode="modal">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:shadow-xl hover:shadow-purple-200 hover:scale-105 transition-all duration-200 text-base">
              Join CitizenBridge Today →
            </button>
          </SignUpButton>
        </div>
      </motion.section>
    </div>
  );
}