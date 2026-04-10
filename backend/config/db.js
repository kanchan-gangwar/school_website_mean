const mongoose = require("mongoose");
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDb connected successfully")
    }
    catch (e) {
        console.log("MongoDb connection failed with error: " + e.message)
        process.exit(1);
    }
}

module.exports = dbConnect;