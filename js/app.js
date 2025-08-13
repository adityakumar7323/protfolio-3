// Main React Portfolio Application
// Author: Aditya Bhagat
// Description: World-class portfolio website with modern UI/UX

const { useState, useEffect, useRef } = React;

// Theme Context for Dark/Light Mode
const ThemeContext = React.createContext();

// Theme Provider Component
const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        } else {
            setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(!darkMode);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Navigation Component
const Navigation = () => {
    const { darkMode, toggleTheme } = React.useContext(ThemeContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Education', href: '#education' },
        { name: 'Achievements', href: '#achievements' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Contact', href: '#contact' }
    ];

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
                ? 'glass-effect shadow-lg py-2' 
                : 'bg-transparent py-4'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                            Aditya Bhagat
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.href)}
                                    className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Theme Toggle & Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                            aria-label="Toggle theme"
                        >
                            {darkMode ? (
                                <i className="fas fa-sun text-yellow-500"></i>
                            ) : (
                                <i className="fas fa-moon text-gray-600"></i>
                            )}
                        </button>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                            >
                                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 glass-effect rounded-lg p-4">
                        <div className="flex flex-col space-y-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.href)}
                                    className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-left"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

// Hero Section Component
const HeroSection = () => {
    const [text, setText] = useState('');
    const roles = ['B.Tech IT Student', 'Aspiring Developer', 'Web Developer', 'Software Enthusiast'];
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        const timeout = setTimeout(() => {
            if (isDeleting) {
                setText(currentRole.substring(0, text.length - 1));
                if (text === '') {
                    setIsDeleting(false);
                    setRoleIndex((roleIndex + 1) % roles.length);
                }
            } else {
                setText(currentRole.substring(0, text.length + 1));
                if (text === currentRole) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, roleIndex, roles]);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 gradient-bg opacity-10 dark:opacity-5"></div>
            
            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-2 h-2 bg-primary-500 rounded-full animate-float opacity-30`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 6}s`,
                            animationDuration: `${6 + Math.random() * 4}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    {/* Profile Image */}
                    <div className="mb-8" data-aos="fade-up">
                        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-1 animate-glow">
                            <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                <img src="./assets/images/Aditya.png" alt="Aditya Bhagat" className="w-full h-full rounded-full object-cover" onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'flex';
                                }} />
                                <i className="fas fa-user text-4xl text-gray-600 dark:text-gray-400" style={{display: 'none'}}></i>
                            </div>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6" data-aos="fade-up" data-aos-delay="200">
                        <span className="bg-gradient-to-r from-primary-500 via-purple-500 to-secondary-500 bg-clip-text text-transparent">
                            Aditya Bhagat
                        </span>
                    </h1>

                    {/* Typing Animation */}
                    <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-700 dark:text-gray-300" data-aos="fade-up" data-aos-delay="400">
                        <span className="text-primary-500">{text}</span>
                        <span className="animate-pulse">|</span>
                    </h2>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="600">
                        Enthusiastic and highly motivated B.Tech Information Technology student with a solid understanding of 
                        software development, web technologies, and database systems.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="800">
                        <button
                            onClick={() => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-glow"
                        >
                            <i className="fas fa-rocket mr-2"></i>
                            View My Work
                        </button>
                        <a
                            href="https://drive.google.com/file/d/1FDKgWv-x9UdbJmdiQjoWTB-TWbnkOPWu/view?usp=drive_link"
                            download="resume.pdf"
                            className="px-8 py-4 border-2 border-primary-500 text-primary-500 font-semibold rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                        >
                            <i className="fas fa-download mr-2"></i>
                            View My Resume
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="mt-12 flex justify-center space-x-6" data-aos="fade-up" data-aos-delay="1000">
                        <a href="https://www.linkedin.com/in/adityabhagat22/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200 transform hover:scale-110">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/adityakumar7323" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200 transform hover:scale-110">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="mailto:adityakumar4092@gmail.com" className="text-2xl text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200 transform hover:scale-110">
                            <i className="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <button
                    onClick={() => document.querySelector('#about').scrollIntoView({ behavior: 'smooth' })}
                    className="text-primary-500 text-2xl"
                >
                    <i className="fas fa-chevron-down"></i>
                </button>
            </div>
        </section>
    );
};

// About Section Component
const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">
                        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                            About Me
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400" data-aos="fade-up" data-aos-delay="200">
                        Get to know more about my journey and passion
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <div className="relative" data-aos="fade-right">
                        <div className="relative">
                            <div className="w-full h-96 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-1">
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                                    <i className="fas fa-user text-6xl text-gray-600 dark:text-gray-400"></i>
                                    {<img src="./assets/images/aditya.png" alt="About Aditya" className="w-full h-full rounded-2xl object-cover" />}
                                </div>
                            </div>
                            
                            {/* Floating Cards */}
                            <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg animate-float">
                                <div className="text-primary-500 text-2xl mb-2">
                                    <i className="fas fa-code"></i>
                                </div>
                                <div className="text-sm font-semibold">4+ Years</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Experience</div>
                            </div>
                            
                            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg animate-float" style={{animationDelay: '2s'}}>
                                <div className="text-secondary-500 text-2xl mb-2">
                                    <i className="fas fa-project-diagram"></i>
                                </div>
                                <div className="text-sm font-semibold">15+ Projects</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div data-aos="fade-left">
                        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                            About Me
                        </h3>
                        
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            Enthusiastic and highly motivated B.Tech Information Technology student with a solid understanding of 
                            software development, web technologies, and database systems. Skilled in programming languages such as 
                            Python, Java, and C++, along with experience in HTML, CSS, JavaScript, and MySQL.
                        </p>
                        
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Currently pursuing my degree at Chandigarh Engineering College, I am passionate about learning new 
                            technologies and building innovative solutions. My goal is to contribute to meaningful projects that 
                            make a positive impact.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                                <div className="text-3xl font-bold text-primary-500 mb-2">2026</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Expected Graduation</div>
                            </div>
                            <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                                <div className="text-3xl font-bold text-secondary-500 mb-2">6+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Programming Languages</div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                            <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                                <i className="fas fa-graduation-cap mr-2 text-primary-500"></i>
                                Current Education
                            </h4>
                            <div className="text-gray-600 dark:text-gray-400">
                                <div className="font-semibold">Bachelor of Technology (Information Technology)</div>
                                <div>Chandigarh Engineering College, Mohali, Punjab</div>
                                <div className="text-sm">September 2022 - June 2026</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Skills Section Component
const SkillsSection = () => {
    const [visibleSkills, setVisibleSkills] = useState({});
    const skillsRef = useRef();

    const skills = [
        { name: 'C', level: 85, icon: 'fas fa-code', color: 'from-blue-500 to-indigo-500' },
        { name: 'C++', level: 90, icon: 'fas fa-code', color: 'from-purple-500 to-pink-500' },
        { name: 'HTML', level: 95, icon: 'fab fa-html5', color: 'from-orange-500 to-red-500' },
        { name: 'CSS', level: 90, icon: 'fab fa-css3-alt', color: 'from-blue-500 to-cyan-500' },
        { name: 'JavaScript', level: 85, icon: 'fab fa-js-square', color: 'from-yellow-500 to-orange-500' },
        { name: 'Python', level: 80, icon: 'fab fa-python', color: 'from-green-500 to-blue-500' },
        { name: 'Java', level: 75, icon: 'fab fa-java', color: 'from-red-500 to-orange-500' },
        { name: 'MySQL', level: 80, icon: 'fas fa-database', color: 'from-blue-600 to-blue-800' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Trigger skill animations with delay
                        skills.forEach((skill, index) => {
                            setTimeout(() => {
                                setVisibleSkills(prev => ({
                                    ...prev,
                                    [skill.name]: true
                                }));
                            }, index * 200);
                        });
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="skills" className="py-20" ref={skillsRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">
                        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                            My Skills
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400" data-aos="fade-up" data-aos-delay="200">
                        Technologies I work with to bring ideas to life
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.name}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="flex items-center mb-4">
                                <div className={`text-3xl mr-4 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                                    <i className={skill.icon}></i>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {skill.name}
                                        </h3>
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {skill.level}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                        <div
                                            className={`skill-bar h-3 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                                            style={{
                                                width: visibleSkills[skill.name] ? `${skill.level}%` : '0%'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Skills Icons */}
                <div className="mt-16" data-aos="fade-up">
                    <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                        Technical Competencies & Interpersonal Skills
                    </h3>
                    
                    {/* Technical Competencies */}
                    <div className="mb-12">
                        <h4 className="text-lg font-semibold text-center mb-6 text-gray-700 dark:text-gray-300">
                            Technical Competencies
                        </h4>
                        <div className="flex flex-wrap justify-center gap-6">
                            {[
                                { icon: 'fab fa-windows', name: 'Windows' },
                                { icon: 'fab fa-linux', name: 'Linux' },
                                { icon: 'fas fa-database', name: 'MySQL' },
                                { icon: 'fas fa-code', name: 'Programming' },
                                { icon: 'fas fa-globe', name: 'Web Technologies' },
                                { icon: 'fas fa-laptop-code', name: 'Software Development' }
                            ].map((tech, index) => (
                                <div
                                    key={tech.name}
                                    className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                                    data-aos="zoom-in"
                                    data-aos-delay={index * 100}
                                >
                                    <i className={`${tech.icon} text-3xl text-primary-500 mb-2`}></i>
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interpersonal Skills */}
                    <div>
                        <h4 className="text-lg font-semibold text-center mb-6 text-gray-700 dark:text-gray-300">
                            Interpersonal Skills
                        </h4>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                'Team Building', 'Management', 'Coordination', 'Decision Making', 
                                'Analytical Skills', 'Writing Skills'
                            ].map((skill, index) => (
                                <div
                                    key={skill}
                                    className="px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 50}
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Projects Section Component
const ProjectsSection = () => {
    const projects = [
        {
            title: 'Library Management System',
            description: 'A comprehensive library management system built with HTML, CSS, and JavaScript featuring user management, catalog management, and efficient borrowing/returning system for library operations.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
            image: './assets/images/library-project.jpg', // Placeholder
            liveUrl: '#',
            githubUrl: '#',
            features: ['User Management', 'Catalog Management', 'Book Borrowing', 'Return System']
        },
        {
            title: 'ReactJS Training Project',
            description: 'A 6-week intensive ReactJS training project completed at Think Next Technologies. Built reusable components with virtual DOM optimization and modern React patterns.',
            technologies: ['React.js', 'JavaScript', 'CSS', 'HTML'],
            image: './assets/images/react-project.jpg', // Placeholder
            liveUrl: '#',
            githubUrl: '#',
            features: ['Reusable Components', 'Virtual DOM', 'Modern React Patterns', 'Responsive Design']
        },
        {
            title: 'Database Management Project',
            description: 'Advanced database project focusing on efficient data management, query optimization, and database design principles using MySQL and modern database technologies.',
            technologies: ['MySQL', 'Database Design', 'SQL', 'Data Management'],
            image: './assets/images/database-project.jpg', // Placeholder
            liveUrl: '#',
            githubUrl: '#',
            features: ['Query Optimization', 'Database Design', 'Data Management', 'Performance Tuning']
        }
    ];

    return (
        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">
                        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                            My Projects
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400" data-aos="fade-up" data-aos-delay="200">
                        Showcasing my latest work and creative solutions
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={project.title}
                            className="project-card bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
                            data-aos="fade-up"
                            data-aos-delay={index * 200}
                        >
                            {/* Project Image */}
                            <div className="relative h-48 bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                                <i className="fas fa-image text-4xl text-white opacity-50"></i>
                                {/* Replace with actual image: <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> */}
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                                    <div className="flex space-x-4">
                                        <a
                                            href={project.liveUrl}
                                            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="fas fa-external-link-alt mr-2"></i>
                                            Live Demo
                                        </a>
                                        <a
                                            href={project.githubUrl}
                                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="fab fa-github mr-2"></i>
                                            Code
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Project Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                                    {project.title}
                                </h3>
                                
                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Features */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                        Key Features:
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.features.map((feature, featureIndex) => (
                                            <span
                                                key={featureIndex}
                                                className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Technologies */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                        Technologies:
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-xs rounded-full font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-3">
                                    <a
                                        href={project.liveUrl}
                                        className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fas fa-eye mr-2"></i>
                                        View Project
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-500 transition-all duration-200 text-sm font-medium"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-github"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Projects Button */}
                <div className="text-center mt-12" data-aos="fade-up">
                    <a
                        href="[Your GitHub]"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-github mr-2"></i>
                        View All Projects on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};

// Education Section Component
const EducationSection = () => {
    const education = [
        {
            degree: 'Bachelor of Technology (Information Technology)',
            institution: 'Chandigarh Engineering College',
            location: 'Mohali, Punjab',
            duration: 'September 2022 - June 2026',
            status: 'Pursuing',
            icon: 'fas fa-graduation-cap',
            color: 'from-blue-500 to-purple-500'
        },
        {
            degree: 'Industrial Training Institute - Instrument Mechanic',
            institution: 'Mithila Private ITI',
            location: '',
            duration: 'September 2019 - April 2021',
            status: 'Completed',
            icon: 'fas fa-tools',
            color: 'from-green-500 to-teal-500'
        },
        {
            degree: 'Intermediate - Mathematics',
            institution: 'Amirchand Balika Uchh Vidyalaya',
            location: '',
            duration: 'March 2019 - March 2021',
            status: 'Completed',
            icon: 'fas fa-calculator',
            color: 'from-orange-500 to-red-500'
        },
        {
            degree: 'Matriculation',
            institution: 'Gandhi Sikshan Sansthan',
            location: '',
            duration: 'March 2018 - March 2019',
            status: 'Completed',
            icon: 'fas fa-school',
            color: 'from-indigo-500 to-purple-500'
        }
    ];

    return (
        <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">
                        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                            Education
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400" data-aos="fade-up" data-aos-delay="200">
                        My academic journey and educational background
                    </p>
                </div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>

                    <div className="space-y-12">
                        {education.map((edu, index) => (
                            <div
                                key={index}
                                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                                data-aos-delay={index * 200}
                            >
                                {/* Content */}
                                <div className="w-5/12">
                                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${edu.color} rounded-full mb-4`}>
                                            <i className={`${edu.icon} text-white text-xl`}></i>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {edu.degree}
                                        </h3>
                                        
                                        <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                                            {edu.institution}
                                        </h4>
                                        
                                        {edu.location && (
                                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                                                <i className="fas fa-map-marker-alt mr-2"></i>
                                                {edu.location}
                                            </p>
                                        )}
                                        
                                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                                            <i className="fas fa-calendar-alt mr-2"></i>
                                            {edu.duration}
                                        </p>
                                        
                                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                                            edu.status === 'Pursuing' 
                                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        }`}>
                                            {edu.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Timeline Node */}
                                <div className="w-2/12 flex justify-center">
                                    <div className="w-4 h-4 bg-white dark:bg-gray-900 border-4 border-primary-500 rounded-full"></div>
                                </div>

                                {/* Spacer */}
                                <div className="w-5/12"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Achievements Section Component  
const AchievementsSection = () => {
    const achievements = [
        {
            title: '2nd Position - Technical Quiz Competition',
            description: 'Secured 2nd position in technical quiz competition at Chandigarh Engineering College, Landran',
            year: '2024',
            icon: 'fas fa-trophy',
            color: 'from-yellow-500 to-orange-500',
            category: 'Academic'
        },
        {
            title: '2nd Position - Dance Competition',
            description: 'Achieved 2nd position in Dance Competition during Parivartan 2024 cultural event',
            year: '2024',
            icon: 'fas fa-music',
            color: 'from-pink-500 to-purple-500',
            category: 'Cultural'
        },
        {
            title: '1st Position - Singing Competition',
            description: 'Won 1st position in Singing Competition at Annual Function',
            year: '2021',
            icon: 'fas fa-microphone',
            color: 'from-green-500 to-emerald-500',
            category: 'Cultural'
        },
        {
            title: 'Database Certification',
            description: 'Successfully completed Database certification course from Coursera',
            year: '2023',
            icon: 'fas fa-database',
            color: 'from-blue-500 to-cyan-500',
            category: 'Certification'
        },
        {
            title: 'PHP Certification',
            description: 'Earned PHP programming certification from Coursera',
            year: '2023',
            icon: 'fab fa-php',
            color: 'from-indigo-500 to-purple-500',
            category: 'Certification'
        },
        {
            title: 'C++ Programming Certificate',
            description: 'Completed C++ Programming course with distinction',
            year: '2023',
            icon: 'fas fa-code',
            color: 'from-red-500 to-pink-500',
            category: 'Certification'
        }
    ];

    const categories = ['All', 'Academic', 'Cultural', 'Certification'];
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredAchievements = activeCategory === 'All' 
        ? achievements 
        : achievements.filter(achievement => achievement.category === activeCategory);

    return (
        <section id="achievements" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">
                        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                            Achievements & Certifications
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400" data-aos="fade-up" data-aos-delay="200">
                        Recognition of my academic and extracurricular excellence
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex justify-center mb-12" data-aos="fade-up">
                    <div className="flex flex-wrap gap-2 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    activeCategory === category
                                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAchievements.map((achievement, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-full mb-4`}>
                                <i className={`${achievement.icon} text-white text-2xl`}></i>
                            </div>
                            
                            <div className="flex items-center justify-between mb-2">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${achievement.color} text-white`}>
                                    {achievement.category}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {achievement.year}
                                </span>
                            </div>
                            
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                {achievement.title}
                            </h3>
                            
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {achievement.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8" data-aos="fade-up">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            <i className="fas fa-heart mr-2 text-primary-500"></i>
                            Interests & Hobbies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['Playing Guitar', 'Singing', 'Listening to Music', 'Bike Riding', 'Travelling'].map((hobby, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                                >
                                    {hobby}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            <i className="fas fa-language mr-2 text-secondary-500"></i>
                            Languages Known
                        </h3>
                        <div className="space-y-2">
                            {['English', 'Hindi', 'Urdu'].map((language, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                                    <span className="text-gray-600 dark:text-gray-400">{language}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Image Management Section Component
const ImageManagementSection = () => {
    const [showManagement, setShowManagement] = useState(false);
    
    const imageRequirements = [
        {
            filename: 'profile-main.jpg',
            category: 'Profile',
            description: 'Professional headshot for main profile',
            size: '400x400px',
            priority: 'High',
            usage: 'Hero section and about page'
        },
        {
            filename: 'college-life.jpg',
            category: 'Education',
            description: 'Campus life at Chandigarh Engineering College',
            size: '600x400px',
            priority: 'Medium',
            usage: 'Gallery section'
        },
        {
            filename: 'coding-workspace.jpg',
            category: 'Workspace',
            description: 'Your development environment setup',
            size: '600x400px',
            priority: 'Medium',
            usage: 'Gallery section'
        },
        {
            filename: 'project-presentation.jpg',
            category: 'Projects',
            description: 'Presenting your ReactJS training project',
            size: '600x400px',
            priority: 'High',
            usage: 'Projects and gallery sections'
        },
        {
            filename: 'competition-win.jpg',
            category: 'Achievements',
            description: 'Technical quiz competition achievement',
            size: '600x400px',
            priority: 'High',
            usage: 'Achievements and gallery sections'
        },
        {
            filename: 'cultural-event.jpg',
            category: 'Cultural',
            description: 'College cultural event participation',
            size: '600x400px',
            priority: 'Low',
            usage: 'Gallery section'
        },
        {
            filename: 'team-work.jpg',
            category: 'Projects',
            description: 'Working with teammates on group projects',
            size: '600x400px',
            priority: 'Medium',
            usage: 'Gallery section'
        },
        {
            filename: 'certification.jpg',
            category: 'Achievements',
            description: 'Receiving certification or course completion',
            size: '600x400px',
            priority: 'Medium',
            usage: 'Gallery section'
        }
    ];

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
            case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    if (!showManagement) {
        return (
            <div className="fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setShowManagement(true)}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                    title="Image Management"
                >
                    <i className="fas fa-images text-lg group-hover:scale-110 transition-transform duration-200"></i>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowManagement(false)}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Image Management Center</h2>
                            <p className="text-primary-100">Manage and upload your portfolio images</p>
                        </div>
                        <button
                            onClick={() => setShowManagement(false)}
                            className="text-white hover:text-gray-200 transition-colors duration-200"
                        >
                            <i className="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {/* Quick Start Guide */}
                    <div className="mb-8 bg-blue-50 dark:bg-blue-900 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                            <i className="fas fa-rocket mr-3"></i>
                            Quick Start Guide
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-blue-800 dark:text-blue-200">
                            <div>
                                <h4 className="font-semibold mb-2">📁 Step 1: Folder Setup</h4>
                                <p className="text-sm mb-4">Your images should be placed in: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">assets/images/</code></p>
                                
                                <h4 className="font-semibold mb-2">📸 Step 2: Add Images</h4>
                                <p className="text-sm mb-4">Use the exact filenames shown in the table below</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">🔧 Step 3: Enable Display</h4>
                                <p className="text-sm mb-4">Uncomment the img tags in the Gallery section code</p>
                                
                                <h4 className="font-semibold mb-2">✨ Step 4: Optimize</h4>
                                <p className="text-sm">Compress images for web (use TinyPNG or similar)</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Requirements Table */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <i className="fas fa-list-check mr-3"></i>
                            Image Requirements
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Filename</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Size</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {imageRequirements.map((img, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                                            <td className="px-4 py-3">
                                                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                                    {img.filename}
                                                </code>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                                                    {img.category}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                                                {img.description}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                {img.size}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(img.priority)}`}>
                                                    {img.priority}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="flex items-center text-orange-600 dark:text-orange-400">
                                                    <i className="fas fa-clock mr-1"></i>
                                                    <span className="text-xs">Pending</span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Image Guidelines */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-6 rounded-lg">
                            <div className="flex items-center mb-3">
                                <i className="fas fa-check-circle text-green-600 dark:text-green-400 text-xl mr-3"></i>
                                <h4 className="font-semibold text-green-900 dark:text-green-100">Best Practices</h4>
                            </div>
                            <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
                                <li>• Use high-quality, well-lit photos</li>
                                <li>• Maintain consistent style</li>
                                <li>• Optimize for web (WebP format)</li>
                                <li>• Keep file sizes under 500KB</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 p-6 rounded-lg">
                            <div className="flex items-center mb-3">
                                <i className="fas fa-exclamation-triangle text-yellow-600 dark:text-yellow-400 text-xl mr-3"></i>
                                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">Avoid</h4>
                            </div>
                            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-2">
                                <li>• Blurry or low-quality images</li>
                                <li>• Inappropriate backgrounds</li>
                                <li>• Overly large file sizes</li>
                                <li>• Inconsistent lighting</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-6 rounded-lg">
                            <div className="flex items-center mb-3">
                                <i className="fas fa-tools text-blue-600 dark:text-blue-400 text-xl mr-3"></i>
                                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Tools</h4>
                            </div>
                            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                                <li>• TinyPNG for compression</li>
                                <li>• Canva for editing</li>
                                <li>• Figma for design</li>
                                <li>• Photoshop alternatives</li>
                            </ul>
                        </div>
                    </div>

                    {/* Code Snippet */}
                    <div className="bg-gray-900 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-white font-semibold flex items-center">
                                <i className="fas fa-code mr-3"></i>
                                Enable Images (Uncomment this code in Gallery section)
                            </h4>
                            <button 
                                onClick={() => navigator.clipboard.writeText('/* <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" onError={(e) => { e.target.style.display = \'none\'; }} /> */')}
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                title="Copy to clipboard"
                            >
                                <i className="fas fa-copy"></i>
                            </button>
                        </div>
                        <pre className="text-green-400 text-sm overflow-x-auto">
{`<img 
    src={image.src} 
    alt={image.alt}
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
    onError={(e) => {
        e.target.style.display = 'none';
    }}
/>`}
                        </pre>
                        <p className="text-gray-400 text-xs mt-2">
                            Uncomment this code in the Gallery section (around line 1130) once you've added your images
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Gallery/Images Section Component
const GallerySection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageCategory, setImageCategory] = useState('All');

    const galleryImages = [
        {
            id: 1,
            src: './assets/images/Aditya.png',
            alt: 'Aditya Bhagat - Professional Photo',
            title: 'Professional Portrait',
            category: 'Profile',
            description: 'Professional headshot for portfolio'
        },
        {
            id: 2,
            src: './assets/images/collegelife.jpg',
            alt: 'College Life at Chandigarh Engineering College',
            title: 'College Life',
            category: 'Education',
            description: 'Campus life at Chandigarh Engineering College'
        },
        {
            id: 3,
            src: './assets/images/coding-workspace.jpg',
            alt: 'Coding Workspace',
            title: 'My Coding Setup',
            category: 'Workspace',
            description: 'Where the magic happens - my development environment'
        },
        {
            id: 4,
            src: './assets/images/project-presentation.jpg',
            alt: 'Project Presentation',
            title: 'Project Demo',
            category: 'Projects',
            description: 'Presenting my ReactJS training project'
        },
        {
            id: 5,
            src: './assets/images/college.png',
            alt: 'Technical Quiz Competition',
            title: 'Competition Achievement',
            category: 'Achievements',
            description: '2nd position in technical quiz competition'
        },
        {
            id: 6,
            src: './assets/images/cultural.jpg',
            alt: 'Cultural Event Performance',
            title: 'Cultural Activities',
            category: 'Cultural',
            description: 'Participating in college cultural events'
        },
        {
            id: 7,
            src: './assets/images/team-work.jpg',
            alt: 'Team Collaboration',
            title: 'Team Projects',
            category: 'Projects',
            description: 'Working with teammates on group projects'
        },
        {
            id: 8,
            src: './assets/images/certification.jpg',
            alt: 'Receiving Certification',
            title: 'Course Completion',
            category: 'Achievements',
            description: 'Completing Database certification course'
        }
    ];

    const categories = ['All', 'Profile', 'Education', 'Projects', 'Achievements', 'Cultural', 'Workspace'];

    const filteredImages = imageCategory === 'All' 
        ? galleryImages 
        : galleryImages.filter(image => image.category === imageCategory);

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <section id="gallery" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">
                        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                            Gallery
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400" data-aos="fade-up" data-aos-delay="200">
                        A visual journey through my academic and professional life
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex justify-center mb-12" data-aos="fade-up">
                    <div className="flex flex-wrap gap-2 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setImageCategory(category)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                                    imageCategory === category
                                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredImages.map((image, index) => (
                        <div
                            key={image.id}
                            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            onClick={() => openModal(image)}
                        >
                            {/* Image Container */}
                            <div className="relative h-64 bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                                {/* Actual image display */}
                                <img 
                                    src={image.src} 
                                    alt={image.alt}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    onError={(e) => {
                                        // Fallback to placeholder if image fails to load
                                        e.target.parentElement.innerHTML = `
                                            <div class="absolute inset-0 flex items-center justify-center">
                                                <i class="fas fa-image text-4xl text-white opacity-50"></i>
                                            </div>
                                        `;
                                    }}
                                />
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="text-center text-white p-4">
                                        <i className="fas fa-expand-alt text-2xl mb-2"></i>
                                        <p className="text-sm font-medium">Click to view</p>
                                    </div>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="px-2 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-semibold rounded-full">
                                        {image.category}
                                    </span>
                                </div>
                            </div>

                            {/* Image Info */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {image.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {image.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Instructions for adding images */}
                <div className="mt-16 text-center" data-aos="fade-up">
                    <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                        <i className="fas fa-info-circle text-blue-500 text-2xl mb-3"></i>
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                            How to Add Your Images
                        </h3>
                        <div className="text-blue-800 dark:text-blue-200 text-sm space-y-2">
                            <p>1. Add your images to the <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">assets/images/</code> folder</p>
                            <p>2. Use the exact filenames shown above (e.g., profile-main.jpg, college-life.jpg)</p>
                            <p>3. Uncomment the img tag in the code to display actual images</p>
                            <p>4. Recommended image size: 400x300px for best display</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for enlarged image view */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors duration-200 z-10"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
                            {/* Modal Image */}
                            <div className="relative h-96 bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                                <img 
                                    src={selectedImage.src} 
                                    alt={selectedImage.alt}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback to placeholder if image fails to load
                                        e.target.parentElement.innerHTML = `
                                            <div class="absolute inset-0 flex items-center justify-center">
                                                <i class="fas fa-image text-6xl text-white opacity-50"></i>
                                            </div>
                                        `;
                                    }}
                                />
                            </div>
                            
                            {/* Modal Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {selectedImage.title}
                                    </h3>
                                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-semibold rounded-full">
                                        {selectedImage.category}
                                    </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {selectedImage.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

// Contact Section Component
const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        alert('Thank you for your message! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">
                        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                            Get In Touch
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400" data-aos="fade-up" data-aos-delay="200">
                        Let's discuss your next project or collaboration
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div data-aos="fade-right">
                        <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                            Let's Connect
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
                                    <i className="fas fa-envelope text-white"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                                    <p className="text-gray-600 dark:text-gray-400">adityakumar4092@gmail.com</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
                                    <i className="fab fa-linkedin text-white"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">LinkedIn</h4>
                                    <p className="text-gray-600 dark:text-gray-400">linkedin.com/in/adityabhagat22</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
                                    <i className="fas fa-map-marker-alt text-white"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Location</h4>
                                    <p className="text-gray-600 dark:text-gray-400">Darbhanga, Bihar</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h4>
                            <div className="flex space-x-4">
                                <a href="https://www.linkedin.com/in/adityabhagat22/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="https://github.com/adityabhagat" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 text-white rounded-lg flex items-center justify-center hover:bg-gray-900 transition-colors duration-200">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="mailto:adityakumar4092@gmail.com" className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors duration-200">
                                    <i className="fas fa-envelope"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div data-aos="fade-left">
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                                    placeholder="Project Discussion"
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                                    placeholder="Tell me about your project or idea..."
                                ></textarea>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                            >
                                <i className="fas fa-paper-plane mr-2"></i>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                                Aditya Bhagat
                            </span>
                        </h3>
                        <p className="text-gray-400 mb-4">
                            B.Tech IT Student & Aspiring Developer passionate about creating innovative solutions.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/in/adityabhagat22/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                <i className="fab fa-linkedin text-xl"></i>
                            </a>
                            <a href="https://github.com/adityabhagat" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                <i className="fab fa-github text-xl"></i>
                            </a>
                            <a href="mailto:adityakumar4092@gmail.com" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                <i className="fas fa-envelope text-xl"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {['Home', 'About', 'Skills', 'Projects', 'Education', 'Achievements', 'Contact'].map((item) => (
                                <li key={item}>
                                    <button
                                        onClick={() => document.querySelector(`#${item.toLowerCase()}`).scrollIntoView({ behavior: 'smooth' })}
                                        className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <div className="space-y-2 text-gray-400">
                            <p>
                                <i className="fas fa-envelope mr-2"></i>
                                adityakumar4092@gmail.com
                            </p>
                            <p>
                                <i className="fas fa-map-marker-alt mr-2"></i>
                                Darbhanga, Bihar
                            </p>
                            <p>
                                <i className="fas fa-graduation-cap mr-2"></i>
                                Chandigarh Engineering College
                            </p>
                            <p>
                                <i className="fas fa-calendar mr-2"></i>
                                B.Tech IT 2022-2026
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © 2024 Aditya Bhagat. All rights reserved. Built with ❤️ using React & Tailwind CSS.
                    </p>
                </div>
            </div>
        </footer>
    );
};

// Main App Component
const App = () => {
    useEffect(() => {
        // Initialize AOS animations
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }, []);

    return (
        <ThemeProvider>
            <div className="min-h-screen">
                <Navigation />
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <EducationSection />
                <AchievementsSection />
                <GallerySection />
                <ContactSection />
                <Footer />
                
                {/* Image Management Floating Button */}
                <ImageManagementSection />
            </div>
        </ThemeProvider>
    );
};

// Render the App
ReactDOM.render(<App />, document.getElementById('root'));
