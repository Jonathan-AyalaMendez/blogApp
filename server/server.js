const express = require("express");
const cors = require("cors");
const records = require("./routes/record.js");
const fun = require("./db/conn.js");

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use(records);

fun.con().then((res) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
})