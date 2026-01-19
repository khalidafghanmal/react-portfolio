const Services = () =>{
     const services = [
    { title: 'Penetration Testing', icon: 'fas fa-shield-alt', desc: 'Comprehensive security assessments and vulnerability testing' },
    { title: 'Web Development', icon: 'fas fa-code', desc: 'Secure and scalable web applications development' },
    { title: 'Security Auditing', icon: 'fas fa-search', desc: 'Thorough security analysis and compliance checking' },
    { title: 'Network Security', icon: 'fas fa-network-wired', desc: 'Infrastructure protection and monitoring' },
    { title: 'Malware Analysis', icon: 'fas fa-virus', desc: 'Reverse engineering and threat analysis' },
    { title: 'Incident Response', icon: 'fas fa-first-aid', desc: '24/7 emergency security response services' },
  ];
    return(
        <section id="services" className="py-24 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8 font-mono">
              <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 bg-clip-text text-transparent">
                &gt; SERVICES
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-green-500/20 shadow-2xl hover:shadow-3xl hover:border-green-400/50 transition-all duration-700 cursor-pointer overflow-hidden transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden relative shadow-lg shadow-green-500/20">
                      <i className={`${service.icon} text-white text-3xl`} />
                      <div className="absolute inset-0 bg-white/10 blur-xl rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-4 group-hover:text-green-300 transition-colors duration-500 font-mono">
                    {service.title}
                  </h3>
                  <p className="text-green-300/80 leading-relaxed text-lg group-hover:text-green-300 transition-colors duration-500 font-mono">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}
export default Services;