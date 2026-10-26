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
const bookingCollection = db.collection("bookings");

app.post("/add-destination",async (request,response) => {
    console.log("API was called");
    const data = request.body;

    const result = await destinationCollection.insertOne(data);
    response.send(result);
})
app.post("/booking",async (request,response) => {
    const data = request.body;
    const result = bookingCollection.insertOne(data);

    response.send(result);

})

app.get("/all-destinations",async(request,response) => {
    const result = await destinationCollection.find().toArray();
    response.send(result);
})

app.get("/destination/:id",async (request,response) => {
    const {id} = request.params;
    const result = await destinationCollection.findOne({_id: new ObjectId(id)});

    response.json(result);
})

app.get("/booking/:email",async (request,response) => {
    const {email} = request.params
    const result = await bookingCollection.find({email:email}).toArray();

    response.send(result);
})

app.patch("/edit-destination/:id",async (request,response) => {
    const {id} = request.params;

    const data = request.body;
    const result = await destinationCollection.updateOne(
        {_id: new ObjectId(id)},
        {$set: data}
    )

    response.send(result)
})

app.delete("/delete-destination/:id",async (request,response) => {
    const {id} = request.params;

    const result = await destinationCollection.deleteOne({_id: new ObjectId(id)});
    response.json(result);
})




app.listen(PORT,()=> { 
    console.log(`Express server running on port ${PORT}`);
})