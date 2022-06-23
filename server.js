
const express = require('express')
const app = express()
const port = 3000

const db = require("./public/models/dbAdapter")

app.use(express.static('public'))

app.get('/getReasult', (req, res) => {
  let name="whiskey"
  async function myprogram(name){
    await db.findName.then(resault =>  res.send(resault) )
  }
  myprogram(name)
})



app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

