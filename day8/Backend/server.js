

require("dotenv").config()
const app=require("./src/app")

//server start krna 
//database se connect krna
const connectToDb=require("./src/config/database")

connectToDb()




app.listen(3000,()=>{
    console.log("server is running on 3000...")
})