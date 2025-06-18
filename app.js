const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs")
const Listing = require("./backend/models/listing.js");
const path = require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate")
const { title } = require("process");
const app = express();

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"backend", "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

main().then(() => {
    console.log("connection sucessful");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/pahuna');
}

app.get("/", (req, res) => {
    res.send("success")
})

//index route
app.get("/listings", async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/listings", { allListings });
})

//create route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs")
})

app.post("/listings", async(req, res) => {
    let { title, description, price, location, country } = req.body;
    const newList = new Listing({
         title, description, price, location, country
    })
    await newList.save()
    res.redirect("/listings")
})

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
      let { id } = req.params;
    let showList = await Listing.findById(id);
    res.render("listings/edit.ejs",{showList})
})

//update
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let {title,description,image,price,location,country}=req.body;
    await Listing.findByIdAndUpdate(id,{title,description,price,location,country},{runValidators:true,new:true});
    res.redirect(`/listings/${id}`);
})

//delete
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    console.log(id)
   await Listing.findByIdAndDelete(id).then((res)=>{res})
    res.redirect("/listings");
})

//show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let showList = await Listing.findById(id);
    res.render("listings/show.ejs", { showList })
})



app.listen(port, () => {
    console.log(`listening to port ${port}`);
})