const Gallery = require("../models/Gallery.Model");

exports.createGallery = async (req, res) => {
    try {
        let { title, imagesUrl, date } = req.body;
        if (!title || !imagesUrl || !date ) {
            return res
            .status(400)
            .json({status: "N", error: "All fields are required"})
        }
        const newGallery  = new Gallery({
          title, 
          imagesUrl,
          date
        })
        await newGallery.save();
        res.status(200).json({status: "Y", message: "Gallery created successfully"})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.getGallerys = async (req, res) => {
    try {
        const gallerys = await Gallery.find();
        if (!gallerys || gallerys.length == 0) {
            res.status(404)
            .json({status: "N", message: "No event found"})
        } 
        res.status(200).json({status: "Y", message: "Success", data: gallerys})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.deleteGallery = async (req, res) => {
    let id = req.params.id;
    try {
        const gallery = await Gallery.findByIdAndDelete(id);
        if (!gallery) {
            res.status(404)
            .json({status: "N", message: "No event found"})
        } 
        res.status(200).json({status: "Y", message: "Gallery deleted successfully"})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.updateGallery = async (req, res) => {
    let id = req.params.id;
    try {
        let { title, 
          imagesUrl,
          date } = req.body;
        if (!title || !imagesUrl || !date) {
            return res
            .status(400)
            .json({status: "N", error: "All fields are required"})
        }
        const gallery = await Gallery.findById(id);
        if (!gallery) {
            res.status(404)
            .json({status: "N", message: "No gallery found"})
        } 
        let updatedGallery = await Gallery.findByIdAndUpdate(id, { title, 
          date, 
          imagesUrl}  )
        if (updatedGallery) {
            res.status(200).json({status: "Y", message: "Gallery updated successfully"})
        }
        
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}