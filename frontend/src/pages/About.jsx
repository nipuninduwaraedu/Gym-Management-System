import "../styles/About.css";

function About() {
  const missionVision = [
    {
      icon: "🎯",
      title: "Our Mission",
      desc: "To make fitness accessible, enjoyable, and sustainable for everyone, regardless of their starting point."
    },
    {
      icon: "🌟",
      title: "Our Vision",
      desc: "To be the most trusted fitness destination, transforming lives through health and wellness every single day."
    }
  ];

  const trainers = [
    { name: "John Smith", role: "Head Trainer", emoji: "💪" },
    { name: "Sarah Johnson", role: "Yoga Instructor", emoji: "🧘" },
    { name: "Mike Chen", role: "Strength Coach", emoji: "🏋️" },
    { name: "Emily Davis", role: "Cardio Expert", emoji: "🏃" }
  ];

  const facilities = [
    { icon: "🏋️", name: "Weight Training" },
    { icon: "🏃", name: "Cardio Zone" },
    { icon: "🧘", name: "Yoga Studio" },
    { icon: "🏊", name: "Swimming Pool" },
    { icon: "🥗", name: "Nutrition Bar" },
    { icon: "🛁", name: "Spa & Sauna" }
  ];

  return (
    <div className="about">
      <section className="about-hero">
        <div className="container">
          <h1>About FitLife Gym</h1>
          <p>Building healthier communities, one member at a time.</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          {/* Mission & Vision */}
          <div className="mission-vision">
            {missionVision.map((item, index) => (
              <div key={index} className="mv-card card">
                <div className="mv-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Our Story */}
          <div className="story-section">
            <div className="story-content">
              <div className="story-text">
                <h2>Our Story</h2>
                <p>
                  Founded in 2018, FitLife Gym started with a simple mission: to create a welcoming space 
                  where everyone feels comfortable working towards their fitness goals. What began as a 
                  small neighborhood gym has grown into a community of thousands of members who support 
                  and motivate each other every day.
                </p>
                <p>
                  We believe that fitness is not just about looking good—it's about feeling great, 
                  building confidence, and improving your overall quality of life. Our team of certified 
                  trainers is dedicated to helping you achieve results in a safe, sustainable way.
                </p>
              </div>
              <div className="story-image">
                <div className="image-placeholder">
                  <span>🏢</span>
                </div>
              </div>
            </div>
          </div>

          {/* Our Trainers */}
          <div className="trainers-section">
            <div className="section-header">
              <h2>Meet Our Expert Trainers</h2>
              <p>Passionate professionals dedicated to your success</p>
            </div>
            <div className="trainers-grid">
              {trainers.map((trainer, index) => (
                <div key={index} className="trainer-card card">
                  <div className="trainer-avatar">{trainer.emoji}</div>
                  <h4>{trainer.name}</h4>
                  <p className="trainer-role">{trainer.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Facilities */}
          <div className="facilities-section">
            <div className="section-header">
              <h2>Our Facilities</h2>
              <p>World-class amenities for your fitness journey</p>
            </div>
            <div className="facilities-grid">
              {facilities.map((facility, index) => (
                <div key={index} className="facility-card card">
                  <span className="facility-icon">{facility.icon}</span>
                  <span className="facility-name">{facility.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
