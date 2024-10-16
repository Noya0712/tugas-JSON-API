const axios = require("axios");
const xml = require("xml");

async function convert() {
  try {
    const response = await axios.get("http://localhost:3000/api/json/items");
    const items = response.data;

    const xmlItems = xml([
      {
        items: items.map((item) => ({
          item: [{ id: item.id }, { name: item.name }, { price: item.price }],
        })),
      },
    ]);

    console.log("Data dalam format XML:\n", xmlItems);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

convert();
