const venom = require('venom-bot')

exports.Connect = async () =>{
 
    try {
      client = await venom.create({
        session: 'Jhenifer' 
      })
      console.log('Cliente do Venom Bot conectado');
      return client;
    } 
    catch (error) {
      console.log(error);
      throw error 
    }

}