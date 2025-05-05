import mongoose from "mongoose";

const connecttodb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ Connected to MongoDB successfully");
        return conn;  // ✅ Return connection info
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        throw error;
    }
};

export default connecttodb;
