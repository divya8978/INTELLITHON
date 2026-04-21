import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

const uploadFile = async () => {
  if (!file) {
    alert("Select a file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setText(data.text);

  } catch (error) {
    console.error(error);
    alert("Backend connection failed");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>📄 Loan Document Scanner</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Analyze</button>

      <h3>Extracted Text:</h3>
      <pre>{text}</pre>
    </div>
  );
}

export default App;