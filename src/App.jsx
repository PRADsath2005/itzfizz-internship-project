import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import carImage from "./assets/car.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "Digital Experiences",
    category: "Web Design / Development",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=85",
  },
  {
    number: "02",
    title: "Creative Direction",
    category: "Branding / Strategy",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&q=85",
  },
  {
    number: "03",
    title: "Modern Interfaces",
    category: "UI / UX Design",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1000&q=85",
  },
  {
    number: "04",
    title: "Digital Products",
    category: "Product / Development",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&q=85",
  },
];

function App() {
  const pageRef = useRef(null);
  const carRef = useRef(null);
  const carStageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // HERO TEXT ANIMATION
      gsap.from(".hero-eyebrow", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-description, .hero-button", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.6,
      });

      // CAR ENTRANCE ANIMATION
      gsap.fromTo(
        carStageRef.current,
        {
          x: 180,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
          delay: 0.4,
        }
      );

      // CAR SCROLL ANIMATION
      gsap.to(carRef.current, {
        x: -100,
        y: 20,
        scale: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // STATISTICS COUNT-UP ANIMATION
      gsap.utils.toArray(".stat-number").forEach((number) => {
        const target = Number(number.dataset.target);

        gsap.fromTo(
          number,
          {
            innerText: 0,
          },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: {
              innerText: 1,
            },
            scrollTrigger: {
              trigger: number,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // SECTION HEADING REVEAL
      gsap.utils.toArray(".section-heading").forEach((heading) => {
        gsap.from(heading, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // STATISTICS CARD REVEAL
      gsap.fromTo(
        ".stat-card",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // PROJECT CARD REVEAL
      gsap.utils.toArray(".work-card").forEach((card, index) => {
        const cardReveal = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: (index % 2) * 0.12,
        });

        cardReveal.from(card, {
          y: 80,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });

        // Reveal the project title and category after the card appears
        cardReveal.from(
          card.querySelector(".work-info"),
          {
            y: 20,
            opacity: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.35"
        );
      });

      // SERVICE ROW REVEAL
      gsap.utils.toArray(".service-row").forEach((row) => {
        gsap.from(row, {
          y: 35,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // ABOUT SECTION REVEAL
      // The heading already uses the shared SECTION HEADING REVEAL above.
      gsap.from(".about .section-top > *", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-bottom > *", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-bottom",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // CONTACT SECTION REVEAL
      gsap.from(".contact-content h2", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-button", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef}>
      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="logo">
          ITZFIZZ<span>.</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#work">Our Work</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="talk-button">
          Let's Talk <span>↗</span>
        </a>
      </header>

      {/* HERO */}
      <section
        className="hero relative w-full overflow-hidden"
        id="home"
      >
        <div className="hero-glow absolute"></div>

        <div className="hero-content relative z-10">
          <p className="hero-eyebrow text-sm font-bold tracking-[0.4em] text-[#80ff00]">
            CREATIVE DIGITAL AGENCY
          </p>

          <h1 className="hero-title font-extrabold">
            <span>WELCOME</span>
            <span className="green-text">ITZFIZZ</span>
          </h1>

          <p className="hero-description max-w-lg text-base leading-relaxed text-gray-400">
            We create innovative digital experiences that help
            businesses grow, connect, and stand out.
          </p>

          <a
            href="#work"
            className="hero-button inline-flex items-center gap-2"
          >
            Explore Our Work <span>↗</span>
          </a>
        </div>

        <div
          className="car-stage absolute"
          ref={carStageRef}
        >
          <img
            ref={carRef}
            src={carImage}
            alt="Black sports car"
            className="hero-car"
          />
        </div>

        <div className="scroll-indicator absolute">
          <span>SCROLL TO EXPLORE</span>

          <div className="scroll-line">
            <div className="scroll-line-progress"></div>
          </div>

          <span className="slide-number">01 / 05</span>
        </div>
      </section>

      {/* STATISTICS */}
      <section
        id="stats"
        className="mx-auto w-[calc(100%-32px)] max-w-[1240px] overflow-hidden bg-[#0b0b0d] px-[22px] py-[85px] text-white sm:w-[calc(100%-40px)] sm:px-[35px] md:py-[120px] lg:px-[70px]"
      >
        <div className="mx-auto w-full max-w-none">
          {/* STATISTICS HEADING */}
          <div className="mb-12 w-full md:mb-16">
            <p className="section-label">OUR IMPACT</p>

            <h2 className="section-heading mt-4 !text-[clamp(36px,5vw,65px)] !tracking-[-2px]">
              Numbers that{" "}
              <span className="green-text">matter.</span>
            </h2>
          </div>

          {/* STATISTICS CARDS */}
          <div className="stats-grid grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="stat-card min-w-0 rounded-2xl border border-[#292929] bg-[#111113] p-6 transition-transform duration-300 hover:-translate-y-2 hover:border-[#80ff00] md:p-8">
              <h3 className="mb-3 text-4xl font-extrabold text-[#80ff00] md:text-5xl">
                <span className="stat-number" data-target="95">
                  0
                </span>
                %
              </h3>

              <p className="text-sm text-[#b5b5b5] md:text-base">
                Client Satisfaction
              </p>
            </div>

            <div className="stat-card min-w-0 rounded-2xl border border-[#292929] bg-[#111113] p-6 transition-transform duration-300 hover:-translate-y-2 hover:border-[#80ff00] md:p-8">
              <h3 className="mb-3 text-4xl font-extrabold text-[#80ff00] md:text-5xl">
                <span className="stat-number" data-target="120">
                  0
                </span>
                +
              </h3>

              <p className="text-sm text-[#b5b5b5] md:text-base">
                Projects Completed
              </p>
            </div>

            <div className="stat-card min-w-0 rounded-2xl border border-[#292929] bg-[#111113] p-6 transition-transform duration-300 hover:-translate-y-2 hover:border-[#80ff00] md:p-8">
              <h3 className="mb-3 text-4xl font-extrabold text-[#80ff00] md:text-5xl">
                <span className="stat-number" data-target="10">
                  0
                </span>
                +
              </h3>

              <p className="text-sm text-[#b5b5b5] md:text-base">
                Years of Experience
              </p>
            </div>

            <div className="stat-card min-w-0 rounded-2xl border border-[#292929] bg-[#111113] p-6 transition-transform duration-300 hover:-translate-y-2 hover:border-[#80ff00] md:p-8">
              <h3 className="mb-3 text-4xl font-extrabold text-[#80ff00] md:text-5xl">
                <span className="stat-number" data-target="25">
                  0
                </span>
                +
              </h3>

              <p className="text-sm text-[#b5b5b5] md:text-base">
                Creative Experts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about section" id="about">
        <div className="section-top">
          <p className="section-label">01 — ABOUT US</p>

          <p className="section-side-text">
            We build brands and digital experiences.
          </p>
        </div>

        <div className="about-content">
          <h2 className="section-heading">
            We turn ideas into
            <span className="green-text"> digital reality.</span>
          </h2>

          <div className="about-bottom">
            <p>
              ITZFIZZ is a creative digital agency focused on building
              meaningful digital experiences. We combine design,
              technology, and creativity to help businesses move forward.
            </p>

            <a href="#contact" className="text-link">
              Discover More <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services section" id="services">
        <div className="section-top">
          <p className="section-label">02 — WHAT WE DO</p>

          <p className="section-side-text">
            Ideas, design, and technology.
          </p>
        </div>

        <h2 className="section-heading">
          Our <span className="green-text">Services</span>
        </h2>

        <div className="service-list">
          <div className="service-row">
            <span className="service-number">01</span>
            <h3>Web Design &amp; Development</h3>
            <span className="service-arrow">↗</span>
          </div>

          <div className="service-row">
            <span className="service-number">02</span>
            <h3>UI / UX Design</h3>
            <span className="service-arrow">↗</span>
          </div>

          <div className="service-row">
            <span className="service-number">03</span>
            <h3>Branding &amp; Strategy</h3>
            <span className="service-arrow">↗</span>
          </div>

          <div className="service-row">
            <span className="service-number">04</span>
            <h3>Digital Marketing</h3>
            <span className="service-arrow">↗</span>
          </div>
        </div>
      </section>

      {/* OUR WORK */}
      <section className="work section" id="work">
        <div className="section-top">
          <p className="section-label">03 — SELECTED PROJECTS</p>

          <p className="section-side-text">
            A selection of our digital experiences.
          </p>
        </div>

        <div className="work-heading">
          <h2 className="section-heading">
            Our <span className="green-text">Work.</span>
          </h2>

          <p>Creative projects made with purpose.</p>
        </div>

        <div className="work-grid">
          {projects.map((project) => (
            <a
              href="#contact"
              className="work-card"
              key={project.number}
            >
              <div className="work-image">
                <img
                  src={project.image}
                  alt={project.title}
                />

                <span className="work-image-number">
                  {project.number}
                </span>

                <span className="work-image-arrow">↗</span>
              </div>

              <div className="work-info">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.category}</p>
                </div>

                <span className="work-link">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact section" id="contact">
        <div className="section-top">
          <p className="section-label">04 — GET IN TOUCH</p>

          <p className="section-side-text">
            Have a project in mind?
          </p>
        </div>

        <div className="contact-content">
          <h2>
            LET'S MAKE
            <br />
            <span className="green-text">IT HAPPEN.</span>
          </h2>

          <a
            href="mailto:hello@itzfizz.com"
            className="contact-button"
          >
            Let's Talk <span>↗</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <a href="#home" className="logo">
          ITZFIZZ<span>.</span>
        </a>

        <p>© 2026 ITZFIZZ. All rights reserved.</p>

        <a href="#home" className="back-to-top">
          Back to top ↑
        </a>
      </footer>
    </main>
  );
}

export default App;