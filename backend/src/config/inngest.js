import {Inngest} from "inngest";
import {connectDB} from "./db.js";
import {User} from "../models/user.model.js"


export const inngest = new Inngest({id: "slack-project"});


const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event:"cleark/user.created"},
    async ({event})=>{
        await connectDB();

        const {id,email_addresses,first_name,last_name,image_url} = event.data;

        const newUser = {
            clearkId :id,
            email: email_addresses[0]?.email_address || "",
            name: `${first_name || ""} ${last_name || ""}`,
            image: image_url,
        }
        await User.create(newUser);
    }
);

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-frm-db"},
    {event:"cleark/user.deleted"},
    async({event})=>{
        const {id} = event.data;
        await User.deleteOne({clearkId:id});
    }
)



export const functions = [syncUser, deleteUserFromDB];