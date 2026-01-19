const About = ()=>{
    return(
       <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                &gt; Information
              </span>
            </h2>
            <div className="w-28 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Profile & Stats */}
            <div className="space-y-10">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 opacity-30 blur-3xl animate-pulse" />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 opacity-20 animate-spin-slow" />
                <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-700 border-4 border-green-500/20">
                  <img 
                    src="https://khalidafghanmal.netlify.app/images/a.jpg" 
                    alt="Profile"
                    className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full object-cover border-4 border-green-500/30 shadow-lg transition-transform duration-500 group-hover:rotate-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/288x288/00ff00/000000?text=SECURITY_EXPERT";
                    }}
                  />
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '3+', label: 'Years Experience', color: 'text-green-400' },
                  { value: '7+', label: 'Projects', color: 'text-emerald-400' },
                  { value: '100%', label: 'Client Satisfaction', color: 'text-green-300' },
                  { value: '24/7', label: 'Support', color: 'text-emerald-300' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center p-6 bg-black/50 rounded-xl border border-green-500/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/20">
                    <div className={`text-4xl font-extrabold mb-2 font-mono ${stat.color}`}>{stat.value}</div>
                    <div className="text-green-400/70 font-mono text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bio & Skills */}
            <div className="space-y-10">
              <div>
                <h3 className="text-3xl font-extrabold text-green-400 mb-6 font-mono">
                  &gt; WHOAMI
                </h3>
                <p className="text-green-300/80 text-lg leading-loose mb-6 font-mono">
                  [root@kali]~# I'm a <span className="text-green-400 font-bold">Certified Ethical Hacker</span> with
                  <span className="text-green-400 font-bold"> CEH & PWK certifications</span>. Specializing in penetration testing,
                  web application security, and secure development practices.
                </p>
                <p className="text-green-300/80 text-lg leading-loose font-mono">
                  [root@kali]~# My mission is to identify vulnerabilities before attackers do, 
                  and build secure systems that withstand modern threats. I combine development 
                  expertise with security knowledge to create robust, hack-resistant applications.
                </p>
              </div>
              
              {/* Skills */}
              <div>
                <h4 className="text-2xl font-bold text-green-400 mb-6 font-mono">&gt; CORE_COMPETENCIES</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: 'fas fa-terminal', label: 'Penetration Testing' },
                    { icon: 'fas fa-code', label: 'Secure Development' },
                    { icon: 'fas fa-shield-alt', label: 'Security Auditing' },
                    { icon: 'fas fa-network-wired', label: 'Network Security' }
                  ].map((skill, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 bg-black/50 rounded-lg border border-green-500/20 hover:bg-green-500/10 transition-all duration-300">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <i className={`${skill.icon} text-white text-sm`} />
                      </div>
                      <span className="text-green-300 font-mono text-sm">{skill.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> 
    )
}
export default About;