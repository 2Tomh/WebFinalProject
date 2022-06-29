
const express = require('express');
const app = express();
const port = 3000;
const path= require("path");



const db = require("./models/dbAdapter")

app.use(express.json())
app.use(express.static('public'))


app.get('/login',(req, res)=>{
  res.sendFile(path.join(__dirname,"./public/Login.html"))
})
app.get('/',(req, res)=>{
  res.sendFile(path.join(__dirname,"./public/index.html"))
})

app.get('/getReasult', (req, res) => {
  let name="whiskey"
  async function myprogram(name){
    await db.findName.then(resault =>  res.send(resault) )
  }
  myprogram(name)
})



app.get('/personDATA', (req, res) => {
  var newcontact=
  {
    personName:req.query.Name,
    personEmail:req.query.Email,
    subject:req.query.Subject    
  }
    
  async function mysave(detail) {
    await db.savePerson(detail).then((result) => res.sendFile(path.join(__dirname,"./public/index.html")));
  }
  mysave(newcontact);
})

// Login
app.post('/login', (req, res) => {
  
  let email=req.body.userEmail;
  let password=req.body.userPass

  async function userLogin(email){
    await db.FindUser(email).then(result =>{
     
      if(!result){
        
       return  res.send(false)
      }
      if(password==result.password){
        
         return res.send(true)
      }
        else{
          
         return  res.send(false)
        }
      }
      )
    }
  
  userLogin(email)
})

// connect to pages

app.get('/contact' , (req, res)=> {
  res.sendFile(path.join(__dirname,"./public/contact.html"));
})


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

