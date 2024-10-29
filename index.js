const express = require('express');
const { spawn } = require('child_process');
const app = express();

app.use(express.json());

app.post('/run-model', (req, res) => {
  const inputData = req.body.input_string;
  const pythonProcess = spawn('python', ['predict.py', inputData]);
  
  pythonProcess.stdout.on('data', (data) => {
    res.write(data);
  });

  pythonProcess.on('close', (code) => {
    res.end(`Python process exited with code ${code}`);
  });
});

app.listen(3000, () => console.log('Node.js server running on port 3000'));