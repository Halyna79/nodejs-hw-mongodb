import Contact from "../models/contact.model.js";

export const getContacts = async () => {
    return await Contact.find();
};

export const findContactById = async (id) => {
    return await Contact.findById(id);
};