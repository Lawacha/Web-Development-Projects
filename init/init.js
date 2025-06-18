const mongoose=require("mongoose");
const Listing=require("../backend/models/listing.js");
const initData=require("./data.js");

main().then(()=>{
    console.log("connection sucessful");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/pahuna');
    
} 

const initdb=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    
}

initdb();
