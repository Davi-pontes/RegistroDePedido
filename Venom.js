const venom = require('venom-bot')
const express = require('express')
const app = express()

// app.listen(3002, () => {
//   console.log('Servidor venom rodando na porta 3002')
// })

exports.Connect = async () =>{
 
    try {
      client = await venom.create({
        session: 'Jhenifer doce' 
      })
      console.log('Cliente do Venom Bot conectado');
      return client;
    } 
    catch (error) {
      console.log(error);
      throw error 
    }

}