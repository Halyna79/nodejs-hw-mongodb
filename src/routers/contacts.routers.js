import { Router } from 'express';
import { getContactById, getAllContacts, updateContact, deleteContact, addContact, updateStatus } from '../controllers/contacts.controller.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/valideteBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { validateId } from '../middlewares/validateId.js';
import { updateStatusContact } from '../services/contacts.js';

const router = Router();

router('/contacts')
    .get(ctrlWrapper(getAllContacts))
    .post(
        validateBody(createContactSchema),
        ctrlWrapper(addContact),
    );



router('/contacts/:contactId')
    .get(ctrlWrapper(getContactById))
    .put(ctrlWrapper(updateContact))
    .delete(validateId, ctrlWrapper(deleteContact))
    .patch(
        validateId,
        validateBody(updateStatusContact),
        ctrlWrapper(updateStatus),
    );

export default router;