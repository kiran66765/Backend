const express=require('express')
const app=express()//server ka instant create krna
//how to program server
app.get("/",(req,res)=>{
    res.send("hello world")
}) 
app.get("/about",function(req,res){
    res.send("this is about page")
})
app.get("/home",(req,res)=>{
    res.send("this is home")
})
app.listen(3000)// server ko start krta h
console.log(express)