import fs from "node:fs/promises";
import express from "express";

const app = express();

// Serve static files from the "images" directory
app.use(express.static("images"));

// Use built-in Express middleware to parse JSON payloads
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Allow CORS preflight requests
  }

  next();
});

// Route to get places data
app.get("/places", async (req, res) => {
  try {
    const fileContent = await fs.readFile("./data/places.json");
    const placesData = JSON.parse(fileContent);
    res.status(200).json({ places: placesData });
  } catch (error) {
    res.status(500).json({ message: "Failed to read places data." });
  }
});

// Route to get user places data
app.get("/user-places", async (req, res) => {
  try {
    const fileContent = await fs.readFile("./data/user-places.json");
    const places = JSON.parse(fileContent);
    res.status(200).json({ places });
  } catch (error) {
    res.status(500).json({ message: "Failed to read user places data." });
  }
});

// Route to update user places data
app.put("/user-places", async (req, res) => {
  try {
    const places = req.body.places;
    await fs.writeFile("./data/user-places.json", JSON.stringify(places));
    res.status(200).json({ message: "User places updated!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user places." });
  }
});

// 404 Not Found middleware
app.use((req, res) => {
  res.status(404).json({ message: "404 - Not Found" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
