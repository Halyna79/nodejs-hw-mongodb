import { Router } from 'express';
import { getContactById, getAllContacts, createContact, updateContact, deleteContact } from '../controllers/contacts.controller.js';


const router = Router();

router.get('/', getAllContacts);
router.get('/:contactId', getContactById);
router.post('/', createContact);
router.put('/:contactId', updateContact);
router.delete('/contactId', deleteContact);

export default router;