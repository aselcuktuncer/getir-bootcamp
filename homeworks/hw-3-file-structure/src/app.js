const express = require('express')
const config = require("./config");
const loaders = require("./loaders");
const {ContactRoutes, PhoneBookRoutes } = require("./routes");
const app = express()

config();
loaders();

app.use(express.json());

app.listen(process.env.APP_PORT, () => {
    console.log(`Application is running  on ${process.env.APP_PORT}`);
    app.use("/contacts", ContactRoutes);
    app.use("/phone-book", PhoneBookRoutes);
})