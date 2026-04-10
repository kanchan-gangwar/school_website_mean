const Notice = require("../models/Notice.Model");

exports.createNotice = async (req, res) => {
    try {
        let { title, description, date, category } = req.body;
        if (!title || !description || !category || !date ) {
            return res
            .status(400)
            .json({status: "N", error: "All fields are required"})
        }
        const newNotice  = new Notice({
          title, description, date, category
        })
        await newNotice.save();
        res.status(200).json({status: "Y", message: "Notice created successfully"})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.getNotices = async (req, res) => {
    try {
        const notices = await Notice.find();
        if (!notices || notices.length == 0) {
            res.status(404)
            .json({status: "N", message: "No notice found"})
        } 
        res.status(200).json({status: "Y", message: "Success", data: notices})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.deleteNotice = async (req, res) => {
    let id = req.params.id;
    try {
        const notice = await Notice.findByIdAndDelete(id);
        if (!notice) {
            res.status(404)
            .json({status: "N", message: "No notice found"})
        } 
        res.status(200).json({status: "Y", message: "Notice deleted successfully"})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.updateNotice = async (req, res) => {
    let id = req.params.id;
    try {
        let { title, description, date, category } = req.body;
        if (!title || !description || !category || !date) {
            return res
            .status(400)
            .json({status: "N", error: "All fields are required"})
        }
        const notice = await Notice.findById(id);
        if (!notice) {
            res.status(404)
            .json({status: "N", message: "No notice found"})
        } 
        let updatedNotice = await Notice.findByIdAndUpdate(id, { title, description, date, category }  )
        if (updatedNotice) {
            res.status(200).json({status: "Y", message: "Notice updated successfully"})
        }
        
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}