import mongoose from 'mongoose';
import User from './userModel.js'; // Assuming you renamed user.js to User.js

// Hospital schema
const hospitalSchema = new mongoose.Schema({
  profilePicture: {
    type: String, // URL to the profile picture
    default: null, // Default can be null or a placeholder URL
  },
  organizationName: { type: String, default: '', unique: true }, // Name of the hospital/clinic
  registrationNumber: { type: String, default: '', unique: true }, // Government/Legal registration number
  licenseNumber: { type: String, default: '', unique: true }, // Operating license
  licenseAuthority: { type: String, default: '' }, // Authority that issued the license
  licenseExpiration: { type: Date, default: '' }, // Expiry date of the license
  contactEmail: { type: String, default: '' }, // General email address for the hospital
  contactPhone: { type: String, default: '' }, // General phone number
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    postalCode: { type: String, default: '' },
  },
  website: { type: String }, // Hospital's official website
  facilities: [
    {
      name: { type: String, default: '' }, // e.g., ICU, Emergency Room
      description: { type: String }, // Optional details about the facility
    },
  ],
  departments: [
    {
      name: { type: String, default: '' }, // e.g., Cardiology, Neurology
      head: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }, // Department head (Doctor)
      staffCount: { type: Number, default: 0 }, // Number of staff in the department
    },
  ],
  servicesOffered: [{ type: String }], // e.g., Surgery, Diagnostics, Emergency
  operatingHours: {
    start: { type: String, default: '' }, // e.g., "08:00"
    end: { type: String, default: '' }, // e.g., "20:00"
  },
  totalBeds: { type: Number, default: 0 }, // Total beds in the hospital
  availableBeds: { type: Number, default: 0 }, // Currently available beds
  emergencyContact: {
    name: { type: String, default: '' }, // Contact person for emergencies
    phone: { type: String, default: '' },
    email: { type: String },
  },
  ratings: {
    averageRating: { type: Number, default: 0 }, // Average patient rating
    totalReviews: { type: Number, default: 0 }, // Total number of reviews
  },
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }], // List of doctors associated with the hospital
  profileCompleted: { type: Boolean, default: false }, // Tracks second-step registration
}, { timestamps: true });

// Discriminator
const Hospital = User.discriminator('hospital', hospitalSchema);

export default Hospital;
