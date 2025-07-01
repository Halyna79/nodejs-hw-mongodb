import { Router } from 'express';
import { getContactById, getAllContacts } from '../controllers/contacts.controller.js';


const router = Router();

router.get('/', getAllContacts);
router.get('/:contactId', getContactById);

export default router;