require('dotenv').config();
const mongoose = require('mongoose');
const Membership = require('./src/models/Membership');

const seedMemberships = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Membership.deleteMany({});
    console.log('Deleted existing memberships');

    const sampleMemberships = [
      {
        name: "Basic",
        price: 2000,
        duration: 1,
        description: "Perfect for beginners! Access to gym equipment during regular hours."
      },
      {
        name: "Premium",
        price: 5000,
        duration: 3,
        description: "Includes group classes and personal training sessions!"
      },
      {
        name: "Elite",
        price: 15000,
        duration: 12,
        description: "All access pass! 24/7 gym access, unlimited classes, and monthly trainer sessions."
      }
    ];

    await Membership.insertMany(sampleMemberships);
    console.log('Sample memberships created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding memberships:', error);
    process.exit(1);
  }
};

seedMemberships();
