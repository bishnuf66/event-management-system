const {
    getAllEvents,
    editEvent,
    deleteEvent,
    createEvent,
    getUserEvent } = require("../services/manageEvents/EventService");

module.exports.getAllEvents = async (req, res) => {
    try {
        const result = await getAllEvents(req, res);

        if (result) {
            return res.status(200).json(result);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};


module.exports.createEvent = async (req, res) => {
    try {
        const result = await createEvent(req.body, req.email, res);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};

module.exports.editEvent = async (req, res) => {
    try {
        // console.log(req.body)
        const result = await editEvent(req.params.eventId, req.email, req.body, res);
        console.log(result);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};

module.exports.deleteEvent = async (req, res) => {
    try {
        const result = await deleteEvent(req.params.eventId, req.email, res);
        console.log(result);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

module.exports.getUserEvent = async (req, res) => {
    try {

        const result = await getUserEvent(req.email, res);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};
