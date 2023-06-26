const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080


app.get("/", (req, res)=>{
    res.json({result: "ok", data:[1]})
})

app.listen(PORT, ()=>{
    console.log(`Serer is running. ${PORT}`)
})