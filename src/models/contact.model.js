import { Schema, model } from "mongoose";

const contactSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },

        name: { type: String, required: true },
    
        phoneNumber: { type: String, required: true },
    
        email: String,

        photo: String,
    
        isFavourite: { type: Boolean, default: false },
    
        contactType: {
            type: String,
            enum: ['work', 'home', 'personal'],
            required: true,
            default: 'personal',
        },
    },
    
    { timestamps: true },
);

const Contact = model('Contact', contactSchema);

export default Contact;