import { getContacts, findContactById, addContact, updateContactById, deleteContactById } from "../services/contacts.js";

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
        return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
    });
};

export const createContact = async (req, res) => {
    try {
        const newContact = await addContact(req.body);
        res.status(201).json({
            status: 201,
            message: 'Contact successfully created',
            data: newContact,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateContact = async (req, res) => {
    const { contactId } = req.params;
    try {
        const updatedContact = await updateContactById(contactId, req.body);
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({
            status: 200,
            message: `Successfully updated contact with id ${contactId}`,
            data: updatedContact,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    try {
        const deletedContact = await deleteContactById(contactId);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({
            status: 200,
            message: `Successfully deleted contact with id ${contactId}`,
            data: deletedContact,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};