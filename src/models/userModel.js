import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {   
        type: String, 
        required:[true, "Please provide a full name"] 
    },
    username: { 
        type: String, 
        required: [true, "Please provide a username"], 
        unique: true 
    },
    email: { 
        type: String, 
        required: [true, "Please provide a email"], 
        unique: true 
    },    
    password: { 
        type: String, 
        required: [true, "Please provide a password"] 
    },
    phone: { type: String },
    address: { type: String},
    city: { type: String},
    state: { type: String},
    country: { type: String},
    zip: { type: String},
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
    passwordResetToken: { type: String },
    passwordResetTokenExpires: { type: Date },
    profilePicture: { type: String },
    bio: { type: String },
    socialLinks: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      linkedin: { type: String },
    },
    
}, { timestamps: true });

const User = mongoose.models.users || mongoose.model("User", userSchema, "users");

export default User;