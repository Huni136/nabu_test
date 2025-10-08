import express from "express";
import fs from "fs";
import cors from 'cors'
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  const data = fs.readFileSync("data.json");
  const s = JSON.parse(data);
  res.send(s);
});

app.post("/", (req, res) => {
  const body = req.body;
  console.log(body)
  if (!body) return;
  let objs = [];

  fs.readFile("data.json", (err, data) => {
    if (err) return;

    objs = JSON.parse(data);
    objs.push(body);
    fs.writeFileSync("data.json", JSON.stringify(objs));
  });

  // res.send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
