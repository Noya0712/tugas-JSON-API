const express = require("express");
const bodyParser = require("body-parser");
const xml = require("xml");
const app = express();
app.use(bodyParser.json());

let items = [
  { id: 1, name: "Buku Pada Zaman Dahulu", price: 100.0 },
  { id: 2, name: "Siksa Neraka", price: 45.0 },
  { id: 3, name: "Jembatan Ilmu", price: 100.0 },
];

//mengembalikan daftar item ke json
app.get("/api/json/items", (req, res) => {
  res.json(items);
});

//menambahkan item baru ke json
app.post("/api/json/items", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// GET - Mengembalikan daftar item dalam format XML
app.get("/api/xml/items", (req, res) => {
  const xmlItems = xml([
    {
      items: items.map((item) => ({
        item: [{ id: item.id }, { name: item.name }, { price: item.price }],
      })),
    },
  ]);
  res.set("Content-Type", "application/xml");
  res.send(xmlItems);
});

const port = 3000;
app.listen(port, () => {
  console.log("Server running on port ${port}");
});
