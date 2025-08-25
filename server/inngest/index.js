import { Inngest } from "inngest";
import { User } from "../models/user.model.js";

// we are getting user events from clerk webhooks 
// Create a client to send and receive events
export const inngest = new Inngest({ id: "PIXEO" });


// ingest funtion to save user data to the database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    const {id, first_name, last_name, email_addresses, image_url} = event.data;
    let username = email_addresses[0].email_address.split("@")[0];

    // check awailibity of username in the database
    const user = await User.findOne({ username });

    if(user) {
        username = username + Math.floor(Math.random() * 1000);
    }
    const userData = {
        _id : id,
        full_name : first_name + " " + last_name,
        email : email_addresses[0].email_address,
        username,
        profile_image : image_url,
    }
    await User.create(userData);
    
  },
);

// ingest funtion to update user data in the database 
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event, step }) => {
    const {id, first_name, last_name, email_addresses, image_url} = event.data;
    
    const updateUserData = {
        full_name : first_name + " " + last_name,
        email : email_addresses[0].email_address,
        profile_image : image_url,
    }
    await User.findByIdAndUpdate(id, updateUserData);
    
  },
);

//inngest duntion to delete user from database 
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {

    const {id} = event.data;
    await User.findByIdAndDelete(id);
  },
);


// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion
];