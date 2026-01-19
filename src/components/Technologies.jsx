import { useState } from 'react';
const Technologies =() =>{
    const [searchTerm, setSearchTerm] = useState('');
    const [techFilter, setTechFilter] = useState('all');

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

    
    return(
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
    )
}

export default Technologies;