// import { useDispatch, useSelector } from "react-redux";
// import { fetchTodos } from "./redux/slice/todo";
// import "./App.css";

// function App() {
//   const dispatch = useDispatch();
//   const state = useSelector((state) => state);

//   console.log("State", state);

//   if (state.todo.isLoading) {
//     return <h1>Loading....</h1>;
//   }

//   return (
//     <div className="App">
//       <button onClick={(e) => dispatch(fetchTodos())}>Fetch Todos</button>
//       {state.todo.data && state.todo.data.map((e) => <li>{e.title}</li>)}
//     </div>
//   );
// }

// export default App;
import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import './App.css';

function App() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result;
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Convert the image to grayscale
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg; // Set R, G, and B to the average (grayscale)
        }
        ctx.putImageData(imageData, 0, 0);

        // Set the imagePath to the canvas data URL
        setImagePath(canvas.toDataURL());
        setText(''); // Clear previous text when a new image is selected
        setConfidence(null); // Clear previous confidence when a new image is selected
        setProgress(0); // Reset progress
      };
    };

    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    setLoading(true);
    setProgress(0);

    Tesseract.recognize(
      imagePath,
      'eng',
      {
        logger: (m) => setProgress(Math.floor(m.progress * 100)), // Update progress
      }
    )
      .then((result) => {
        setText(result.data.text);
        setConfidence(result.data.confidence);
      })
      .catch((err) => {
        console.error('OCR Error:', err);
        setText('An error occurred during text extraction.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <main className="App-main">
        <h3>Uploaded Image (Grayscale)</h3>
        {imagePath && <img src={imagePath} className="App-image" alt="Uploaded preview" />}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <h3>Extracted Text</h3>
        <div className="text-box">
          <p>{text || 'No text extracted yet.'}</p>
        </div>

        {confidence !== null && (
          <div className="confidence-box">
            <p>Confidence Level: {confidence}%</p>
          </div>
        )}

        {loading && (
          <div className="progress-box">
            <p>Processing: {progress}%</p>
          </div>
        )}

        <input type="file" onChange={handleChange} />
        <button
          onClick={handleClick}
          style={{ height: 50 }}
          disabled={!imagePath || loading}
        >
          {loading ? 'Processing...' : 'Convert to Text'}
        </button>
      </main>
    </div>
  );
}

export default App;
