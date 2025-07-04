import createHttpError from "http-errors";
import { getContacts, findContactById, updateContactById, deleteContactById, createContact, updateStatusContact } from "../services/contacts.js";

export const getAllContacts = async (req, res) => {
    const contacts = await getContacts();
    res.status(200).json({
        status: 200,
        message: 'Successfully found contacts',
        data: contacts,
    });
};

export const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await findContactById(contactId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
    });
};

export const addContact = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        throw createHttpError(400, 'Missing required field');
    }
    const newContact = await createContact(req.body);
    res.status(201).json({
        status: 201,
        message: 'Contact successfully created',
        data: newContact,
    });
};

export const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await updateContactById(contactId, req.body);
    if (!updatedContact) {
        throw createHttpError(404, 'Contact not found');
    }
    res.status(200).json({
        status: 200,
        message: `Successfully updated contact with id ${contactId}`,
        data: updatedContact,
    });
};

export const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const deletedContact = await deleteContactById(contactId);
    if (!deletedContact) {
        throw createHttpError(404, 'Contact not found');
    }
    res.status(204).send();
};

export const updateStatus = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === 'underfined') {
        throw createHttpError(400, 'Missing required field "favorite"');
    }
    const updatedContact = await updateStatusContact(contactId, { favorite });
    if (!updatedContact) {
        throw createHttpError(404, 'Contact not found');
    }
    res.status(200).json({
        status: 200,
        message: `Successfully updated status for contact with id ${contactId}`,
        data: updatedContact,
    });
};