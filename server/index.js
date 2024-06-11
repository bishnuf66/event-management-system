const router = require("express");
const app = router();
const cors = require("cors");

app.use(router.json());
app.use(
    cors({
        origin: "*",
    })
);

const authRoute = require('./routes/AuthRoute')
const eventRoute = require('./routes/EventRoutes')

app.use([authRoute, eventRoute])
app.listen(8080, (err) => {
    if (err) {
        console.log("Server not started");
    }
    else {
        console.log("Server started at 8080")
    }
});
