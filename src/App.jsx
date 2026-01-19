import { useState, useEffect, useRef } from 'react';
import './App.css';
import Footer from './components/Footer.jsx';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [counters, setCounters] = useState({ projects: 0, years: 0, satisfaction: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [techFilter, setTechFilter] = useState('all');
  const canvasRef = useRef(null);
  const floatingBallsRef = useRef([]);

  // Binary animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Binary characters
    const binaryChars = ['0', '1'];
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    // Draw function
    const draw = () => {
      // Semi-transparent black background for trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text
      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const char = binaryChars[Math.floor(Math.random() * binaryChars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Typing animation
  useEffect(() => {
    const roles = [
      "Ethical Hacker",
      "Penetration Tester",
      "Full-Stack Developer",
      "Security Expert"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        setTypingText(currentRole.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypingText(currentRole.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }

      setTimeout(type, typeSpeed);
    };

    type();
  }, []);

  // Counter animation
  useEffect(() => {
    const targetValues = { projects: 7, years: 3, satisfaction: 100 };
    const speed = 200;

    Object.keys(targetValues).forEach(key => {
      const target = targetValues[key];
      const increment = target / speed;
      let current = 0;

      const updateCount = () => {
        current += increment;
        if (current < target) {
          setCounters(prev => ({ ...prev, [key]: Math.ceil(current) }));
          setTimeout(updateCount, 1);
        } else {
          setCounters(prev => ({ ...prev, [key]: target }));
        }
      };

      updateCount();
    });
  }, []);

  // Floating particles
  useEffect(() => {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute w-1 h-1 bg-green-500/30 rounded-full';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `float ${6 + Math.random() * 4}s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(particle);
    }

    return () => {
      const particles = container.querySelectorAll('.particle');
      particles.forEach(p => p.remove());
    };
  }, []);

  // Floating balls
  useEffect(() => {
    const container = document.querySelector('.floating-balls-container');
    if (!container) return;

    const colors = [
      'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
      'bg-gradient-to-br from-emerald-500/10 to-teal-500/10',
      'bg-gradient-to-br from-teal-500/10 to-cyan-500/10',
    ];

    const balls = [];
    const count = window.innerWidth < 768 ? 4 : 6;

    for (let i = 0; i < count; i++) {
      const ball = document.createElement('div');
      const size = Math.floor(Math.random() * 100) + 80;
      const color = colors[i % colors.length];
      
      ball.className = `absolute rounded-full ${color} animate-float`;
      ball.style.width = `${size}px`;
      ball.style.height = `${size}px`;
      ball.style.filter = 'blur(25px)';
      ball.style.opacity = '0.6';
      ball.style.left = `${Math.random() * (window.innerWidth - 150)}px`;
      ball.style.top = `${Math.random() * (window.innerHeight - 150)}px`;
      ball.style.animationDelay = `${Math.random() * 5}s`;
      ball.style.animationDuration = `${Math.random() * 10 + 18}s`;

      container.appendChild(ball);
      balls.push(ball);
    }

    floatingBallsRef.current = balls;

    return () => {
      balls.forEach(ball => ball.remove());
    };
  }, []);

  // Scroll progress
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      const progressBar = document.querySelector('.scroll-progress');
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'languages', 'services', 'projects', 'contact'];
    
    const handleScroll = () => {
      let current = '';
      
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const scrollPosition = window.pageYOffset + 100;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
          }
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  // Technologies data
  const technologies = [
    { name: 'React JS', category: 'frontend', icon: 'fab fa-react' },
    { name: 'Node.js', category: 'backend', icon: 'fab fa-node-js' },
    { name: 'JavaScript', category: 'frontend', icon: 'fab fa-js' },
    { name: 'Python', category: 'backend', icon: 'fab fa-python' },
    { name: 'PHP/Laravel', category: 'backend', icon: 'fab fa-laravel' },
    { name: 'HTML5', category: 'frontend', icon: 'fab fa-html5' },
    { name: 'CSS3/Tailwind', category: 'frontend', icon: 'fab fa-css3-alt' },
    { name: 'Bootstrap', category: 'frontend', icon: 'fab fa-bootstrap' },
    { name: 'MongoDB', category: 'db', icon: 'fas fa-database' },
    { name: 'MySQL', category: 'db', icon: 'fas fa-database' },
    { name: 'Git', category: 'tools', icon: 'fab fa-git-alt' },
    { name: 'Docker', category: 'tools', icon: 'fab fa-docker' },
  ];

  const filteredTech = technologies.filter(tech => {
    const matchesFilter = techFilter === 'all' || tech.category === techFilter;
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const services = [
    { title: 'Penetration Testing', icon: 'fas fa-shield-alt', desc: 'Comprehensive security assessments and vulnerability testing' },
    { title: 'Web Development', icon: 'fas fa-code', desc: 'Secure and scalable web applications development' },
    { title: 'Security Auditing', icon: 'fas fa-search', desc: 'Thorough security analysis and compliance checking' },
    { title: 'Network Security', icon: 'fas fa-network-wired', desc: 'Infrastructure protection and monitoring' },
    { title: 'Malware Analysis', icon: 'fas fa-virus', desc: 'Reverse engineering and threat analysis' },
    { title: 'Incident Response', icon: 'fas fa-first-aid', desc: '24/7 emergency security response services' },
  ];

  const timeline = [
    { year: '2019', title: 'Started Computer Basics', desc: 'Built foundation in Windows, MS Office, and basic programming concepts' },
    { year: '2022', title: 'Web Development Journey', desc: 'Mastered HTML, CSS, JavaScript and built first websites' },
    { year: '2023', title: 'Full-Stack Development', desc: 'Learned React, Laravel, Node.js for full-stack applications' },
    { year: '2023', title: 'Security Certification', desc: 'Obtained CEH and PWK certifications in cybersecurity' },
    { year: '2024', title: 'Professional Experience', desc: 'Started working as security consultant and developer' },
    { year: '2025', title: 'Advanced Security', desc: 'Specialized in advanced penetration testing and threat hunting' },
  ];

  const projects = [
    { name: 'Security Dashboard', desc: 'Real-time threat monitoring system', tags: ['React', 'Node.js', 'Security'] },
    { name: 'PenTest Toolkit', desc: 'Automated penetration testing suite', tags: ['Python', 'Security', 'Automation'] },
    { name: 'Encrypted Messenger', desc: 'End-to-end encrypted chat application', tags: ['React', 'Crypto', 'WebRTC'] },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-black text-green-100' : 'bg-gray-900 text-green-300'}`}>
      {/* Binary Canvas Background */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-30"
      />
      
      {/* Floating Background Elements */}
      <div className="floating-balls-container fixed inset-0 -z-10 overflow-hidden pointer-events-none" />
      <div className="particles-container fixed inset-0 pointer-events-none z-0" />
      
      {/* Scroll Progress Bar */}
      <div className="scroll-progress fixed top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 z-50 transition-all duration-100" />
      
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-8 right-8 w-12 h-12 bg-black/80 backdrop-blur-lg border border-green-500/30 rounded-full flex items-center justify-center cursor-pointer z-40 transition-all duration-300 hover:scale-110 hover:border-green-500 shadow-lg hover:shadow-green-500/20"
      >
        <i className={`fas ${isDarkMode ? 'fa-sun text-green-400' : 'fa-moon text-green-400'}`} />
      </button>
      
      {/* Floating Navigation */}
      <div className="hidden lg:flex fixed right-8 top-1/2 transform -translate-y-1/2 flex-col gap-4 z-40">
        {['home', 'about', 'skills', 'services', 'projects', 'contact'].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`nav-item w-12 h-12 backdrop-blur-lg border rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg
              ${activeSection === section 
                ? 'bg-green-600/20 border-green-500 text-green-400' 
                : 'bg-black/50 border-green-500/30 text-green-400/70 hover:border-green-500'
              }`}
            title={section.charAt(0).toUpperCase() + section.slice(1)}
          >
            <i className={`fas fa-${
              section === 'home' ? 'home' :
              section === 'about' ? 'user' :
              section === 'skills' ? 'code' :
              section === 'services' ? 'briefcase' :
              section === 'projects' ? 'project-diagram' : 'envelope'
            }`} />
          </button>
        ))}
      </div>
      
      {/* Header */}
      <header className="glass-header fixed top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl bg-black/80 backdrop-blur-xl border border-green-500/20 rounded-2xl z-40 shadow-lg shadow-green-500/10">
          <div className="mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button onClick={() => scrollToSection('home')} className="logo relative group">
              <span className="logo-text text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-110">
                K4LI1D_AFG4NM4L
              </span>
            </button>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {['home', 'about', 'skills', 'services', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`relative transition-all duration-500 py-3 px-6 rounded-xl hover:scale-105 group
                    ${activeSection === section
                      ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                      : 'text-green-400/70 hover:text-green-400 hover:bg-green-500/5'
                    }`}
                >
                  <span className="relative z-10 uppercase tracking-wider text-sm font-mono">
                    {section}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-600/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                </button>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hamburger-btn flex flex-col justify-center items-center w-12 h-12 rounded-xl bg-green-500/10 hover:bg-green-500/20 transition-all duration-500 group border border-green-500/30"
              >
                <span className={`block w-6 h-0.5 bg-green-400 mb-1.5 transition-all duration-500 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-green-400 mb-1.5 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-green-400 transition-all duration-500 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className={`mobile-nav absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-green-500/20 mt-2 rounded-2xl transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="flex flex-col p-6 space-y-4">
              {['home', 'about', 'skills', 'services', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="flex items-center text-green-400/70 hover:text-green-400 transition-all duration-300 py-3 px-4 rounded-lg bg-green-500/5 hover:bg-green-500/10 border border-green-500/10 hover:border-green-500/30"
                >
                  <i className={`fas fa-${
                    section === 'home' ? 'home' :
                    section === 'about' ? 'user' :
                    section === 'skills' ? 'code' :
                    section === 'services' ? 'briefcase' :
                    section === 'projects' ? 'project-diagram' : 'envelope'
                  } w-6 mr-3`} />
                  <span className="uppercase tracking-wider font-mono">{section}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
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
      
      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                &gt; SYSTEM_INFO
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
      
      {/* Technologies Section */}
      <section id="skills" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-wide font-mono">
              <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 bg-clip-text text-transparent">
                &gt; TOOLSET
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full mb-8" />
            <p className="text-green-300/80 text-xl mt-8 max-w-3xl mx-auto leading-loose font-mono">
              [root@kali]~# Technologies and tools I use for development
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-16">
            <div className="max-w-md mx-auto mb-12">
              <div className="relative group">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="search technologies..."
                  className="w-full px-6 py-4 pl-14 bg-black/50 border border-green-500/30 rounded-2xl text-green-300 placeholder-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 backdrop-blur-lg group-hover:scale-105 font-mono"
                />
                <i className="fas fa-search absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-green-500/50 group-hover:text-green-500 transition-colors duration-300" />
              </div>
            </div>
            
            <div className="hidden md:flex flex-wrap justify-center gap-4 mb-8">
              {['all', 'frontend', 'backend', 'tools', 'db'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTechFilter(filter)}
                  className={`relative px-8 py-4 font-semibold rounded-2xl border backdrop-blur-xl transition-all duration-500 cursor-pointer overflow-hidden group font-mono
                    ${techFilter === filter
                      ? 'text-green-400 border-green-500/50 bg-green-500/10'
                      : 'text-green-400/70 border-green-500/30 bg-black/40 hover:bg-green-500/5'
                    }`}
                >
                  <span className="relative z-10 uppercase tracking-wider">
                    {filter === 'all' ? 'All Tools' : filter}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Technologies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredTech.map((tech, idx) => (
              <div key={idx} className="group relative">
                <div className="bg-gradient-to-br from-black/60 to-green-900/10 rounded-2xl border-2 border-green-500/20 backdrop-blur-lg p-6 text-center hover:bg-green-900/20 hover:border-green-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/20">
                    <i className={`${tech.icon} text-white text-2xl`} />
                  </div>
                  <h4 className="text-green-300 font-bold text-base mb-2 group-hover:text-green-400 transition-colors duration-300 tracking-wide font-mono">
                    {tech.name}
                  </h4>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-black text-green-300 text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 w-56 backdrop-blur-lg border border-green-500/30 font-mono">
                    {tech.category.toUpperCase()} technology
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
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
      
      {/* Timeline Section */}
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
      
      {/* Projects Section */}
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
      
      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-mono">
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              &gt; CONTACT
            </span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="rounded-2xl p-8 shadow-2xl bg-black/50 border border-green-500/20">
                <h3 className="text-2xl font-bold mb-6 text-green-400 font-mono">&gt; CONTACT_INFO</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-green-500/10 rounded-full p-3 mr-4 border border-green-500/30">
                      <i className="fas fa-envelope text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-400 font-mono">EMAIL</h4>
                      <p className="text-green-300/80 font-mono">khalidafghanmal2003@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-500/10 rounded-full p-3 mr-4 border border-green-500/30">
                      <i className="fas fa-phone text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-400 font-mono">PHONE</h4>
                      <p className="text-green-300/80 font-mono">+93 793237732</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-500/10 rounded-full p-3 mr-4 border border-green-500/30">
                      <i className="fas fa-map-marker-alt text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-400 font-mono">LOCATION</h4>
                      <p className="text-green-300/80 font-mono">Kabul, Afghanistan</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex space-x-4">
                  {[
                    { icon: 'fab fa-linkedin-in', url: 'https://linkedin.com/in/khalidafghanmal' },
                    { icon: 'fab fa-github', url: 'https://github.com/khalidafghanmal' },
                    { icon: 'fab fa-twitter', url: 'https://twitter.com/khalidafghanmal' },
                    { icon: 'fab fa-facebook-f', url: 'https://facebook.com/khalid.afghanmal' }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-500/20 transition border border-green-500/30 hover:border-green-500/50"
                    >
                      <i className={`${social.icon} text-green-400`} />
                    </a>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-8 shadow-2xl bg-black/50 border border-green-500/20">
                <h3 className="text-2xl font-bold mb-6 text-green-400 font-mono">&gt; SEND_MESSAGE</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-green-400/70 mb-2 font-mono">NAME</label>
                    <input 
                      type="text" 
                      className="bg-black/50 border border-green-500/30 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-green-300 font-mono placeholder-green-500/50"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-green-400/70 mb-2 font-mono">EMAIL</label>
                    <input 
                      type="email" 
                      className="bg-black/50 border border-green-500/30 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-green-300 font-mono placeholder-green-500/50"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-green-400/70 mb-2 font-mono">MESSAGE</label>
                    <textarea 
                      rows="4" 
                      className="bg-black/50 border border-green-500/30 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-green-300 font-mono placeholder-green-500/50"
                      placeholder="Type your message..."
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-green-600 to-emerald-700 border border-green-500/30 w-full py-3 rounded-lg font-medium hover:scale-105 transition text-white font-mono uppercase tracking-wider"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer /> 
    </div>
  );
}

export default App;