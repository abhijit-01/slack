import {Inngest} from "inngest";
import {connectDB} from "./db.js";
import {User} from "../models/user.model.js"
import {ENV} from "./env.js";


export const inngest = new Inngest({id: "slack-project"});
console.log("Signing Key:", process.env.INGEST_SIGNING_KEY);

console.log("ENV.NODE_ENV:", ENV.NODE_ENV);
console.log("INGEST_SIGNING_KEY length:", ENV.INGEST_SIGNING_KEY?.length);


const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event:"clerk/user.created"},
    async ({event})=>{
        await connectDB();

        const {id,email_addresses,first_name,last_name,image_url} = event.data;

        const newUser = {
            clerkId :id,
            email: email_addresses[0]?.email_address || "",
            name: `${first_name || ""} ${last_name || ""}`,
            image: image_url,
        }
        await User.create(newUser);
    }
);

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-frm-db"},
    {event:"clerk/user.deleted"},
    async({event})=>{
        const {id} = event.data;
        await User.deleteOne({clerkId:id});
    }
)



export const functions = [syncUser, deleteUserFromDB];