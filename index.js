const express = require('express');
const { exec } = require('child_process');
const { spawn } = require('child_process');
const app = express();

app.use(express.json());

// app.post('/run-model', (req, res) => {
//   const inputData = req.body.input_string;
//   const pythonProcess = spawn('python3', ['predict.py', inputData]);
  
//   let output = '';
//   let errorOutput = '';

//   pythonProcess.stdout.on('data', (data) => {
//     output += data.toString();
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     errorOutput += data.toString();
//   });

//   pythonProcess.on('close', (code) => {
//     if (code === 0) {
//       res.json({ result: output.trim() });
//     } else {
//       res.status(500).json({ error: errorOutput.trim() || 'An error occurred' });
//     }
//   });
// });

app.post('/run-model', (req, res) => {
  const inputData = JSON.stringify(req.body);
  
  const cogCommand = `cog predict -i '${inputData}'`;

  exec(cogCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'An error occurred while running the model' });
    }
    
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    
    try {
      const result = JSON.parse(stdout);
      res.json(result);
    } catch (parseError) {
      console.error(`Error parsing output: ${parseError}`);
      res.status(500).json({ error: 'Error parsing model output' });
    }
  });
});

app.listen(3000, () => console.log('Node.js server running on port 3000'));