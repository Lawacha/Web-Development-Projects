const mongoose=require("mongoose");
const Chat=require("./models/chat.js")

main().then(()=>console.log("connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wechat');
}

let allChats=[
    {
    from:"robb",
    to:"frey",
    msg:"winter is coming",
    },
     {from:"tony",
    to:"peter",
    msg:"love you 3000",
    created_at:new Date()
    },
     {from:"peter",
    to:"octo",
    msg:"trying to do better",
    created_at:new Date()
    },
     {from:"aego",
    to:"james",
    msg:"burn them all",
    created_at:new Date()
    }, 
     {from:"chelsea",
    to:"champions league",
    msg:"we are back",
    created_at:new Date()
    }, 
]

Chat.insertMany(allChats).then((res)=>{
    console.log(res);
})