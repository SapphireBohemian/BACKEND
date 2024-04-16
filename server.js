const https = require('https');
const app = require('./app');
const fs = require('fs');

const port = 3000;

const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
};

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
