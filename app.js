const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userroutes/userroutes");
const taskRoutes = require("./routes/taskroutes/taskroute");
const errorHandler = require("./middlewares/errorhandler");
const PORT = 9000;

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).send("home");
});

const connectWithRetry = () => {
  return mongoose
    .connect(
      "mongodb+srv://khanafroz1516:Afroz123%40@cluster01.if9tz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01"
    )
    .then(() => console.log("database connected successfully"))
    .catch((err) => {
      console.log("error connecting database retry in 5 seconds", err);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

app.listen(PORT, () => console.log("listening on port 9000"));
