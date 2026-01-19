import React, { useState, useEffect } from 'react';
import { Link } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'ROOT@HACKER:~$', icon: 'fa-terminal' },
    { id: 'about', label: 'WHO_AM_I', icon: 'fa-user-secret' },
    { id: 'skills', label: 'SKILLS.TXT', icon: 'fa-code' },
    { id: 'projects', label: 'PROJECTS/', icon: 'fa-folder' },
    { id: 'contact', label: 'CONTACT.SH', icon: 'fa-envelope' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-hacker-dark/90 backdrop-blur-lg border-b-2 border-hacker-green shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="#home" 
            className="text-2xl font-bold neon-glow animate-pulse-glow"
            onClick={() => setActiveSection('home')}
          >
            <span className="text-hacker-green">KHA</span>
            <span className="text-secondary">LID_</span>
            <span className="text-hacker-green">AFG</span>
            <span className="text-secondary">HANMAL</span>
            <span className="terminal-cursor ml-2"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`relative px-4 py-2 border-2 rounded-lg transition-all duration-300 group ${
                  activeSection === item.id
                    ? 'border-hacker-green bg-terminal-bg shadow-[0_0_15px_#00ff00]'
                    : 'border-hacker-green/30 hover:border-hacker-green'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <i className={`fa ${item.icon} text-sm`}></i>
                  <span className="font-mono text-sm tracking-wider">{item.label}</span>
                </div>
                <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-hacker-green ${
                  activeSection === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                } transition-opacity duration-300`}></div>
              </Link>
            ))}
          </nav>

          {/* System Status */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-hacker-green animate-pulse"></div>
              <span className="text-sm font-mono">SYSTEM_ACTIVE</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden hacker-btn p-2"
          >
            <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 border-2 border-hacker-green bg-terminal-bg rounded-lg p-4 animate-glitch">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={`#${item.id}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveSection(item.id);
                  }}
                  className={`block px-4 py-3 rounded border-2 transition-all ${
                    activeSection === item.id
                      ? 'border-hacker-green bg-black text-hacker-green'
                      : 'border-hacker-green/30 hover:border-hacker-green'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <i className={`fa ${item.icon}`}></i>
                    <span className="font-mono">{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;