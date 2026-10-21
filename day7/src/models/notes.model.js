const mongoose=require("mongoose")
//creating schema

const noteSchema=new mongoose.Schema({
    title:String,
    description:String,
    
})

//creating model
//here notes contain all notes data
//and without model we don't create update AND delete any node
const noteModel=mongoose.model("notes",noteSchema)


module.exports=noteModel