import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'PENETRATION TESTING',
      icon: 'fa-shield-alt',
      color: 'text-hacker-green',
      bg: 'bg-terminal-bg',
      skills: [
        { name: 'Web App Security', level: 95, color: 'bg-hacker-green' },
        { name: 'Network Security', level: 88, color: 'bg-green-600' },
        { name: 'OWASP Top 10', level: 92, color: 'bg-green-700' },
        { name: 'Vulnerability Assessment', level: 90, color: 'bg-green-800' },
      ]
    },
    {
      title: 'WEB DEVELOPMENT',
      icon: 'fa-code',
      color: 'text-secondary',
      bg: 'bg-hacker-dark',
      skills: [
        { name: 'React/Next.js', level: 95, color: 'bg-cyan-500' },
        { name: 'Laravel/PHP', level: 88, color: 'bg-red-500' },
        { name: 'Node.js', level: 90, color: 'bg-green-500' },
        { name: 'Python/Django', level: 85, color: 'bg-yellow-500' },
      ]
    },
    {
      title: 'CYBERSECURITY TOOLS',
      icon: 'fa-tools',
      color: 'text-hacker-green',
      bg: 'bg-terminal-bg',
      skills: [
        { name: 'Burp Suite', level: 92, color: 'bg-orange-500' },
        { name: 'Metasploit', level: 85, color: 'bg-red-600' },
        { name: 'Kali Linux', level: 90, color: 'bg-blue-500' },
        { name: 'Nmap/Wireshark', level: 88, color: 'bg-purple-500' },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="neon-glow">SYSTEM_SKILLS</span>
          </h2>
          <div className="h-1 w-32 bg-hacker-green mx-auto mb-4"></div>
          <p className="terminal-text max-w-2xl mx-auto">
            Advanced technical expertise in cybersecurity and full-stack development
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className={`matrix-border p-6 ${category.bg}`}
            >
              <div className="flex items-center mb-8">
                <div className={`w-12 h-12 border-2 border-hacker-green rounded-lg flex items-center justify-center mr-4 ${category.color}`}>
                  <i className={`fa ${category.icon} text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold font-mono">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-sm">{skill.name}</span>
                      <span className="font-bold text-hacker-green">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-hacker-dark border border-hacker-green/30 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className={`h-3 rounded-full ${skill.color} shadow-[0_0_10px_currentColor]`}
                      ></motion.div>
                    </div>
                    {/* Binary Progress Indicator */}
                    <div className="text-xs text-hacker-green/50 font-mono mt-1 flex justify-between">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <span key={i}>
                          {Math.random() > 0.5 ? '1' : '0'}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools & Technologies */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8 neon-glow">
            TECH_STACK
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'Kali Linux', 'React', 'Laravel', 'Python', 'Docker', 'AWS',
              'Metasploit', 'Node.js', 'MySQL', 'Redis', 'Git', 'Jenkins',
              'Burp Suite', 'Vue.js', 'Django', 'MongoDB', 'Nginx', 'Ansible'
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="matrix-border p-4 text-center hover:shadow-[0_0_20px_#00ff00] transition-all duration-300 cursor-pointer group"
              >
                <div className="text-hacker-green font-mono text-sm group-hover:scale-110 transition-transform">
                  {tech}
                </div>
                <div className="text-xs text-hacker-green/50 mt-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="mx-1">
                      {Math.random() > 0.5 ? '1' : '0'}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;