const router = require("express");
const app = router();
const Controller = require("../controller/AuthController");
const { user } = require("../middleware/Authmiddleware")

app.post("/api/register", Controller.Register);
app.post("/api/login", Controller.Login);
app.get("/api/profile", user, Controller.getUser);


module.exports = app;
