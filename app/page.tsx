import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Box,
  Code2,
  Cpu,
  Github,
  Linkedin,
  MapPin,
  Server,
  GraduationCap,
} from 'lucide-react';
import PortfolioHeader from '@/components/portfolio/PortfolioHeader';
import EngineeringVisual from '@/components/portfolio/EngineeringVisual';
import ProjectShowcase from '@/components/portfolio/ProjectShowcase';
import ContactForm from '@/components/contact/ContactForm';
import { contact } from '@/lib/constants';
import { experiences } from '@/lib/data';

const capabilities = [
  {
    icon: Code2,
    title: 'Full-stack development',
    description:
      'Considered interfaces. Reliable APIs. Web products built from the database to the last interaction.',
    stack: 'React / Next.js / Node.js / PostgreSQL',
  },
  {
    icon: Server,
    title: 'DevOps & reliability',
    description:
      'The infrastructure behind the interface. Automated deployments, resilient systems, and fewer surprises.',
    stack: 'Docker / Linux / GitHub Actions / Oracle Cloud',
  },
  {
    icon: Cpu,
    title: 'Mechatronics & IoT',
    description:
      'Where software meets the physical world. Connected devices, industrial automation, and digital twins.',
    stack: 'ESP32 / MATLAB / Simulink / PLC & SCADA',
  },
];

export default function Page() {
  return (
    <div className="portfolio">
      <PortfolioHeader />
      <main id="main" tabIndex={-1}>
        <section className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="signal-dot" /> FULL-STACK DEVELOPER & DEVOPS ENGINEER
            </p>
            <h1 id="hero-title">
              Ideas, engineered
              <br />
              for the <em>real world.</em>
            </h1>
            <p className="hero-description">
              I’m Noah Ibrahim. I build thoughtful software and dependable systems, bringing an
              engineer’s mindset to every detail.
            </p>
            <div className="hero-actions">
              <a className="portfolio-button button-dark" href="#work">
                Explore my work <ArrowDown size={16} />
              </a>
              <a className="text-link" href="#contact">
                Let’s build something <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-location">
              <MapPin size={14} /> {contact.location}
              <span className="small-divider" />
              Software. Systems. A little curiosity.
            </div>
          </div>
          <EngineeringVisual />
          <div className="hero-footnote">
            <span>GOOD ENGINEERING MAKES COMPLEXITY FEEL SIMPLE.</span>
            <a href="#work">
              SCROLL TO EXPLORE <ArrowDown size={13} />
            </a>
          </div>
        </section>

        <div className="stack-strip">
          <div className="page-width stack-inner">
            <p>MY EVERYDAY TOOLKIT</p>
            <div>
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'].map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
            <span className="stack-plus">+</span>
          </div>
        </div>

        <section id="work" className="page-width section-space" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow section-index">01 / SELECTED WORK</p>
              <h2 id="work-title">
                Made to solve.
                <br />
                <em>Built to last.</em>
              </h2>
            </div>
            <p>
              A selection of products and systems.
              <br />
              Real constraints. Considered solutions.
            </p>
          </div>
          <ProjectShowcase />
          <a
            className="text-link github-more"
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={16} /> More experiments on GitHub <ArrowUpRight size={15} />
          </a>
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="page-width">
            <div className="about-intro">
              <div>
                <p className="eyebrow section-index">02 / THE PERSON BEHIND THE CODE</p>
                <h2 id="about-title">
                  An engineer’s mind.
                  <br />
                  <em>A builder’s instinct.</em>
                </h2>
              </div>
              <div className="about-copy">
                <p>
                  My background is in mechatronics. My craft is building software that works in the
                  real world, even when the network doesn’t.
                </p>
                <p>
                  From founding GInvoice to working across full-stack development and cloud
                  infrastructure, I enjoy connecting the pieces: the interface, the logic, and the
                  systems underneath.
                </p>
                <Link href="/resume" className="text-link">
                  A little more about my background <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
            <div className="proof-strip">
              <div>
                <strong>61</strong>
                <span>GInvoice registered users</span>
              </div>
              <div>
                <strong>
                  3,000<span>+</span>
                </strong>
                <span>Business records processed</span>
              </div>
              <div>
                <strong>
                  4.58<span>/5</span>
                </strong>
                <span>First-Class B.Eng · Mechatronics</span>
              </div>
              <div className="education-note">
                <GraduationCap size={27} />
                <p>
                  Afe Babalola University
                  <br />
                  <span>Class of 2025</span>
                </p>
              </div>
            </div>
            <div className="capability-grid">
              {capabilities.map(({ icon: Icon, title, description, stack }, i) => (
                <article key={title} className="capability">
                  <div className="capability-top">
                    <Icon size={24} strokeWidth={1.5} />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="capability-stack">{stack}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="page-width section-space experience-section"
          aria-labelledby="experience-title"
        >
          <div className="experience-intro">
            <p className="eyebrow section-index">03 / THE JOURNEY SO FAR</p>
            <h2 id="experience-title">
              Always building.
              <br />
              <em>Always learning.</em>
            </h2>
            <p>Hands-on experience across software, infrastructure, and engineering.</p>
            <Link className="text-link" href="/resume">
              View full résumé <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="experience-list">
            {[experiences.professional[0], experiences.product[0], experiences.professional[1]].map(
              (experience, i) => (
                <article className="experience-item" key={experience.company}>
                  <div className="experience-marker">
                    <span className={i === 0 ? 'current-marker' : ''} />
                  </div>
                  <div>
                    <p className="experience-date">
                      {experience.date}
                      {i === 0 && <span className="current-badge">CURRENT</span>}
                    </p>
                    <h3>{experience.company}</h3>
                    <p className="experience-role">{experience.role}</p>
                    <p className="experience-description">{experience.body}</p>
                    <div className="project-tags">
                      {experience.stack.slice(0, 4).map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="gallery-banner page-width" aria-labelledby="gallery-title">
          <div className="gallery-icon">
            <Box size={34} strokeWidth={1.2} />
          </div>
          <div>
            <p className="eyebrow">SOMETHING A LITTLE DIFFERENT</p>
            <h2 id="gallery-title">Step inside my engineering world.</h2>
            <p>
              Explore an interactive 3D gallery of the systems, ideas, and mechanics behind my work.
            </p>
          </div>
          <Link href="/gallery" className="portfolio-button button-outline" prefetch={false}>
            Enter the 3D gallery <ArrowUpRight size={16} />
          </Link>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="page-width contact-grid">
            <div className="contact-copy">
              <p className="eyebrow section-index">04 / LET’S MAKE IT HAPPEN</p>
              <h2 id="contact-title">
                Have something
                <br />
                <em>in mind?</em>
                <span className="contact-period">↗</span>
              </h2>
              <p>
                A product to build, a system to improve, or an opportunity to work together. I’d
                love to hear about it.
              </p>
              <a className="contact-email" href={`mailto:${contact.email}`}>
                {contact.email}
                <ArrowUpRight size={20} />
              </a>
              <div className="social-links">
                <a href={contact.github} target="_blank" rel="noopener noreferrer">
                  <Github size={17} /> GitHub <ArrowUpRight size={13} />
                </a>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin size={17} /> LinkedIn <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="portfolio-footer page-width">
        <a href="#" className="wordmark">
          noah<span>.</span>
        </a>
        <p>Thoughtfully built. Always evolving.</p>
        <span>© {new Date().getFullYear()} Noah Ibrahim</span>
        <a className="back-top" href="#">
          Back to top <ArrowRight size={14} />
        </a>
      </footer>
    </div>
  );
}
