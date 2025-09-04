import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect DB & Start Server
const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    
    // Try to connect to MongoDB, but don't fail if it's not available
    if (process.env.MONGO_URI) {
      try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");
      } catch (dbErr) {
        console.warn("⚠️ MongoDB connection failed, running without database:", dbErr.message);
        console.log("💡 To use full functionality, make sure MongoDB is running");
      }
    } else {
      console.warn("⚠️ MONGO_URI not defined, running without database");
    }

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Error starting server:", err.message);
    process.exit(1);
  }
};

startServer();
