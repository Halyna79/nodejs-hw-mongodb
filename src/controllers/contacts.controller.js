import createHttpError from "http-errors";
import {
    getContacts,
    findContactById,
    updateContactById,
    deleteContactById,
    createContact,
    updateStatusContact
} from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseQueryParams } from "../utils/parseFilterParams.js";

export const getAllContacts = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseQueryParams(req.query);
    
    const contacts = await getContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
    });
    const responseBody = {
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    };
    res.status(200).json(responseBody);
};

export const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await findContactById(contactId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }
    const responseBody = {
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      };
    
      res.status(200).json(responseBody);
};

export const addContact = async (req, res) => {
    const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
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