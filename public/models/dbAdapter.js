const {MongoClient}= require("mongodb")
// connection uri
const uri="mongodb://localhost:27017/";
const client= new MongoClient(uri);

async function findMongoDocument(name){
    //connect
    await  client.connect();
    console.log("connect success")

    //check
    await client.db("admin").command({ping : 1})

    //find one - i built it
    const myResault = await client.db("Alcohol").collection("product").findOne({name : `${name}`})

    //close
    await client.close()
    
    return myResault;
}


var MongoClient =require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const insertDB=function(err, db) {
  if (err) throw err;
  var dbo = db.db("Alcohol");
  var myobj = { name: "black label", price: 400 };
  dbo.collection("product").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}; 

MongoClient.connect(url, insertDB)