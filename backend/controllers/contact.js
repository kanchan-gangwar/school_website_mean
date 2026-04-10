const Contact = require("../models/Contact.Model");

exports.createContact = async (req, res) => {
    try {
        let { name, email, phone, subject, message } = req.body;
        if (!name || !email || !phone || !subject || !message ) {
            return res
            .status(400)
            .json({status: "N", error: "All fields are required"})
        }
        const newContact  = new Contact({
          name, 
          email, 
          phone, 
          subject, 
          message  
        })
        await newContact.save();
        res.status(200).json({status: "Y", message: "Thank you! We will contact you ASAP"})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length == 0) {
            res.status(404)
            .json({status: "N", message: "No contact found"})
        } 
        res.status(200).json({status: "Y", message: "Success", data: contacts})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.deleteContact = async (req, res) => {
    let id = req.params.id;
    try {
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            res.status(404)
            .json({status: "N", message: "No contact found"})
        } 
        res.status(200).json({status: "Y", message: "Contact deleted successfully"})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}