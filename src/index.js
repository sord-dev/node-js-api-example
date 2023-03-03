const express = require("express");
const app = express();

const apiRouter = require("./routes/apiRouter.js");
const authRouter = require("./routes/authRouter.js");

const logger = require("./helpers/loggingMiddleware.js");


app.use(express.json());
app.use(logger);

app.use("/auth", authRouter);
app.use(apiRouter);

app.listen(3000, () => {
  console.log("listening on port 3000.");
});
