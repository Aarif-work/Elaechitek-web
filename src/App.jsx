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
    <nav className={`fixed z-50 transition-all duration-300 ${scrolled ? 'glass' : 'py-5'}`}>
      <div className="container px-5 flex justify-between items-center">
        <a href="#" className="flex items-center gap-4 logo-wrap group">
          <div style={{ width: '45px', height: '45px', border: '2px solid white', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)' }}>
            <span style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 800, lineHeight: 1 }}>EL</span>
            <span style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 800, lineHeight: 1 }}>AR</span>
          </div>
          <span className="font-title text-xl tracking-widest hidden lg:block">ELARCHITEK</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Company', 'Kits', 'Innovation', 'Services', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-accent tracking-widest uppercase transition-colors">
              {item}
            </a>
          ))}
          <div className="search-bar">
            <Search size={16} color="white" />
            <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Search</span>
          </div>
        </div>

        <div className="md:hidden">
          <Menu size={24} color="white" cursor="pointer" />
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const linkImageRef = useRef(null);
  const linkTextRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Match user JS logic
        if (linkTextRef.current) {
          linkTextRef.current.style.setProperty('--x', `${x}px`);
          linkTextRef.current.style.setProperty('--y', `${y}px`);
        }
        if (linkImageRef.current) {
          linkImageRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" style={{ overflow: 'visible' }}>
      <div className="container px-5">
        <div style={{ maxWidth: '100%' }}>

          <div className="hero-reveal-container" ref={containerRef}>
            {/* Base Link Text */}
            <a href="#" className="link-base">
              ELARCHITEK
            </a>

            {/* Reveal Content Group */}
            <div className="hover-container">
              {/* White Reveal Text (Clipped) */}
              <div ref={linkTextRef} className="link-text">
                ELARCHITEK
              </div>

              {/* Image Portal (Follows mouse via translate3d) */}
              <div className="image-container">
                <div className="image-inner">
                  <img
                    ref={linkImageRef}
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600"
                    alt="Hero Reveal - Macro Electronics"
                    className="link-image"
                  />
                </div>
              </div>
            </div>
          </div>

          <h2 className="hero-subtitle">
            <LineReveal>Engineering the future.</LineReveal>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '40px' }} className="reveal">
            An electronics education startup bridging the gap between textbook theory and hands-on discovery for everyone, based in Chennai.
          </p>
          <div className="reveal">
            <button className="btn">
              Explore Kits
              <ArrowUpRight size={18} style={{ marginLeft: '10px' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

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
          {["Arshitha Rajkumar", "Pushap Raj"].map((name, i) => (
            <div key={i} className="glass" style={{ padding: '25px', borderRadius: '15px' }}>
              <h4 style={{ fontSize: '1.2rem' }}>{name}</h4>
              <p style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>Co-Founder</p>
            </div>
          ))}
        </div>
      </div>
      <ParallaxImage src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600" alt="Tech Infrastructure" />
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
      <ParallaxImage src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1600" alt="Electronic Components" />
    </div>
  </section>
);

const InnovationHub = () => (
  <section id="innovation">
    <div className="container">
      <div className="mb-20 text-center">
        <span className="section-tag">Engineering Excellence</span>
        <h2 style={{ fontSize: '4rem' }}><LineReveal>Electronic Architecture</LineReveal></h2>
      </div>

      <div className="cards-container">
        {[
          {
            title: "System Blueprint",
            content: "Architecting the foundational logic for complex electronic ecosystems, from power distribution to data pathways.",
            image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
          },
          {
            title: "Signal Purity",
            content: "Precision PCB routing and signal integrity analysis to ensure noise-free communication across high-speed boards.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
          },
          {
            title: "Firmware Core",
            content: "Developing low-latency, real-time operating environments optimized for mission-critical hardware responsiveness.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
          },
          {
            title: "Prototype Forge",
            content: "Accelerating the journey from conceptual sketches to industrial-grade prototypes through rapid iterative hardware design.",
            image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800"
          },
          {
            title: "Edge Logic",
            content: "Deploying sophisticated algorithms and machine learning models directly onto silicon for intelligent, autonomous systems.",
            image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800"
          },
          {
            title: "Hardware Security",
            content: "Implementing silicon-level protection, secure boot protocols, and dedicated encryption modules for robust IP safety.",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
          }
        ].map((item, i) => (
          <TiltCard key={i} {...item} />
        ))}
      </div>
    </div>
  </section>
);

const Outreach = () => {
  const leftColRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the image for exactly as long as the left column is scrolling
      ScrollTrigger.create({
        trigger: leftColRef.current,
        start: 'top top+=100',
        end: 'bottom bottom',
        pin: imageRef.current,
        pinSpacing: false,
        anticipatePin: 1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="outreach"
      style={{ background: '#0a0f1d', display: 'block', padding: '15vh 5%' }}
    >
      <div className="container px-5">
        <div className="sticky-container">

          {/* LEFT: scrolling content */}
          <div ref={leftColRef} className="sticky-content">
            <div className="reveal" style={{ marginBottom: '120px' }}>
              <span className="section-tag">Social Impact</span>
              <h2 style={{ fontSize: '4rem', marginBottom: '30px' }}>
                <LineReveal>Educational Outreach</LineReveal>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.8' }}>
                Introducing robotics and electronics to government schools. Inspiring young learners with projects like Light Following Robots.
              </p>
            </div>

            <div className="reveal" style={{ marginBottom: '120px' }}>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Bridging the Gap</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.8' }}>
                Our mission is to ensure that quality electronics education is not limited by resources. We bring the lab to the classroom, traveling to remote areas to provide hands-on experience with real components.
              </p>
            </div>

            <div className="reveal" style={{ marginBottom: '120px' }}>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Community Projects</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.8' }}>
                From basic LED circuits to complex robotics, we empower the next generation of engineers to build, fail, and learn. Our students have gone on to win regional science fairs and spark new interest in STEM careers.
              </p>
            </div>

            <div className="reveal">
              <h3 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Future Vision</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.8' }}>
                We aim to reach 10,000 students by 2026, establishing permanent innovation hubs in rural districts across India.
              </p>
            </div>
          </div>

          {/* RIGHT: image pinned by ScrollTrigger */}
          <div className="sticky-side">
            <div ref={imageRef} className="sticky-media-wrap">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200"
                alt="STEM Education Workshop"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

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

const Footer = () => {
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            scrub: 0.5,
            pin: true,
            start: 'top top',
            end: '+=150%',
          },
        })
        .to('.blinds-box', {
          force3D: true,
          duration: 1,
          xPercent: 100,
          ease: 'power1.inOut',
          stagger: { amount: 1 },
        })
        .to('.blinds-box', { ease: 'power1.out', duration: 1, rotation: '45deg' }, 0)
        .to('.blinds-box', { ease: 'power1.in', duration: 1, rotation: '0deg' }, 1);
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Staggered Blinds Reveal */}
      <div ref={triggerRef} className="blinds-trigger">
        {/* Boxes first so labels naturally stack on top or use explicit z-index */}
        <div className="blinds-wrapper">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="blinds-box" />
          ))}
        </div>
        <span className="blinds-label blinds-down">Architecting<br />Tomorrow</span>
        <span className="blinds-label blinds-up">Back to<br />The Logic</span>
      </div>

      {/* Actual Footer */}
      <footer style={{ padding: '100px 5%', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'var(--bg)' }}>
        <div className="container flex flex-col items-center text-center">
          <div style={{ width: '70px', height: '70px', border: '2px solid white', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 800, lineHeight: 1 }}>EL</span>
            <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 800, lineHeight: 1 }}>AR</span>
          </div>
          <h2 style={{ fontSize: '3rem', marginBottom: '20px', fontFamily: 'var(--font-title)' }}>ELARCHITEK</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', marginBottom: '40px', lineHeight: 1.8, fontSize: '1.1rem' }}>
            Bridging the gap between theory and discovery. We are a Chennai-based collective of engineers and educators dedicated to redefining STEM education through hands-on architectural electronics and industrial-grade prototyping kits.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px', marginBottom: '60px', textAlign: 'left', width: '100%', maxWidth: '900px' }}>
            <div>
              <h4 style={{ color: 'var(--accent)', marginBottom: '15px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Visions</h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Empowering the next generation of silicon architects through practical, hands-on discovery.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--accent)', marginBottom: '15px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Locations</h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Headquartered in Chennai, India.<br />Serving educational hubs nationwide.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--accent)', marginBottom: '15px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Connect</h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>hello@elarchitek.com<br />+91 (0) 44 2837 4920</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '30px', marginBottom: '40px' }}>
            <Linkedin color="white" style={{ cursor: 'pointer' }} />
            <Instagram color="white" style={{ cursor: 'pointer' }} />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>&copy; 2024 ELARCHITEK Chennai. Pioneering Electronic Architecture.</p>
        </div>
      </footer>
    </>
  );
};

const App = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Official Lenis + GSAP ScrollTrigger integration
    // gsap.ticker drives both Lenis and ScrollTrigger from the same clock
    lenis.on('scroll', () => {
      ScrollTrigger.update();
      // Update scroll progress bar
      const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
    });
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

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
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="app">
      <div className="scroll-progress-wrap">
        <div className="scroll-progress-bar"></div>
      </div>
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
