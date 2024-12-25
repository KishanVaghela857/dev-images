import React, { useState } from "react";
// import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/generate", { // Updated URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (response.ok) {
        setResponses([{ prompt, response: data.response }, ...responses]);
        setPrompt("");
      } else {
        alert(data.error || "Error generating response.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the server. Ensure the backend is running.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Content Generator</h1>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          disabled={loading}
        />
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
        <div className="response-container">
          {responses.map((item, index) => (
            <div key={index} className="response-item">
              <p>
                <strong>Prompt:</strong> {item.prompt}
              </p>
              <p style={{color: 'black'}}>
                <strong style={{color: 'black'}}>Response:</strong> {item.response}
              </p>
              <hr />
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
