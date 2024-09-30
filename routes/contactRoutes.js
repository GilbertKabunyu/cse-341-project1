const express = require('express');
const {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contactController');

const router = express.Router();

router.get('/hello', (req, res) => {
    res.json({ message: 'Hello World' });
});

router.get('/', getContacts); // Get all contacts
router.get('/:id', getContactById); // Get a single contact by ID
router.post('/', createContact); // Create a new contact
router.put('/:id', updateContact); // Update a contact
router.delete('/:id', deleteContact); // Delete a contact

module.exports = router;