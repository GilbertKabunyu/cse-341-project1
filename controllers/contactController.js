const Contact = require('../models/contact');

// Get all contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single contact by ID
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new contact
const createContact = async (req, res) => {
    const { name, lastName, email, favoriteColor, birthday } = req.body;

    const newContact = new Contact({
        name,
        lastName,
        email,
        favoriteColor,
        birthday
    });

    try {
        const savedContact = await newContact.save();
        res.status(201).json({ id: savedContact._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a contact
const updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};