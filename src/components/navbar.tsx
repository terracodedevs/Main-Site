import React, { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import ContactForm from "./contactus/Contact";
import { Link} from 'react-router-dom';
import '../App.css';
import { X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Scroll and active section effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      
      // Navbar visibility logic
      if (window.innerWidth >= 200) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }

      // Active section determination
      const sections = ['hero', 'services', 'about', 'work', 'projects', 'qa'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to determine nav link classes
  const getNavLinkClass = (sectionName: string) => {
    return `
      nav-link 
      ${activeSection === sectionName 
        ? 'text-orange-600 font-bold' 
        : 'text-gray-600 hover:text-black hover:font-semibold'}
    `;
  };


  // Rest of your existing methods (toggleMenu, closeMenu, etc.)
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav 
      className={`
        z-10 flex items-center justify-between px-5 py-5 lg:px-20 
        fixed top-0 left-0 right-0 
        transition-transform duration-3 00 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        bg-whit
      `}
      style={{
        zIndex: 1000,
      }}
    >
      {/* Logo - rest remains the same */}
      <div className="flex flex-col -space-y-2 text-xl font-bold md:text-2xl">
        <span className="text-black">TERRA</span>
        <span className="bg-gradient-to-r from-[#EF3D00] to-[#FDA40A] bg-clip-text text-transparent">CODE.</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden px-8 py-4 space-x-6 backdrop-blur-sm bg-gray-100/70 rounded-xl md:flex">
        <Link 
          to="/" 
          className={getNavLinkClass('hero')}
          onClick={() => setActiveSection('hero')}
        >
          Home
        </Link>
        <ScrollLink 
          to="services" 
          smooth={true} 
          duration={500} 
          className={getNavLinkClass('services')}
          onClick={() => setActiveSection('services')}
        >
          Services
        </ScrollLink>
        <ScrollLink 
          to="about" 
          smooth={true} 
          duration={500} 
          className={getNavLinkClass('about')}
          onClick={() => setActiveSection('about')}
        >
          About
        </ScrollLink>
        <Link 
          to="digitalportfolio"   
          className={getNavLinkClass('digitalportfolio')}
          onClick={() => setActiveSection('digitalportfolio')}
        >
          Work
        </Link>
        <ScrollLink 
          to="projects" 
          smooth={true} 
          duration={500} 
          className={getNavLinkClass('projects')}
          onClick={() => setActiveSection('projects')}
        >
          Tech Stack
        </ScrollLink>
        <ScrollLink 
          to="qa" 
          smooth={true} 
          duration={500} 
          className={getNavLinkClass('qa')}
          onClick={() => setActiveSection('qa')}
        >
          FAQs
        </ScrollLink>
      </div>

      {/* Contact Us Button */}
      <div className="hidden md:flex">
        <button
          className="relative py-2 mt-4 font-medium rounded-full px-7 group overflow-hidden
            text-orange-500 bg-black hover:bg-transparent
            before:absolute before:inset-0
            before:bg-gradient-to-r before:from-[#EF3D00] before:to-[#FDA40A]
            before:opacity-0 before:transition-opacity before:duration-300
            hover:before:opacity-100
            hover:shadow-lg hover:shadow-[#EF3D00]/50
            transition-all duration-300
            hover:scale-110 active:scale-95
            items-center"
          onClick={() => setIsContactFormOpen(true)}
        >
          <span className="relative z-10 inter transition-colors duration-300 group-hover:text-white">
            Talk with Us
          </span>
        </button>
      </div>
      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />

      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} className="md:hidden">
        {menuOpen ? <X /> : <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl">
          <span className="bg-gradient-to-r from-[#EF3D00] to-[#FDA40A] bg-clip-text text-transparent font-bold">Home</span>
          <img src='dot.png' />
        </div>}
      </button>

      {/* Mobile Dropdown Menu */}
      <div
        ref={mobileMenuRef}
        className={`
          fixed left-0 z-[150] flex flex-col items-center w-full h-[500px] p-5 space-y-4 bg-white top-20 md:hidden
          transform transition-all duration-500 ease-in-out
          ${menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}
        `}
        style={{
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <Link
          to="/"
          className={`cursor-pointer transition-all duration-300 ${activeSection === 'hero' ? 'active-nav-link' : ''}`}
          onClick={closeMenu}
        >
          Home
        </Link>
        <ScrollLink
          to="services"
          smooth={true}
          duration={500}
          className={`cursor-pointer transition-all duration-300 ${activeSection === 'services' ? 'active-nav-link' : ''}`}
          onClick={closeMenu}
        >
          Services
        </ScrollLink>
        <ScrollLink
          to="about"
          smooth={true}
          duration={500}
          className={`cursor-pointer transition-all duration-300 ${activeSection === 'about' ? 'active-nav-link' : ''}`}
          onClick={closeMenu}
        >
          About
        </ScrollLink>
        <Link
          to="digitalportfolio"
          className={`cursor-pointer transition-all duration-300 ${activeSection === 'work' ? 'active-nav-link' : ''}`}
          onClick={closeMenu}
        >
          Work
        </Link>
        <ScrollLink
          to="projects"
          smooth={true}
          duration={500}
          className={`cursor-pointer transition-all duration-300 ${activeSection === 'projects' ? 'active-nav-link' : ''}`}
          onClick={closeMenu}
        >
          Tech Stack
        </ScrollLink>
        <ScrollLink
          to="qa"
          smooth={true}
          duration={500}
          className={`cursor-pointer transition-all duration-300 ${activeSection === 'qa' ? 'active-nav-link' : ''}`}
          onClick={closeMenu}
        >
          FAQs
        </ScrollLink>
        <button
          onClick={() => {
            setIsContactFormOpen(true);
            closeMenu();
          }}
          className="px-4 py-2 text-white bg-gradient-to-r from-[#EF3D00] to-[#FDA40A] cursor-pointer rounded-3xl hover:text-gray-950 z-20 transition-all duration-300"
        >
          Talk with Us
        </button>
      </div>
    </nav>
  );
};

export default Navbar;