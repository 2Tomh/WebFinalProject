var MongoClient = require('mongodb').MongoClient;
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