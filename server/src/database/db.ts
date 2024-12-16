import mongoose from "mongoose";


export default function mongooseConnect(){
    
    const url = process.env.MONGOOSE_CONNECT_URL as string;

    mongoose.connect(url).then(() => {
        console.log("Mongoose connected successfully.");
    });
}