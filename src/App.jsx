import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Menu, Search, ArrowUpRight, Cpu,
  Linkedin, Instagram, Code,
  Microchip, Layers, Monitor, Binary, Users,
  Zap, Database, ShieldCheck, Globe
} from 'lucide-react';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const LineReveal = ({ children }) => (
  <span className="line-mask">
    <span className="line-inner">{children}</span>
  </span>
);

const ParallaxImage = ({ src, alt, height = "60vh" }) => {
  const imgRef = useRef(null);
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, {
        y: "-15%"
      }, {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          scrub: true,
          start: "top bottom",
          end: "bottom top"
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="parallax-wrap" style={{ height }}>
      <img ref={imgRef} src={src} alt={alt} className="parallax-img" />
    </div>
  );
};

const TiltCard = ({ title, content, image }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const mousePX = mouseX / width;
    const mousePY = mouseY / height;

    setRotation({
      x: mousePY * -30,
      y: mousePX * 30
    });

    setBgPos({
      x: mousePX * -40,
      y: mousePY * -40
    });
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setRotation({ x: 0, y: 0 });
      setBgPos({ x: 0, y: 0 });
    }, 100);
  };

  return (
    <div
      className="card-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div
        className="tilt-card"
        style={{ transform: `rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)` }}
      >
        <div
          className="card-bg"
          style={{
            backgroundImage: `url(${image})`,
            transform: `translateX(${bgPos.x}px) translateY(${bgPos.y}px)`
          }}
        ></div>
        <div className="card-info">
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'py-8'}`} style={{ top: 0, left: 0 }}>
      <div className="container px-5 flex justify-between items-center">
        <a href="#" className="flex items-center gap-4">
          <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.5rem', color: '#000', fontWeight: 800, lineHeight: 1 }}>YOUR</span>
            <span style={{ fontSize: '0.5rem', color: '#000', fontWeight: 800, lineHeight: 1 }}>LOGO</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Company', 'Kits', 'Innovation', 'Services', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-accent tracking-widest uppercase transition-colors">
              {item}
            </a>
          ))}
          <div style={{ height: '36px', width: '140px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', padding: '0 15px', cursor: 'pointer' }}>
            <Search size={16} color="white" style={{ marginRight: '10px' }} />
            <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Search</span>
          </div>
        </div>

        <div className="md:hidden">
          <Menu size={24} color="white" />
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section id="home">
    <div className="container">
      <div style={{ maxWidth: '900px' }}>
        <h1 className="hero-title">
          <LineReveal>ELARCHITEK</LineReveal>
        </h1>
        <h2 className="hero-subtitle">
          <LineReveal>Engineering the future.</LineReveal>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '40px' }} className="reveal">
          An electronics education startup bridging the gap between textbook theory and hands-on discovery for everyone, based in Chennai.
        </p>
        <div className="reveal">
          <button className="btn">See more</button>
        </div>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="company">
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
        <div className="reveal">
          <span className="section-tag">Founded 2024</span>
          <h2 style={{ fontSize: '4rem', marginBottom: '30px' }}><LineReveal>Visionary</LineReveal> <LineReveal>Team</LineReveal></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.8' }}>
            Based in Chennai, our mission is to make electronics simple, practical, and accessible through hands-on discovery.
          </p>
        </div>
        <div className="reveal" style={{ display: 'grid', gap: '15px' }}>
          {["Gokul Kittusamy", "Arshitha Rajkumar", "Pushap Raj"].map((name, i) => (
            <div key={i} className="glass" style={{ padding: '25px', borderRadius: '15px' }}>
              <h4 style={{ fontSize: '1.2rem' }}>{name}</h4>
              <p style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>Co-Founder</p>
            </div>
          ))}
        </div>
      </div>
      <ParallaxImage src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600" alt="Tech" />
    </div>
  </section>
);

const Kits = () => (
  <section id="kits" style={{ background: '#0a0f1d' }}>
    <div className="container">
      <div className="mb-20">
        <span className="section-tag">Discovery Kits</span>
        <h2 style={{ fontSize: '4rem' }}><LineReveal>STEM Products</LineReveal></h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
        {[
          { title: "ELARCHICOM", txt: "DIY Computer building series exploring logic gates and memory.", icon: Binary },
          { title: "ELARCHIPHY", txt: "Foundational kit-1.0 for circuit experimentation.", icon: Microchip },
          { title: "CUSTOM STEM", txt: "Tailored electronics kits for specific student needs.", icon: Layers }
        ].map((kit, i) => (
          <div key={i} className="glass reveal" style={{ padding: '50px', borderRadius: '30px' }}>
            <kit.icon size={48} color="var(--accent)" style={{ marginBottom: '30px' }} />
            <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>{kit.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>{kit.txt}</p>
            <div className="slide-link">
              <div className="slide-link__circ"></div>
              <div className="slide-link__line"></div>
            </div>
          </div>
        ))}
      </div>
      <ParallaxImage src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1600" alt="Electronics" />
    </div>
  </section>
);

const InnovationHub = () => (
  <section id="innovation">
    <div className="container">
      <div className="mb-20 text-center">
        <span className="section-tag">Research & Development</span>
        <h2 style={{ fontSize: '4rem' }}><LineReveal>Innovation Hub</LineReveal></h2>
      </div>

      <div className="cards-container">
        {[
          {
            title: "DevOps",
            content: "Streamlining electronic hardware production and firmware deployment pipelines for rapid iterative development.",
            image: "https://cdn.pixabay.com/photo/2018/05/27/15/28/technology-3433708_960_720.jpg"
          },
          {
            title: "Embedded ML",
            content: "Integrating machine learning models directly into microcontrollers for intelligent sensor-based edge computing.",
            image: "https://cdn.pixabay.com/photo/2019/11/23/04/52/matrix-4646234_960_720.jpg"
          },
          {
            title: "IoT Analytics",
            content: "Collecting and analyzing real-time data from distributed sensor networks to provide actionable hardware insights.",
            image: "https://cdn.pixabay.com/photo/2013/11/20/09/35/background-213649_960_720.jpg"
          },
          {
            title: "Hardware Crypto",
            content: "Securing industrial communication through dedicated hardware encryption modules and silicon-level security.",
            image: "https://cdn.pixabay.com/photo/2018/02/04/17/39/crypto-currency-3130381_960_720.jpg"
          },
          {
            title: "Full-Stack HW",
            content: "End-to-end development from custom PCB designs and firmware to cloud-connected management dashboards.",
            image: "https://cdn.pixabay.com/photo/2016/04/13/19/20/binary-1327493_960_720.jpg"
          },
          {
            title: "Cyber Security",
            content: "Protecting embedded systems against physical and remote vulnerabilities through rigorous precision testing.",
            image: "https://cdn.pixabay.com/photo/2019/12/17/05/53/security-4700815_960_720.jpg"
          }
        ].map((item, i) => (
          <TiltCard key={i} {...item} />
        ))}
      </div>
    </div>
  </section>
);

const Outreach = () => (
  <section id="outreach" style={{ background: '#0a0f1d' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '100px', alignItems: 'center' }}>
        <div className="reveal">
          <span className="section-tag">Social Impact</span>
          <h2 style={{ fontSize: '4rem', marginBottom: '30px' }}><LineReveal>Educational Outreach</LineReveal></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.8' }}>
            Introducing robotics and electronics to government schools. Inspiring young learners with projects like Light Following Robots.
          </p>
        </div>
        <div className="reveal">
          <ParallaxImage src="/assets/image.png" alt="Outreach" height="80vh" />
        </div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="services">
    <div className="container">
      <div className="mb-20">
        <span className="section-tag">Expertise</span>
        <h2 style={{ fontSize: '4rem' }}><LineReveal>Hardware Services</LineReveal></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        {[
          { title: "Silicon Sunday", txt: "Weekly hardware insights and design tutorials.", icon: Monitor },
          { title: "Precision Testing", txt: "High-quality circuitry for reliable kit components.", icon: Code },
          { title: "Custom R&D", txt: "Tailored electronics engineering services.", icon: Cpu }
        ].map((s, i) => (
          <div key={i} className="glass reveal" style={{ padding: '50px', borderRadius: '30px' }}>
            <s.icon size={40} color="var(--accent)" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{s.title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{s.txt}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ padding: '100px 5%', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
    <div className="container flex flex-col items-center text-center">
      <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
        <span style={{ fontSize: '0.6rem', color: '#000', fontWeight: 800 }}>LOGO</span>
      </div>
      <div style={{ display: 'flex', gap: '30px', marginBottom: '40px' }}>
        <Linkedin color="white" />
        <Instagram color="white" />
      </div>
      <p style={{ color: 'var(--text-muted)' }}>&copy; 2024 ELARCHITEK Chennai. All Rights Reserved.</p>
    </div>
  </footer>
);

const App = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      // Line reveal animation
      gsap.utils.toArray('.line-inner').forEach((el) => {
        gsap.from(el, {
          y: "110%",
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
          }
        });
      });

      // Regular section reveal
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          }
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="app">
      <Navbar />
      <Hero />
      <About />
      <Kits />
      <InnovationHub />
      <Outreach />
      <Services />
      <Footer />
    </div>
  );
};

export default App;
