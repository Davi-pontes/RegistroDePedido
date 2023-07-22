const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Evento de conexão com o cliente
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  // Definir eventos de escuta para mensagens enviadas pelo cliente
  socket.on('mensagemCliente', (mensagem) => {
    console.log(`Mensagem do cliente (${socket.id}): ${mensagem}`);
    
    // Enviar uma mensagem de volta para o cliente (opcional)
    // socket.emit('mensagemServidor', 'Mensagem recebida pelo servidor');
  });
});

// Iniciar o servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor Socket.io rodando na porta ${PORT}`);
});
