import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";


const client = new MongoClient(`${process.env.MONGODB_URL}`)
const db = client.db('wanderlust');

export const auth = betterAuth({
    database: mongodbAdapter(db,{client,}),
    emailAndPassword: {
        enabled: true
    },
    plugins: [jwt(),],

    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 7 * 24 * 60 * 60
        },
    }
})

