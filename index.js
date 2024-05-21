import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import router from "./Routes/auth.js";
import router_1 from "./Routes/user.js";
import router_2 from "./Routes/doctor.js";
import router_3 from "./Routes/review.js";
import router_4 from "./Routes/booking.js";





dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
    origin: true
}

app.get("/",(req, res)=>{
    res.send("api is working")
})

// database connection
mongoose.set('strictQuery', false)

const connectDB= async()=>{
    try {
    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    console.log("mongoDP is connect😍")
} catch (error) {

    console.log("mongoDP  connection is failed 😔")
    
}

}

// middlewaer

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use("/api/v1/auth",router);
app.use("/api/v1/users",router_1);
app.use("/api/v1/doctors",router_2);
app.use("/api/v1/reviews",router_3);
app.use("/api/v1/bookings",router_4);







app.listen(port,()=>{
    connectDB()
    console.log("server is runing on port"+port)
})
