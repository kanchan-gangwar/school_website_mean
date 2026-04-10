const Teacher = require("../models/Teacher.Model");

exports.createTeacher = async (req, res) => {
    try {
        let { name, subject, designation, bio, image  } = req.body;
        if ( !name || !subject || !designation || !bio || !image ) {
            return res
            .status(400)
            .json({status: "N", error: "All fields are required"})
        }
        const newTeacher  = new Teacher({
          name, subject, designation, bio, image 
        })
        await newTeacher.save();
        res.status(200).json({status: "Y", message: "Teacher created successfully"})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        if (!teachers || teachers.length == 0) {
            res.status(404)
            .json({status: "N", message: "No teacher found"})
        } 
        res.status(200).json({status: "Y", message: "Success", data: teachers})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.deleteTeacher = async (req, res) => {
    let id = req.params.id;
    try {
        const teacher = await Teacher.findByIdAndDelete(id);
        if (!teacher) {
            res.status(404)
            .json({status: "N", message: "No teacher found"})
        } 
        res.status(200).json({status: "Y", message: "Teacher deleted successfully"})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.updateTeacher = async (req, res) => {
    let id = req.params.id;
    try {
        let { name, subject, designation, bio, image } = req.body;
        if (!name || !subject || !designation || !bio || !image) {
            return res
            .status(400)
            .json({status: "N", error: "All fields are required"})
        }
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            res.status(404)
            .json({status: "N", message: "No teacher found"})
        } 
        let updatedTeacher = await Teacher.findByIdAndUpdate(id, { name, subject, designation, bio, image }  )
        if (updatedTeacher) {
            res.status(200).json({status: "Y", message: "Teacher updated successfully"})
        }
        
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}