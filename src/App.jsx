import { useState, useEffect, useRef } from 'react';
import './App.css';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Technologies from './components/Technologies.jsx';
import Services from './components/Services.jsx';
import Timeline from './components/Timeline.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx'
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [typingText, setTypingText] = useState('');
  const [counters, setCounters] = useState({ projects: 0, years: 0, satisfaction: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

 

  
  const services = [
    { title: 'Penetration Testing', icon: 'fas fa-shield-alt', desc: 'Comprehensive security assessments and vulnerability testing' },
    { title: 'Web Development', icon: 'fas fa-code', desc: 'Secure and scalable web applications development' },
    { title: 'Security Auditing', icon: 'fas fa-search', desc: 'Thorough security analysis and compliance checking' },
    { title: 'Network Security', icon: 'fas fa-network-wired', desc: 'Infrastructure protection and monitoring' },
    { title: 'Malware Analysis', icon: 'fas fa-virus', desc: 'Reverse engineering and threat analysis' },
    { title: 'Incident Response', icon: 'fas fa-first-aid', desc: '24/7 emergency security response services' },
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
      
     <Hero />
     <About />
     <Technologies />
     <Services />
     <Timeline />
     <Projects />
     <Contact />
      
      
    
      
      {/* Contact Section */}
     
      <Footer /> 
    </div>
  );
}

export default App;