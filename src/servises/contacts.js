import { SORT_ORDER } from "../constants/index.js";
import Contact from "../models/contact.model.js";

export const getContacts = async ({ page = 1, perPage = 10, sortBy = '_id', sortOrder = SORT_ORDER.ASC, filter = {} }) => {
    const skip = (page - 1) * perPage;
    const sortOptions = { [sortBy]: sortOrder === SORT_ORDER.DESC ? -1 : 1 };
    const contacts = await Contact
        .find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(perPage);
    return contacts;
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

export const countContacts = async (filter = {}) => {
    return await Contact.countDocuments(filter);
};