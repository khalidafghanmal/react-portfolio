import React from 'react'

const Timeline = () => {
      const timeline = [
    { year: '2019', title: 'Started Computer Basics', desc: 'Built foundation in Windows, MS Office, and basic programming concepts' },
    { year: '2022', title: 'Web Development Journey', desc: 'Mastered HTML, CSS, JavaScript and built first websites' },
    { year: '2023', title: 'Full-Stack Development', desc: 'Learned React, Laravel, Node.js for full-stack applications' },
    { year: '2023', title: 'Security Certification', desc: 'Obtained CEH and PWK certifications in cybersecurity' },
    { year: '2024', title: 'Professional Experience', desc: 'Started working as security consultant and developer' },
    { year: '2025', title: 'Advanced Security', desc: 'Specialized in advanced penetration testing and threat hunting' },
  ];

  return (
    <section id="timeline" className="relative py-24 overflow-hidden">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8 font-mono">
            <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 bg-clip-text text-transparent">
              &gt; TIMELINE
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-green-500 via-emerald-400 to-green-600 -translate-x-1/2" />
          
          <div className="space-y-24">
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative flex items-center flex-col md:flex-row ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'} group`}>
                <div className={`w-full md:w-6/12 ${idx % 2 === 0 ? 'md:pr-8 text-center md:text-right' : 'md:pl-8 text-center md:text-left'} mt-20 md:mt-0`}>
                  <div className="relative p-8 rounded-3xl border border-green-500/30 bg-black/40 backdrop-blur-2xl shadow-2xl hover:shadow-3xl hover:border-green-400/50 transition-all duration-700 transform hover:-translate-y-1 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    <div className="relative z-10">
                      <div className="inline-flex items-center px-6 py-3 mb-6 text-sm font-bold rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-lg font-mono">
                        <i className="fas fa-calendar-alt mr-3 text-green-400" />
                        <span className="text-green-300">{item.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-500 font-mono">
                        {item.title}
                      </h3>
                      <p className="text-green-300/80 leading-relaxed text-lg group-hover:text-green-300 transition-colors duration-500 font-mono">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full border-4 border-black flex items-center justify-center z-10 shadow-2xl shadow-green-500/30 group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute -inset-3 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full animate-ping" />
                  <i className="fas fa-terminal text-white text-sm z-10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Timeline