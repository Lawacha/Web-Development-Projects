const express=require("express");
const ejs=require("ejs");
const mongoose=require("mongoose");
const path=require("path")
const Chat=require("./models/chat.js")
const methodOverride=require("method-override");

const app=express();
const port=8080;

main().then(()=>console.log("connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wechat');
}

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.get("/chats",async (req,res)=>{
   let chats=await Chat.find();
   res.render("chats.ejs",{chats});
})

//new 
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
})

app.post("/chats",async (req,res)=>{
  let {from,to,msg}=req.body;
  const newChat=new Chat({
    from,to,msg,created_at:new Date(),
  })
  await newChat.save();
  res.redirect("/chats");
})

//update
app.get("/chats/:id/edit",async(req,res)=>{
  let {id}=req.params;
  let chat=await Chat.findById(id);
 res.render("update.ejs",{chat});
})

app.put("/chats/:id",async (req,res)=>{
  let {msg:newMsg}=req.body;
  let {id}=req.params;
 let newChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true},{new:true})
  res.redirect("/chats");
})

//destroy
app.delete("/chats/:id",async(req,res)=>{
  let {id}=req.params;
  let deleteChat=await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
})

app.get("/",(req,res)=>{
    res.send("hellow");
})

app.listen(port,()=>{
    console.log(`listening to port: ${port}`);
})