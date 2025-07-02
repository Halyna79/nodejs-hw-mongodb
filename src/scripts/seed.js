import { config } from "dotenv";
import mongoose from "mongoose";
import Contact from "../models/contact.model.js";
import fs from "fs/promises";

config();

const MONGODB_URL = process.env.MONGODB_URL;

const seed = async () => {
    try {
        await mongoose.connect(MONGODB_URL);

        const data = await fs.readFile('./contacts.json', 'utf-8');
        const contacts = JSON.parse(data);

        await Contact.insertMany(contacts);
        console.log('Contacts imported successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error importing contacts:', error.message);
        process.exit(1);
    }
};

seed();
