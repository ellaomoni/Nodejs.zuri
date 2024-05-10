const http = require('http');
const os = require('os');

// Function to simulate asynchronous operation with a random delay
function asyncOperation(callback) {
    const delay = Math.random() * 1000; // Random delay up to 1 second
    setTimeout(callback, delay);
}

// Create HTTP server
const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Respond to preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle GET request
    if (req.method === 'GET' && req.url === '/info') {
        asyncOperation(() => {
            // Get CPU and OS information
            const cpuInfo = os.cpus();
            const osInfo = {
                platform: os.platform(),
                arch: os.arch(),
                release: os.release(),
                totalMemory: os.totalmem(),
                freeMemory: os.freemem()
            };

            // Send response
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ cpuInfo, osInfo }));
        });
    } else {
        // Handle invalid requests
        res.writeHead(404);
        res.end('Not Found');
    }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
