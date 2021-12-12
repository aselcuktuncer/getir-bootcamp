const express = require("express");
const userRoutes = require("./routes/UserRoute");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use("*", (req, res) => {
  res.status(404).send("Error");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}..`);
});
