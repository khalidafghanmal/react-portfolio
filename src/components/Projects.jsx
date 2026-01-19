import React from 'react'

const Projects = () => {
   const projects = [
    { name: 'Security Dashboard', desc: 'Real-time threat monitoring system', tags: ['React', 'Node.js', 'Security'] },
    { name: 'PenTest Toolkit', desc: 'Automated penetration testing suite', tags: ['Python', 'Security', 'Automation'] },
    { name: 'Encrypted Messenger', desc: 'End-to-end encrypted chat application', tags: ['React', 'Crypto', 'WebRTC'] },
  ];
  return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-mono">
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              &gt; PROJECTS
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden shadow-2xl bg-black/50 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 relative overflow-hidden rounded-t-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/50 to-emerald-700/40" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <i className="fas fa-lock text-6xl text-green-400/80" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-green-400 font-mono">{project.name}</h3>
                  <p className="text-green-300/80 mb-4 font-mono">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/30 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Projects