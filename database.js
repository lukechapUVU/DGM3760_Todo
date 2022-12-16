/* const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbAdmin:DGMUVUisAwesome@cluster0.hojbctw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1})

client.connect(err => {
    const collection = client.db('test').collection('devices');
    //perform actions on the collection object
    console.log('connected')
    client.close();
}); */


/* 
const mongoose = require('mongoose');
const uri = "mongodb://dbAdmin:Iw6v3X2BaQ6pUyXR@ac-ksfv6wp-shard-00-00.k1pmhlq.mongodb.net:27017,ac-ksfv6wp-shard-00-01.k1pmhlq.mongodb.net:27017,ac-ksfv6wp-shard-00-02.k1pmhlq.mongodb.net:27017/?ssl=true&replicaSet=atlas-f6zght-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.set('strictQuery', true)
mongoose.connect(
    uri,
    {
        useNewUrlParser: true
    }
)
.then(e => console.log('MongoDB Ready!'))
.catch(console.error)

//require('./create')
//require('./query')
//require('./delete')
require('./update')
require('./query') */