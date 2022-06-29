const {MongoClient}= require("mongodb")


// connection uri
const uri="mongodb://localhost:27017/";
const client= new MongoClient(uri);

async function findMongoDoc(name){
    //connect
    await  client.connect();
    console.log("connect success")

    //check
    await client.db("admin").command({ping : 1})

    //find one 
    const myResault = await client.db("Alcohol").collection("product").findOne({name : `${name}`})

    //close
    await client.close()

    return myResault;
}
exports.findName =  findMongoDoc

// save preson
async function savePerson(detail){
    await client.connect();
    const newcontact = await client.db("Alcohol").collection("personDATA").insertOne(detail)
    await client.close()
    return "Thank you"
}
exports.savePerson = savePerson

// find user
async function FindUser(email){
    await  client.connect();
    //find one 
    const user = await client.db("Alcohol").collection("login").findOne({email})
    await client.close()
    return user;
}
exports.FindUser =  FindUser
