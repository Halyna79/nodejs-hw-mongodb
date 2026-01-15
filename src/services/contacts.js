import Contact from "../models/contact.model.js";

export const getContacts = async () => {
    return await Contact.find();
};

export const findContactById = async (id) => {
    return await Contact.findById(id);
};

export const createContact = async (data) => {
    const newContact = await Contact.create(data);
    return newContact;
};

export const updateContactById = async (id, data) => {
    return await Contact.findByIdAndUpdate(id, data, { new: true });
};

export const deleteContactById = async (id) => {
    return await Contact.findByIdAndDelete(id);
};

export const updateStatusContact = async (id, data) => {
    return await Contact.findByIdAndUpdate(id, data, { new: true });
};