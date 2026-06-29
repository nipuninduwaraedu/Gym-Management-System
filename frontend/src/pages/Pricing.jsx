import { useEffect, useState } from "react";

import { getMemberships } from "../services/membershipService";

import "../styles/Pricing.css";

function Pricing() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const data = await getMemberships();

        setMemberships(data);
      } catch (err) {
        setError(err.message || "Failed to load memberships");
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  if (loading) {
    return <div className="pricing-message">Loading memberships...</div>;
  }

  if (error) {
    return <div className="pricing-message">{error}</div>;
  }

  return (
    <section className="pricing-page">
      <h1>Membership Plans</h1>

      <div className="pricing-container">
        {memberships.map((membership) => (
          <div key={membership._id} className="pricing-card">
            <h2>{membership.name}</h2>

            <h3>LKR {membership.price}</h3>

            <p>{membership.duration} Month(s)</p>

            <p>{membership.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
