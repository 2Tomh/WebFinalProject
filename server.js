
const express = require('express');
const app = express();
const port = 3000;
const path= require("path");



const db = require("./models/dbAdapter")

app.use(express.json())
app.use(express.static('public'))


app.get('/login',(req, res)=>{
  res.sendFile(path.join(__dirname,"./public/HTML/Login.html"))
})
app.get('/',(req, res)=>{
  res.sendFile(path.join(__dirname,"./public/HTML/index.html"))
})

app.get('/personDATA', (req, res) => {
  var newcontact=
  {
    personName:req.query.Name,
    personEmail:req.query.Email,
    subject:req.query.Subject    
  }
    
  async function mysave(detail) {
    await db.savePerson(detail).then((result) => res.sendFile(path.join(__dirname,"./public/HTML/index.html")));
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
       return  res.send(false)      }
      if(password==result.password){
         return res.send(true)}
     else{  
            return  res.send(false)
          }
      }
      )}
  userLogin(email)
})

// connect to pages

app.get('/contact' , (req, res)=> {
  res.sendFile(path.join(__dirname,"./public/HTML/contact.html"));
})
app.get('/store' , (req, res)=> {
  res.sendFile(path.join(__dirname,"./public/HTML/store.html"));
})
app.get('/about' , (req, res)=> {
  res.sendFile(path.join(__dirname,"./public/HTML/about.html"));
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

