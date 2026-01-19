import React, { useState } from 'react';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const projects = {
    all: [
      {
        id: 1,
        title: 'SECURITY AUDIT SYSTEM',
        category: 'security',
        description: 'Automated vulnerability scanner with real-time reporting',
        tech: ['Python', 'React', 'Docker', 'MongoDB'],
        status: 'ACTIVE',
        access: 'RESTRICTED',
      },
      {
        id: 2,
        title: 'PENETRATION TESTING FRAMEWORK',
        category: 'security',
        description: 'Custom framework for web application security testing',
        tech: ['Python', 'Flask', 'Celery', 'Redis'],
        status: 'DEPLOYED',
        access: 'PRIVATE',
      },
      {
        id: 3,
        title: 'E-COMMERCE SECURITY SUITE',
        category: 'web',
        description: 'Security plugins for Shopify and WordPress',
        tech: ['PHP', 'JavaScript', 'MySQL', 'Redis'],
        status: 'LIVE',
        access: 'PUBLIC',
      },
      {
        id: 4,
        title: 'NETWORK MONITORING DASHBOARD',
        category: 'tools',
        description: 'Real-time network traffic analysis and threat detection',
        tech: ['Node.js', 'Vue.js', 'WebSocket', 'PostgreSQL'],
        status: 'BETA',
        access: 'INTERNAL',
      },
    ],
    security: [
      // Security projects
    ],
    web: [
      // Web development projects
    ],
    tools: [
      // Tools projects
    ]
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="neon-glow">PROJECT_REPOSITORY</span>
          </h2>
          <div className="h-1 w-32 bg-hacker-green mx-auto mb-4"></div>
          <p className="terminal-text max-w-2xl mx-auto">
            Classified projects involving cybersecurity, development, and research
          </p>
        </div>

        {/* Project Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['all', 'security', 'web', 'tools'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 border-2 font-mono uppercase transition-all ${
                activeTab === tab
                  ? 'border-hacker-green bg-terminal-bg shadow-[0_0_15px_#00ff00]'
                  : 'border-hacker-green/30 hover:border-hacker-green'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects[activeTab].map((project) => (
            <div
              key={project.id}
              className="matrix-border p-6 bg-terminal-bg/30 hover:bg-terminal-bg/50 transition-all duration-300 group"
              data-aos="fade-up"
            >
              {/* Project Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-hacker-green transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={`px-2 py-1 rounded ${
                      project.status === 'ACTIVE' ? 'bg-green-900/50 text-green-400' :
                      project.status === 'DEPLOYED' ? 'bg-blue-900/50 text-blue-400' :
                      'bg-yellow-900/50 text-yellow-400'
                    }`}>
                      STATUS: {project.status}
                    </span>
                    <span className={`px-2 py-1 rounded ${
                      project.access === 'RESTRICTED' ? 'bg-red-900/50 text-red-400' :
                      project.access === 'PRIVATE' ? 'bg-orange-900/50 text-orange-400' :
                      'bg-green-900/50 text-green-400'
                    }`}>
                      ACCESS: {project.access}
                    </span>
                  </div>
                </div>
                <div className="text-3xl text-hacker-green/50 group-hover:text-hacker-green transition-colors">
                  <i className="fa fa-lock"></i>
                </div>
              </div>

              {/* Project Description */}
              <p className="text-hacker-green/80 mb-6">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs border border-hacker-green/30 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="hacker-btn text-sm px-4 py-2">
                  <i className="fa fa-eye mr-2"></i>
                  VIEW SOURCE
                </button>
                <button className="hacker-btn border-dashed text-sm px-4 py-2">
                  <i className="fa fa-terminal mr-2"></i>
                  DEMO ACCESS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;