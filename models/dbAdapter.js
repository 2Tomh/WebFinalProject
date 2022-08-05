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


// save PURCHASE
async function purchase(products, username){
    await client.connect();
    await client.db("Alcohol").collection("PURCHASE").insertOne({products, username})
    await client.close()
    return;
}
exports.purchase = purchase


async function getCategories(){
    await client.connect();
    const cursor =   client.db("Alcohol").collection("Products").find({});
const products = await cursor.toArray()
    // const categories = await client.db("Alcohol").collection("Categories").aggregate([
    //     {
    //         $lookup:
    //         {
    //             from:'Products',
    //             localField: 'item',
    //             foreignField: 'products.productId',
    //             as: 'products.product'

    //         }
    //     }
    // ]).toArray()
    console.log(products)
    await client.close()
    return products;
}

exports.getCategories = getCategories