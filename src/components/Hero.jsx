import { useState } from 'react';
const Hero =() =>{
    const [typingText, setTypingText] = useState('');
   const [counters, setCounters] = useState({ projects: 0, years: 0, satisfaction: 0 });
    
  
  return(
      <section id="home" className="min-h-screen flex items-center relative pt-32 md:pt-20 pb-12 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <div className="text-green-400 font-mono text-2xl md:text-3xl mb-2 animate-pulse">
                  _ ROOT@KALI: ~$
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 font-mono">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                    KHALID AFGHANMAL
                  </span>
                </h1>
                <div className="typing-text text-2xl md:text-3xl text-green-400 mb-6 font-mono">
                  <span className="text-green-300">$ WHOAMI:</span> {' '}
                  <span className="typed-text bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {typingText}
                  </span>
                  <span className="cursor animate-pulse">_</span>
                </div>
                <p className="text-lg md:text-xl text-green-300/80 leading-relaxed max-w-2xl font-mono">
                  {">"} CEH & PWK Certified | Security Researcher | Full-Stack Developer<br/>
                  {">"} Specializing in Penetration Testing & Secure Web Development<br/>
                  {">"} Based in Afghanistan | Serving Clients Worldwide
                </p>
              </div>
              
              {/* Stats */}
              <div className="flex justify-center lg:justify-start gap-8 mb-8">
                {[
                  { value: counters.projects, label: 'Projects', suffix: '+' },
                  { value: counters.years, label: 'Years Exp', suffix: '+' },
                  { value: counters.satisfaction, label: 'Client Sat', suffix: '%' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="stat-number text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent font-mono">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-green-400/70 text-sm font-mono tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md hover:shadow-green-500/30 border border-green-500/30 font-mono"
                >
                  <span>VIEW PORTFOLIO</span>
                  <i className="fas fa-terminal" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-3 bg-black/50 border border-green-500/30 text-green-400 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:bg-green-500/10 shadow-md hover:border-green-500/50 font-mono"
                >
                  <span>INITIATE_CONTACT</span>
                  <i className="fas fa-key" />
                </button>
              </div>
            </div>
            
            {/* Profile Image */}
            <div className="relative flex justify-center">
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-pulse" />
                <div className="absolute inset-2 bg-black rounded-full overflow-hidden shadow-2xl border-4 border-green-500/30">
                  <img 
                    src="https://khalidafghanmal.netlify.app/images/khalid.jpeg" 
                    alt="Khalid Afghanmal" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/384x384/00ff00/000000?text=KHALID_AFGHANMAL";
                    }}
                  />
                </div>
                
                {/* Floating Icons */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-black/80 backdrop-blur-lg border border-green-500/30 rounded-full flex items-center justify-center animate-float shadow-lg shadow-green-500/20">
                  <i className="fas fa-terminal text-green-400 text-xl" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-black/80 backdrop-blur-lg border border-green-500/30 rounded-full flex items-center justify-center animate-float shadow-lg shadow-green-500/20" style={{animationDelay: '2s'}}>
                  <i className="fas fa-shield-alt text-green-400 text-xl" />
                </div>
                <div className="absolute top-1/2 -right-8 w-16 h-16 bg-black/80 backdrop-blur-lg border border-green-500/30 rounded-full flex items-center justify-center animate-float shadow-lg shadow-green-500/20" style={{animationDelay: '4s'}}>
                  <i className="fas fa-bug text-green-400 text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
export default Hero;