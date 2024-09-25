import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnection from './db.js'
import products from './route/productRoutes.js'

dotenv.config()
dbConnection()
const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())

app.use("/product",products)



app.get("/",(req,res)=>{
    res.status(200).send({message:"API WORKING"})
})

app.listen(PORT,()=>{
    console.log(`App is listening to PORT ${PORT}`)
})