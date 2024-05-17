const express = require("express");
const routes = require("./config/routes/start");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

try {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
} catch (error) {
  console.error(`Failed to start server: ${error}`);
  process.exit(1);
}
