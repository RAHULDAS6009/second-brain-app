import { Request, Response } from "express"
import connectToDatabase from "./config"

const express = require('express')
const app = express()
const port = 3000

connectToDatabase();

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
