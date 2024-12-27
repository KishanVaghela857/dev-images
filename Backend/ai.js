const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

const genAI = new GoogleGenerativeAI("AIzaSyD1iPkVubL6ZwdQrwOzQOuswvAS4lwICYU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  console.log("Received Prompt:", prompt); // Log the prompt received from the frontend
  try {
    const result = await model.generateContent(prompt);
    console.log("Generated Response:", result.response.text()); // Log the AI's response
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating response:", error); // Log any errors
    res.status(500).json({ error: "Failed to generate response" });
  }
});


// Change the port to 5000 for compatibility with React
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

  
