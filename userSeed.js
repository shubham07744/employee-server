import dotenv from 'dotenv';
dotenv.config();  // 👈 Add this to load .env variables

import connecttodb from './db/db.js';
import User from './models/User.js'
import bcrypt from 'bcrypt';

const userRegister = async () => {
    connecttodb()
    try {
        const hashPassword = await bcrypt.hash("admin", 10)
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
        console.log("✅ Admin user created");
    } catch (error) {
        console.log("❌ Error during seeding:", error)
    }
}

userRegister();
