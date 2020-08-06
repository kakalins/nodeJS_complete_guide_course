const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Olá!');
        res.end();
    }

    if (req.url === '/api/') {
        res.write(JSON.stringify({ 'nome': 'Ricardo' }));
        res.end();
    }
});

// server.on('connection', (socket) => {
//     console.log('Nova conexão...');
// });

server.listen(3000);

console.log('Escutando a porta 3000...');