import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [typedIndex, setTypedIndex] = useState(0);
  const hackLines = [
    "Initializing system...",
    "Loading modules...",
    "Establishing secure connection...",
    "Accessing mainframe...",
    "Bypassing firewall...",
    "System penetration successful!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedIndex((prev) => (prev + 1) % hackLines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen relative pt-32 overflow-hidden">
      {/* Terminal Interface */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Terminal Header */}
          <div className="matrix-border p-6 mb-8 bg-terminal-bg/50">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-hacker-green"></div>
              <span className="ml-4 text-hacker-green font-mono">root@khalid:~</span>
            </div>

            {/* Terminal Content */}
            <div className="space-y-4">
              {hackLines.slice(0, typedIndex + 1).map((line, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-hacker-green font-bold">$</span>
                  <Typed
                    strings={[line]}
                    typeSpeed={30}
                    startDelay={index * 800}
                    className="text-hacker-green font-mono"
                  />
                  {index === typedIndex && <span className="terminal-cursor"></span>}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4">
                  <span className="block text-hacker-green">KHALID</span>
                  <span className="block text-secondary">AFGHANMAL</span>
                </h1>
                <div className="h-1 w-48 bg-hacker-green mb-6"></div>
                <div className="space-y-2">
                  <p className="text-xl text-hacker-green/80">
                    <span className="font-bold">[</span> 
                    <Typed
                      strings={[
                        'Ethical Hacker',
                        'Penetration Tester',
                        'Full-Stack Developer',
                        'Cybersecurity Expert',
                        'Bug Bounty Hunter'
                      ]}
                      typeSpeed={40}
                      backSpeed={30}
                      loop
                      className="text-secondary ml-2 mr-2"
                    />
                    <span className="font-bold">]</span>
                  </p>
                  <p className="terminal-text">
                    Specializing in web application security, penetration testing, 
                    and secure code development. Certified Ethical Hacker (CEH) 
                    and offensive security specialist.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '100+', label: 'VULNERABILITIES FOUND' },
                  { value: '50+', label: 'SECURED SYSTEMS' },
                  { value: '7+', label: 'PROJECTS DEPLOYED' },
                ].map((stat, index) => (
                  <div key={index} className="matrix-border p-4 text-center bg-terminal-bg/30">
                    <div className="text-3xl font-bold text-hacker-green mb-2">{stat.value}</div>
                    <div className="text-xs font-mono">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="hacker-btn group">
                  <span>EXPLOIT SYSTEM</span>
                  <i className="fa fa-terminal ml-2 group-hover:animate-bounce"></i>
                </button>
                <button className="hacker-btn border-dashed group">
                  <span>DOWNLOAD RESUME</span>
                  <i className="fa fa-download ml-2 group-hover:animate-bounce"></i>
                </button>
              </div>
            </div>

            {/* Profile with Hacker Effects */}
            <div className="relative">
              <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
                {/* Profile Image Container */}
                <div className="absolute inset-0 bg-hacker-green rounded-full animate-pulse-glow opacity-20"></div>
                <div className="absolute inset-4 bg-hacker-dark rounded-full overflow-hidden border-4 border-hacker-green">
                  <img 
                    src="/images/khalid.jpeg" 
                    alt="Khalid Afghanmal"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Scan Lines Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hacker-green/5 to-transparent animate-scan-line"></div>
                </div>

                {/* Floating Hacker Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 matrix-border rounded-full flex items-center justify-center animate-bounce">
                  <i className="fa fa-shield-alt text-hacker-green text-2xl"></i>
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 matrix-border rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                  <i className="fa fa-terminal text-hacker-green text-2xl"></i>
                </div>
                <div className="absolute top-1/2 -right-8 w-20 h-20 matrix-border rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '2s' }}>
                  <i className="fa fa-bug text-hacker-green text-2xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Matrix Code Fall Effect */}
      <div className="absolute inset-0 -z-10 matrix-code opacity-10"></div>
    </section>
  );
};

export default Hero;