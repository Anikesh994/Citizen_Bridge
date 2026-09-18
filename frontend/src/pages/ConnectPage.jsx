import React, { useState } from 'react';
import Navbar from '../components/navbar';

const createMapsQR = (name) => {
  const url = `https://maps.google.com/?q=${encodeURIComponent(name + ' Office')}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
};

const categories = [
  {
    id: 'lawyers',
    title: 'Lawyers & Legal Aid',
    description: 'Connect with certified legal professionals for guidance on documents and processes.',
    icon: (
      <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    members: [
      { id: 'l1', name: 'Adv. Sarah Jenkins', experience: '12 years in Corporate & Civil Law', avatar: 'https://i.pravatar.cc/150?u=sjenkins', qr: createMapsQR('Adv. Sarah Jenkins') },
      { id: 'l2', name: 'Adv. Michael Ross', experience: '8 years in Real Estate Law', avatar: 'https://i.pravatar.cc/150?u=mross', qr: createMapsQR('Adv. Michael Ross') },
      { id: 'l3', name: 'Adv. Priya Patel', experience: '15 years in Family Law', avatar: 'https://i.pravatar.cc/150?u=ppatel', qr: createMapsQR('Adv. Priya Patel') },
      { id: 'l4', name: 'Adv. David Chen', experience: '10 years in Immigration Law', avatar: 'https://i.pravatar.cc/150?u=dchen', qr: createMapsQR('Adv. David Chen') },
      { id: 'l5', name: 'Adv. Jessica Pearson', experience: '20+ years in Contract Law', avatar: 'https://i.pravatar.cc/150?u=jpearson', qr: createMapsQR('Adv. Jessica Pearson') },
    ]
  },
  {
    id: 'notaries',
    title: 'Public Notaries',
    description: 'Find official notaries to verify and stamp your legal documents.',
    icon: (
      <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    members: [
      { id: 'n1', name: 'James Wilson', experience: 'Govt. Approved Notary (Lic: N-1029)', avatar: 'https://i.pravatar.cc/150?u=jwilson', qr: createMapsQR('James Wilson Notary') },
      { id: 'n2', name: 'Maria Garcia', experience: 'Bilingual Notary Public (10+ years)', avatar: 'https://i.pravatar.cc/150?u=mgarcia', qr: createMapsQR('Maria Garcia Notary') },
      { id: 'n3', name: 'Robert Kim', experience: 'Mobile Notary Services', avatar: 'https://i.pravatar.cc/150?u=rkim', qr: createMapsQR('Robert Kim Notary') },
      { id: 'n4', name: 'Linda Martinez', experience: 'Registered Notary (Lic: N-4492)', avatar: 'https://i.pravatar.cc/150?u=lmartinez', qr: createMapsQR('Linda Martinez Notary') },
      { id: 'n5', name: 'William Turner', experience: 'Est. 1998 Notary Office', avatar: 'https://i.pravatar.cc/150?u=wturner', qr: createMapsQR('William Turner Notary') },
    ]
  },
  {
    id: 'agents',
    title: 'Govt. Facilitation Agents',
    description: 'Connect with agents specialized in helping bridge the gap with government applications.',
    icon: (
      <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    members: [
      { id: 'a1', name: 'Amit Sharma', experience: 'Passport & Visa Facilitation Expert', avatar: 'https://i.pravatar.cc/150?u=asharma', qr: createMapsQR('Amit Sharma Agent') },
      { id: 'a2', name: 'Rahul Verma', experience: 'RTO & Driving License Agent', avatar: 'https://i.pravatar.cc/150?u=rverma', qr: createMapsQR('Rahul Verma Agent') },
      { id: 'a3', name: 'Aisha Khan', experience: 'Municipal Corp Document Specialist', avatar: 'https://i.pravatar.cc/150?u=akhan', qr: createMapsQR('Aisha Khan Agent') },
      { id: 'a4', name: 'Thomas Wright', experience: 'Business License Facilitator', avatar: 'https://i.pravatar.cc/150?u=twright', qr: createMapsQR('Thomas Wright Agent') },
      { id: 'a5', name: 'Sanjay Gupta', experience: 'Tax & GST Registration Agent', avatar: 'https://i.pravatar.cc/150?u=sgupta', qr: createMapsQR('Sanjay Gupta Agent') },
      { id: 'a6', name: 'Pooja Desai', experience: 'Aadhar/PAN Card Updation specialist', avatar: 'https://i.pravatar.cc/150?u=pdesai', qr: createMapsQR('Pooja Desai Agent') },
    ]
  }
];

export default function ConnectPage() {
  const [openCatId, setOpenCatId] = useState(null);
  const [openMemberId, setOpenMemberId] = useState(null);

  const toggleCategory = (id) => {
    setOpenCatId(openCatId === id ? null : id);

    setOpenMemberId(null);
  };

  const toggleMember = (id) => {
    setOpenMemberId(openMemberId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 pt-16">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-violet-700 mb-4">
            Connect with Professionals
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
            Find the right expertise to assist you with your document preparations, legal aid, or government facilitation needs safely.
          </p>
        </div>

        <div className="space-y-6">
          {categories.map((cat) => {
            const isCatOpen = openCatId === cat.id;

            return (
              <div key={cat.id} className="relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:z-20">
                {}
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className={`w-full text-left px-6 py-5 flex items-center justify-between transition-colors ${isCatOpen ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 shadow-sm shadow-purple-100">
                      {cat.icon}
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">{cat.title}</h2>
                      <p className="text-slate-500 text-sm mt-1">{cat.description}</p>
                    </div>
                  </div>
                  <div className="shrink-0 ml-4">
                    <div className={`p-2 rounded-full ${isCatOpen ? 'bg-purple-100' : 'bg-slate-100'}`}>
                      <svg className={`w-5 h-5 transition-transform duration-300 ${isCatOpen ? 'rotate-180 text-purple-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {}
                <div className={`grid transition-all duration-300 ease-in-out ${isCatOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">

                      {cat.members.map((member) => {
                        const isMemberOpen = openMemberId === member.id;
                        return (
                          <div
                            key={member.id}
                            className={`relative bg-white rounded-2xl shadow-sm border ${isMemberOpen ? 'border-purple-200 shadow-md shadow-purple-50' : 'border-slate-200'} overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:z-20`}
                          >
                            <button
                              onClick={() => toggleMember(member.id)}
                              className={`w-full text-left px-5 py-4 flex items-center justify-between transition-colors ${isMemberOpen ? 'bg-purple-50/30' : 'hover:bg-slate-50'}`}
                            >
                              <div className="flex items-center gap-5">
                                <div className="relative">
                                  <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover"
                                  />
                                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                  <h3 className="font-bold text-lg text-slate-800">{member.name}</h3>
                                  <p className="text-sm font-medium text-slate-500">{member.experience}</p>
                                </div>
                              </div>
                              <div className="shrink-0 ml-4 flex items-center gap-3">
                                <span className={`text-xs font-bold uppercase tracking-wider hidden sm:block ${isMemberOpen ? 'text-purple-600' : 'text-slate-400'}`}> View Location </span>
                                <div className={`p-1.5 rounded-full ${isMemberOpen ? 'bg-purple-100' : 'bg-slate-100'}`}>
                                  <svg className={`w-5 h-5 transition-transform duration-300 ${isMemberOpen ? 'rotate-180 text-purple-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>
                            </button>

                            <div className={`grid transition-all duration-300 ease-in-out ${isMemberOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                              <div className="overflow-hidden">
                                <div className="p-6 border-t border-purple-100 bg-gradient-to-br from-white to-purple-50/50 flex flex-col md:flex-row items-center md:items-start gap-8">

                                  {}
                                  <div className="flex-1 text-center md:text-left space-y-4">
                                    <div>
                                      <h4 className="font-bold text-slate-800 text-xl">{member.name}</h4>
                                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full mt-2">
                                        {member.experience}
                                      </span>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
                                      Scan the QR code on the right with your phone's camera to instantly find this professional's exact physical office location on Google Maps.
                                    </p>
                                  </div>

                                  {}
                                  <div className="shrink-0 flex flex-col items-center gap-3">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200">
                                      <img
                                        src={member.qr}
                                        alt={`QR Code to locate ${member.name}`}
                                        className="w-36 h-36 object-contain rounded-xl"
                                      />
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                                      Scan for Maps
                                    </p>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
