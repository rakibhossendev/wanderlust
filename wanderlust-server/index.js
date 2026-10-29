import express from "express"
import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import { createRemoteJWKSet, jwtVerify } from "jose";


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(`${process.env.MONGODB_URL}`);

export async function connectToMongoDb() {
    try {
        await client.connect();
        console.log("Mongodb connected successfully");
        return client
    } catch (error) {
        console.dir(error);
    }
}

const mongoClient = await connectToMongoDb();
const db = mongoClient.db("wanderlust");
const destinationCollection = db.collection("destination");
const bookingCollection = db.collection("bookings");

const verifyToken = async (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).send({ message: "Oops! You are unauthorized user." })
    }
    const token = authHeader.split(" ")[1];

    if(!token){
        return response.status(401).send({ message: "Oops! You are unauthorized user." })
    }

    try{
        const JWKS = createRemoteJWKSet(new URL("http://localhost:3000/api/auth/jwks"));
        const {payload} = await jwtVerify(token,JWKS);

        console.log(payload)
    }catch(error){
        console.log(error);
    }
    
    next();
}


app.post("/add-destination",verifyToken, async (request, response) => {
    console.log("API was called");
    const data = request.body;

    const result = await destinationCollection.insertOne(data);
    response.send(result);
})
app.post("/booking", async (request, response) => {
    const data = request.body;
    const result = bookingCollection.insertOne(data);

    response.send(result);

})

app.get("/all-destinations", async (request, response) => {
    const result = await destinationCollection.find().toArray();
    response.send(result);
})

app.get("/destination/:id", verifyToken, async (request, response) => {

    const { id } = request.params;
    const result = await destinationCollection.findOne({ _id: new ObjectId(id) });

    response.json(result);
})

app.get("/booking/:email", async (request, response) => {
    const { email } = request.params
    const result = await bookingCollection.find({ email: email }).toArray();

    response.send(result);
})

app.patch("/edit-destination/:id", async (request, response) => {
    const { id } = request.params;

    const data = request.body;
    const result = await destinationCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    )

    response.send(result)
})

app.delete("/delete-destination/:id", async (request, response) => {
    const { id } = request.params;

    const result = await destinationCollection.deleteOne({ _id: new ObjectId(id) });
    response.json(result);
})




app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
})