//const Conexao = require('./Venom')
const {io} = require('socket.io-client')

const socket = io();

// Evento para notificar quando a conexão for estabelecida
socket.on('connect', () => {
  console.log('Conectado ao servidor:', socket.id);

  // Enviar uma mensagem para o servidor
  socket.emit('mensagemCliente', 'Olá, servidor! Esta é uma mensagem do cliente.');
  
});



// exports.enviarMensagem = async (mensagem) => {
//     try {
//         const client = await Conexao.Connect()

//         const groupId = '120363156215157686@g.us'

//         await client.sendText(groupId,mensagem);

//     } catch (error) {
//         console.log(error);
//     }
// }