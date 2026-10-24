//server create 
const express=require("express")
const noteModel=require("./models/note.model")
const cors=require("cors")
const app=express()
const path=require("path")

app.use(express.json())
app.use(cors())



//http://localhost:3000/assets/index-BXERxTJY.js
//http://localhost:3000/assets/index-piQLyTUs.css

//http://localhost:3000/assets/index-BXERxTJY-2.js ye file exit nhi krti isko middleware handle krega or response me index.html ko bej deta h
//frontend and backend same hi url pr chla rhe he
app.use(express.static("./public"))//public folder ki files ko publically available bna deti h


app.post("/api/notes", async(req,res)=>{
const{title,description}=req.body

const note=await noteModel.create({
    title,description
})
res.status(201).json({
    message:"note created successfully",
    note
})
})



app.get("/api/notes", async(req,res)=>{
   const notes=await noteModel.find()
   res.status(200).json({
    message:"notes fetch successfully",
    notes
   })
})



//delete
app.delete("/api/notes/:id", async(req,res)=>{
    const id=req.params.id
   await noteModel.findByIdAndDelete(id)
    res.status(200).json({
     message:"note deleted"
    
    })
})



//patch /api/notes/:id
//update the description of the node by id
//req.body={description}

app.patch("/api/notes/:id",async(req,res)=>{
    const id=req.params.id
    const {description}=req.body
    await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"note updated successfully"
        
    })
})


//wild cart rout=>ye un api ko handle krega jo humne create nhi ki thi
app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
    
})

module.exports=app