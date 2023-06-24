const { mongoose } = require("mongoose");

// connectDB function
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error : ${error.message}`)
        process.exit(1)
    }
}

// export
module.exports = connectDb