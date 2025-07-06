import mongoose from "mongoose";

export const ConnectBD = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb connected to ${conn.connection.host}`)
    } catch (error) {
        console.log('error connecting to mongodb', error)
        process.exit(1)
    }
}

