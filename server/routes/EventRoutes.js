const router = require("express");
const app = router();
const Controller = require("../controller/EventController");
const { user } = require("../middleware/Authmiddleware")

app.get("/api/getallevents", Controller.getAllEvents);

app.get("/api/getuserevents", user, Controller.getUserEvent);

app.put("/api/editevent/:eventId", user, Controller.editEvent);

app.delete("/api/deleteevent/:eventId", user, Controller.deleteEvent);

app.post("/api/createevent", user, Controller.createEvent);

module.exports = app;
