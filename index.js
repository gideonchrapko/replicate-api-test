// const express = require('express');
// const { spawn } = require('child_process');
// const app = express();

// app.use(express.json());

// app.post('/run-model', (req, res) => {
//   const inputData = req.body.input_string;
//   const pythonProcess = spawn('python3', ['predict.py', inputData]);
  
//   pythonProcess.stdout.on('data', (data) => {
//     res.write(data);
//   });

//   pythonProcess.on('close', (code) => {
//     res.end(`Python process exited with code ${code}`);
//   });
// });

// app.listen(3000, () => console.log('Node.js server running on port 3000'));
const express = require('express');
const { spawn } = require('child_process');
const app = express();

app.use(express.json());

app.post('/run-model', (req, res) => {
  const inputData = req.body.input_string;
  const pythonProcess = spawn('python3', ['predict.py', inputData]);
  
  let output = '';
  let errorOutput = '';

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.json({ result: output.trim() });
    } else {
      res.status(500).json({ error: errorOutput.trim() || 'An error occurred' });
    }
  });
});

app.listen(3000, () => console.log('Node.js server running on port 3000'));
