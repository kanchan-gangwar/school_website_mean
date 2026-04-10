const Event = require("../models/Event.Model");

exports.createEvent = async (req, res) => {
    try {
        let { title, 
          description, 
          shortDescription, 
          date, 
          location  } = req.body;
        if (!title || !description || !shortDescription || !date || !location  ) {
            return res
            .status(400)
            .json({status: "N", error: "All fields are required"})
        }
        const newEvent  = new Event({
          title, 
          description, 
          shortDescription, 
          date, 
          location  
        })
        await newEvent.save();
        res.status(200).json({status: "Y", message: "Event created successfully"})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        if (!events || events.length == 0) {
            res.status(404)
            .json({status: "N", message: "No event found"})
        } 
        res.status(200).json({status: "Y", message: "Success", data: events})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.deleteEvent = async (req, res) => {
    let id = req.params.id;
    try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            res.status(404)
            .json({status: "N", message: "No event found"})
        } 
        res.status(200).json({status: "Y", message: "Event deleted successfully"})
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}

exports.updateEvent = async (req, res) => {
    let id = req.params.id;
    try {
        let { title, 
          description, 
          shortDescription, 
          date, 
          location  } = req.body;
        if (!title || !description || !shortDescription || !date || !location  ) {
            return res
            .status(400)
            .json({status: "N", error: "All fields are required"})
        }
        const event = await Event.findById(id);
        if (!event) {
            res.status(404)
            .json({status: "N", message: "No event found"})
        } 
        let updatedEvent = await Event.findByIdAndUpdate(id, { title, 
          description, 
          shortDescription, 
          date, 
          location  }  )
        if (updatedEvent) {
            res.status(200).json({status: "Y", message: "Event updated successfully"})
        }
        
    }
    catch (error) {
        return res
            .status(500)
            .json({status: "N", error: "Internal server error: " + error})
    }
}