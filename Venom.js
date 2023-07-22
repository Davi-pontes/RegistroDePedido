const venom = require('venom-bot')
let client = null

exports.Connect = async () =>{

  if(!client){
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
  else {
    return client
  }

}