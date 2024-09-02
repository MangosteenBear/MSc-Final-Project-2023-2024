const express = require('express');  // 导入 express 模块
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path');       // 导入 path 模块
const app = express();              // 创建 express 应用实例
const port = 3001;


// 使用 cors 中间件
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

const checkPythonVersionCommand = 'python --version || python3 --version';
const installPythonCommand = 'curl -O https://www.python.org/ftp/python/3.10.12/python-3.10.12-amd64.exe && python-3.10.12-amd64.exe /quiet InstallAllUsers=1 PrependPath=1';
const installGraphRAGCommand = 'pip install graphrag';
const targetDirectory = path.resolve(__dirname, 'F:\\MyFinalProject\\project\\graphrag');  // 设置你的 GraphRAG 目录

app.post('/run-query', (req, res) => {
    const userQuery = req.body.query;
    const method = req.body.method;

    console.log('Received request:', { userQuery, method });

    if (!userQuery || !method) {
        console.error('Query or method not provided');
        return res.status(400).send('Query or method not provided');
    }

    // 检查 Python 是否已安装
    exec(checkPythonVersionCommand, (error, stdout, stderr) => {
        if (error) {
            console.log('Python is not installed or not found, attempting to install...');
            // 如果 Python 没有安装或版本不符合要求，下载安装 Python
            exec(installPythonCommand, (installError, installStdout, installStderr) => {
                if (installError) {
                    console.error(`Error installing Python: ${installStderr}`);
                    return res.status(500).send('Error installing Python');
                }
                console.log('Python installed successfully.');

                // 安装 GraphRAG
                installGraphRAG();
            });
        } else {
            console.log('Python is installed.');
            // 确保安装 GraphRAG
            installGraphRAG();
        }
    });

    function installGraphRAG() {
        exec(installGraphRAGCommand, { cwd: targetDirectory }, (installError, installStdout, installStderr) => {
            if (installError) {
                console.error(`Error installing GraphRAG: ${installStderr}`);
                return res.status(500).send('Error installing GraphRAG');
            }
            console.log('GraphRAG installed successfully.');

            // 执行查询
            runQuery();
        });
    }

    function runQuery() {
        let command;
        if (method === 'global') {
            command = `python -m graphrag.query --root ./ragtest --method global "${userQuery}"`;
        } else if (method === 'local') {
            command = `python -m graphrag.query --root ./ragtest --method local "${userQuery}"`;
        } else {
            console.error('Invalid method');
            return res.status(400).send('Invalid method');
        }

        console.log(`Executing command: ${command} in ${targetDirectory}`);

        exec(command, { cwd: targetDirectory }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${stderr}`);
                return res.status(500).send(`Error executing command: ${stderr}`);
            }
            if (stderr){
                console.error('Command stderr:', stderr);
                return res.status(500).json({ error: 'Command error' });
            }
            console.log(`Command output: ${stdout}`);
            //console.log('Debug stdout:', stdout);
            //console.log('Type of stdout:', typeof stdout);
            //console.log('Is stdout a Buffer?', Buffer.isBuffer(stdout));
            const stdoutString = stdout.toString()
            const match = stdoutString.match(/SUCCESS:([\s\S]*)$/);
            const responseTXT = match ? match[1].trim() : "No successful output found";
            res.json({ answer: responseTXT })
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
