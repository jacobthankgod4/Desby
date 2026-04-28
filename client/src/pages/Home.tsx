import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    role: "",
    city: "",
    purpose: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const waitlistMutation = trpc.waitlist.submit.useMutation();


  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
      case 'whatsapp':
        return value.length < 7 ? 'WhatsApp number must be valid' : '';
      case 'role':
        return !value ? 'Please select a role' : '';
      case 'city':
        return value.length < 2 ? 'City must be at least 2 characters' : '';
      case 'purpose':
        return value.length < 10 ? 'Purpose must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      await waitlistMutation.mutateAsync(formData);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        role: "",
        city: "",
        purpose: "",
      });
      toast.success("You're on the Desby waitlist!");
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to submit form";
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };


  const [animatedBars, setAnimatedBars] = useState<Set<number>>(new Set());
  const tractionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate bars when section comes into view
            setTimeout(() => {
              setAnimatedBars(new Set([0, 1, 2, 3, 4, 5]));
            }, 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (tractionRef.current) {
      observer.observe(tractionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div style={{ background: "var(--bg-main)", minHeight: "100vh" }}>
      {/* Cookie Bar */}
      <div className="cookie-bar">
        <p>We use cookies to enhance your experience on Desby.</p>
        <div className="cookie-bar-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#cookies">Cookie Policy</a>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">D</div>
            <div>
              <div className="logo-main">Desby</div>
              <div className="logo-sub">Fashion OS</div>
            </div>
          </div>

          <div className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
            <button
              className="nav-link"
              onClick={() => scrollToSection("features")}
            >
              Features
            </button>
            <div className="nav-item">
              <button className="nav-link">
                Learn <span className="dropdown-arrow">▼</span>
              </button>
              <div className="dropdown-menu">
                <a href="#apprentice">Apprentice Program</a>
                <a href="#problem">Market Reality</a>
                <a href="#traction">Traction</a>
              </div>
            </div>
            <button
              className="nav-link"
              onClick={() => scrollToSection("revenue")}
            >
              Business Model
            </button>
            <button
              className="nav-link"
              onClick={() => scrollToSection("founder")}
            >
              About
            </button>
          </div>

          <div className="nav-right">
            <div className="mode-toggle">
              <button className="mode-btn active">Light</button>
              <button className="mode-btn">Dark</button>
            </div>
            <button className="btn-signin">Sign In</button>
            <button
              className="nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="hamburger"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              <span>Fashion-Tech Operating System</span>
            </div>
            <h1 className="hero-heading">
              Empower African Tailors to Build Sustainable Businesses
            </h1>
            <p className="hero-subtext">
              Desby is the digital operating system that helps tailors manage
              customers, store measurements, preview designs, source fabrics,
              train apprentices, and scale into successful fashion entrepreneurs.
            </p>
            <button
              className="btn-cta"
              onClick={() => scrollToSection("waitlist")}
            >
              Join Waitlist <span>→</span>
            </button>
          </div>

          <div className="hero-visuals">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663600955546/2gJVZtuecNPiAPSaX2bvHH/desby-tailor-hero-V9qSc4RxUdf4fBtewzjUUF.webp"
              alt="African tailor at work"
              className="hero-image"
            />
            <div
              className="orbit-bubble"
              style={{ top: "10%", left: "5%", animation: "float 3s ease-in-out infinite" }}
            >
              👥 Customer Measurements
            </div>
            <div
              className="orbit-bubble"
              style={{ top: "5%", right: "10%", animation: "float 3.5s ease-in-out infinite" }}
            >
              🎨 Design Preview
            </div>
            <div
              className="orbit-bubble"
              style={{ bottom: "15%", right: "5%", animation: "float 4s ease-in-out infinite" }}
            >
              🧵 Fabric Sourcing
            </div>
            <div
              className="orbit-bubble"
              style={{ bottom: "20%", left: "10%", animation: "float 3.2s ease-in-out infinite" }}
            >
              📊 Production Tracking
            </div>
            <div
              className="orbit-bubble"
              style={{ top: "50%", left: "-5%", animation: "float 3.8s ease-in-out infinite" }}
            >
              👨‍🎓 Apprentice Workflow
            </div>
            <div
              className="orbit-bubble"
              style={{ top: "40%", right: "-5%", animation: "float 3.3s ease-in-out infinite" }}
            >
              🌱 Branch Growth
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Desby OS Modules</h2>
            <p className="section-subtitle">
              Everything a tailor needs to manage, grow, and scale their business
            </p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: "👥",
                title: "Customer Management",
                desc: "Organize client information, preferences, and history in one place",
              },
              {
                icon: "📏",
                title: "Measurement Storage",
                desc: "Store and retrieve precise measurements for every customer",
              },
              {
                icon: "🎨",
                title: "Digital Design Preview",
                desc: "Show clients designs before production with visual previews",
              },
              {
                icon: "🧵",
                title: "Fabric Marketplace",
                desc: "Source quality fabrics with transparent pricing and availability",
              },
              {
                icon: "📊",
                title: "Production Tracking",
                desc: "Monitor orders from design to delivery in real-time",
              },
              {
                icon: "👨‍🎓",
                title: "Apprentice Tools",
                desc: "Train and manage apprentices with structured workflows",
              },
              {
                icon: "📚",
                title: "Fashion Courses",
                desc: "Access professional training and skill development resources",
              },
              {
                icon: "🌱",
                title: "Branch Growth Tools",
                desc: "Scale your business with multi-location management",
              },
            ].map((feature, idx) => (
              <div key={idx} className="service-card">
                <div className="service-icon-wrap">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <a href="#" className="service-link">
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apprentice-to-Owner Section */}
      <section className="section" id="apprentice">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Apprentice to Owner</h2>
            <p className="section-subtitle">
              A pathway for skilled operators to become independent fashion entrepreneurs
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-stage">
              <div className="timeline-number">1</div>
              <div className="timeline-title">Apprentice</div>
              <div className="timeline-desc">
                Join under contract and learn through real customer orders
              </div>
            </div>
            <div className="timeline-arrow">→</div>
            <div className="timeline-stage">
              <div className="timeline-number">2</div>
              <div className="timeline-title">Trained Operator</div>
              <div className="timeline-desc">
                Master Desby OS and develop professional skills
              </div>
            </div>
            <div className="timeline-arrow">→</div>
            <div className="timeline-stage">
              <div className="timeline-number">3</div>
              <div className="timeline-title">Branch Co-Founder</div>
              <div className="timeline-desc">
                Launch a new branch with Desby infrastructure support
              </div>
            </div>
            <div className="timeline-arrow">→</div>
            <div className="timeline-stage">
              <div className="timeline-number">4</div>
              <div className="timeline-title">Fashion Entrepreneur</div>
              <div className="timeline-desc">
                Build a sustainable, scalable fashion business
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Market Reality */}
      <section className="section" id="problem">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">The Problem We Solve</h2>
            <p className="section-subtitle">
              Real challenges facing African tailors and fashion entrepreneurs
            </p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: "🎨",
                title: "Design Communication",
                desc: "Inconsistent design interpretation leads to client dissatisfaction",
              },
              {
                icon: "📋",
                title: "No Digital Records",
                desc: "Customer measurements and preferences scattered across notebooks",
              },
              {
                icon: "🧵",
                title: "Fabric Sourcing",
                desc: "Difficulty finding quality fabrics at fair prices with reliability",
              },
              {
                icon: "⏱️",
                title: "Production Tracking",
                desc: "No visibility into order status or production bottlenecks",
              },
              {
                icon: "💼",
                title: "Business Growth",
                desc: "Limited infrastructure to scale beyond a single location",
              },
              {
                icon: "👨‍🎓",
                title: "Apprenticeship",
                desc: "Apprentices remain assistants without clear path to ownership",
              },
            ].map((problem, idx) => (
              <div key={idx} className="service-card">
                <div className="service-icon-wrap">{problem.icon}</div>
                <h3>{problem.title}</h3>
                <p>{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traction Section */}
      <section className="section" id="traction" ref={tractionRef}>
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Our Traction</h2>
            <p className="section-subtitle">
              Building momentum toward a fashion-tech revolution
            </p>
          </div>

          <div style={{ marginTop: "60px", maxWidth: "600px", margin: "60px auto 0" }}>
            {[
              { label: "Interested Users", percent: 85 },
              { label: "System Readiness", percent: 92 },
              { label: "Studio Readiness", percent: 78 },
              { label: "Training Curriculum", percent: 88 },
              { label: "Customer Demand", percent: 95 },
              { label: "Industry Partnerships", percent: 72 },
            ].map((item, idx) => (
              <div key={idx} className="traction-item">
                <div className="traction-label">
                  <span className="traction-name">{item.label}</span>
                  <span className="traction-percent">{item.percent}%</span>
                </div>
                <div className="traction-bar">
                  <div
                    className="traction-bar-fill"
                    style={{ 
                      width: animatedBars.has(idx) ? `${item.percent}%` : '0%',
                      transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Model */}
      <section className="section" id="revenue">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Revenue Model</h2>
            <p className="section-subtitle">
              Multiple streams supporting sustainable growth
            </p>
          </div>

          <div className="revenue-grid">
            {[
              { icon: "👗", title: "Garment Sales", desc: "Direct revenue from custom tailoring" },
              { icon: "💻", title: "OS Subscription", desc: "Monthly subscription for Desby platform access" },
              { icon: "🤝", title: "Marketplace Commission", desc: "Commission on fabric marketplace transactions" },
              { icon: "🌱", title: "Branch Revenue Share", desc: "Revenue sharing from franchised branches" },
              { icon: "📢", title: "Advertising & Visibility", desc: "Premium visibility for tailors in the app" },
              { icon: "🎓", title: "Apprenticeship Fees", desc: "Structured training and apprenticeship programs" },
              { icon: "📚", title: "Course Sales", desc: "Professional development and skill courses" },
            ].map((item, idx) => (
              <div key={idx} className="revenue-card">
                <div className="revenue-icon">{item.icon}</div>
                <div className="revenue-title">{item.title}</div>
                <div className="revenue-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section" id="founder">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Our Story</h2>
            <p className="section-subtitle">
              From a mother's tailoring store to a fashion-tech revolution
            </p>
          </div>

          <div style={{ maxWidth: "800px", margin: "60px auto 0", lineHeight: "1.8" }}>
            <p style={{ marginBottom: "20px", color: "var(--text-secondary)", fontSize: "16px" }}>
              Desby began in 2020 from the founder's mother's tailoring store in Nigeria. Watching her navigate the
              complexities of custom fashion work—managing clients, storing measurements, communicating designs, sourcing
              fabrics, and training apprentices—revealed a fundamental gap: there was no digital infrastructure built
              specifically for tailors and fashion entrepreneurs.
            </p>

            <p style={{ marginBottom: "20px", color: "var(--text-secondary)", fontSize: "16px" }}>
              The founder witnessed firsthand the pressures of custom fashion work: design miscommunication, scattered
              customer records, inconsistent fabric sourcing, weak production tracking, and apprentices stuck in
              assistant roles without a path to ownership.
            </p>

            <p style={{ marginBottom: "20px", color: "var(--text-secondary)", fontSize: "16px" }}>
              Through dedication and innovation, Desby generated over ₦2,000,000 in garment revenue, proving that
              digital tools could transform tailoring businesses. Today, Desby OS is the operating system designed to
              help tailors run sustainable businesses, train the next generation of entrepreneurs, and scale into
              thriving fashion enterprises.
            </p>

            <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
              Our mission: Empower African tailors with the tools, infrastructure, and ecosystem they need to build
              world-class fashion businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section className="section" id="waitlist">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Join the Desby Waitlist</h2>
            <p className="section-subtitle">
              Be among the first to access the future of fashion-tech
            </p>
          </div>

          <div style={{ maxWidth: "500px", margin: "60px auto 0" }}>
            {submitSuccess && (
              <div className="form-success">
                ✓ You're on the Desby waitlist! Check your email for next steps.
              </div>
            )}
            {submitError && (
              <div className="form-error">
                ✗ {submitError}
              </div>
            )}

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp Number</label>
                <input
                  type="tel"
                  name="whatsapp"
                  className="form-input"
                  placeholder="+234 800 000 0000"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select your role</option>
                  <option value="Tailor">Tailor</option>
                  <option value="Apprentice">Apprentice</option>
                  <option value="Fabric Dealer">Fabric Dealer</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-input"
                  placeholder="Your city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">What do you want to use Desby for?</label>
                <textarea
                  name="purpose"
                  className="form-textarea"
                  placeholder="Tell us about your tailoring business or goals..."
                  value={formData.purpose}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ 
        textAlign: "center",
        padding: "120px 0",
        background: "linear-gradient(135deg, rgba(245, 197, 66, 0.15) 0%, rgba(245, 197, 66, 0.08) 100%)",
        borderTop: "1px solid rgba(245, 197, 66, 0.2)",
        borderBottom: "1px solid rgba(245, 197, 66, 0.2)"
      }}>
        <div className="section-container">
          <h2 className="section-title">Ready to Transform Fashion?</h2>
          <p className="section-subtitle" style={{ marginBottom: "40px" }}>
            Join the Desby ecosystem and become part of the African fashion-tech revolution
          </p>
          <button
            className="btn-cta"
            onClick={() => scrollToSection("waitlist")}
          >
            Get Started Today →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Desby</h3>
            <p>
              Fashion-tech operating system empowering African tailors and entrepreneurs to build sustainable,
              scalable businesses.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <a href="#" style={{ fontSize: "20px" }}>
                📱
              </a>
              <a href="#" style={{ fontSize: "20px" }}>
                💬
              </a>
              <a href="#" style={{ fontSize: "20px" }}>
                ✉️
              </a>
            </div>
          </div>

          <div>
            <div className="footer-title">Product</div>
            <div className="footer-links">
              <a href="#features">Features</a>
              <a href="#apprentice">Apprentice Program</a>
              <a href="#revenue">Business Model</a>
            </div>
          </div>

          <div>
            <div className="footer-title">Company</div>
            <div className="footer-links">
              <a href="#founder">About Us</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
          </div>

          <div>
            <div className="footer-title">Legal</div>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Desby. All rights reserved.</p>
          <p>Made with ❤️ for African fashion entrepreneurs</p>
        </div>
      </footer>

      {/* Chat Widget */}
      <div className="chat-widget">
        <button className="chat-bubble" title="Chat with us">
          <span className="chat-icon">💬</span>
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
