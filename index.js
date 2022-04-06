const express = require("express");
const app = express();
const port = 4000;

// Test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server UP corriendo en http://localhost:${port}`);
});
