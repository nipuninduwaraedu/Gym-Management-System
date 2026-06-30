import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const features = [
    {
      icon: "🏋️",
      title: "Modern Equipment",
      desc: "State-of-the-art gym equipment for all your fitness needs"
    },
    {
      icon: "👨‍🏫",
      title: "Expert Trainers",
      desc: "Certified trainers to guide you on your fitness journey"
    },
    {
      icon: "📅",
      title: "Easy Booking",
      desc: "Book your gym sessions with just a few clicks"
    },
    {
      icon: "💳",
      title: "Flexible Plans",
      desc: "Choose from a variety of membership plans that fit your budget"
    }
  ];

  const stats = [
    { number: "1500+", label: "Happy Members" },
    { number: "50+", label: "Expert Trainers" },
    { number: "24/7", label: "Gym Access" },
    { number: "100+", label: "Weekly Classes" }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Transform Your <span className="highlight">Body</span>,
                Transform Your <span className="highlight">Life</span>
              </h1>
              <p className="hero-subtitle">
                Join FitLife Gym and start your journey to a healthier, stronger, and more confident you. 
                With world-class equipment and expert trainers, your fitness goals are within reach.
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary">
                  Get Started Today
                </Link>
                <Link to="/pricing" className="btn btn-outline">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-placeholder">
                <span className="hero-icon">💪</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose FitLife Gym?</h2>
            <p>Experience the difference with our premium fitness facilities and services</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Fitness Journey?</h2>
            <p>Join now and get your first month at 50% off!</p>
            <Link to="/register" className="btn btn-secondary">
              Join Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
