import express from "express"
import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(`${process.env.MONGODB_URL}`);

export async function connectToMongoDb(){
    try{
        await client.connect();
        console.log("Mongodb connected successfully");
        return client
    }catch(error){
        console.dir(error);
    }
}

const mongoClient = await connectToMongoDb();
const db = mongoClient.db("wanderlust");
const destinationCollection = db.collection("destination");
app.post("/add-destination",async (request,response) => {
    console.log("API was called");
    const data = request.body;

    const result = await destinationCollection.insertOne(data);
    response.send(result);
})
app.get("/all-destinations",async(request,response) => {
    const result = await destinationCollection.find().toArray();
    response.send(result);
})

app.get("/destination/:id",async (request,response) => {
    const {id} = request.params;
    const result = await destinationCollection.findOne({_id: new ObjectId(id)});

    response.send(result);

})

app.listen(PORT,()=> { 
    console.log(`Express server running on port ${PORT}`);
})