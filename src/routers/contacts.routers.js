import { Router } from 'express';
import { getContactById, getAllContacts, updateContact, deleteContact, addContact, updateStatus } from '../controllers/contacts.controller.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:contactId', ctrlWrapper(getContactById));
router.post('/', ctrlWrapper(addContact));
router.put('/:contactId', ctrlWrapper(updateContact));
router.delete('/:contactId', ctrlWrapper(deleteContact));
router.patch('/:contactId', ctrlWrapper(updateStatus));

export default router;