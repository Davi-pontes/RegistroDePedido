const pool = require('./Controller/functions/connection')
const axios = require('axios')
const data = [
    { id: 1, Bairro: 'Caetes I', preço: 'R$3.00' },
    { id: 2, Bairro: 'Caetes II', preço: 'R$2.00' },
    { id: 3, Bairro: 'Caetes III', preço: 'R$4.00' },
    { id: 4, Bairro: 'Caetes Velho', preço: 'R$4.00' },
    { id: 5, Bairro: 'Timbó', preço: 'R$4.00' },
    { id: 6, Bairro: 'Abreu centro', preço: 'R$5.00' },
    { id: 7, Bairro: 'Fosfato', preço: 'R$6.00' },
    { id: 8, Bairro: 'Cruz de Rebouças', preço: 'R$8.00' },
    { id: 9, Bairro: 'Igarassu', preço: 'R$10.00' },
    { id: 10, Bairro: 'Arthur Lundreg II', preço: 'R$7.00' },
    { id: 11, Bairro: 'Paratibe', preço: 'R$7.00' },
    { id: 12, Bairro: 'Matinha', preço: 'R$6.00' },
    { id: 13, Bairro: 'Paulista centro', preço: 'R$9.00' },
    { id: 14, Bairro: 'Arthur Lundreg I', preço: 'R$9.00' },
    { id: 15, Bairro: 'Maranguape', preço: 'R$12.00' },
    { id: 16, Bairro: 'Torres galvão', preço: 'R$12.00' },
    { id: 17, Bairro: 'Planalto', preço: 'R$5.00' },
    { id: 18, Bairro: 'Desterro', preço: 'R$6.00' },
    { id: 19, Bairro: 'Alto são miguel', preço: 'R$6.00' },
    { id: 20, Bairro: 'Jardim Paulista Baixo', preço: 'R$9.00' }
  ]





async function getData(){
    axios.get('http://localhost:3000/entrega').then((response) => {
        console.log(response.data)
    })

}

async function setProductsDB(data) {
    const dateCurrent = data.map((it) => {
        return {
            nome: it.Bairro.toUpperCase(),
            preco: parseFloat(it.preço.replace(/^R\$/, ''))
        }
    })

    const connection = await pool.getConnection()
    try {
        for (let i = 0; i < dateCurrent.length; i++) {
            let nome = dateCurrent[i].nome

            let preco = dateCurrent[i].preco

            await connection.query('INSERT INTO cidadebairro (nome,taxa) VALUES (?,?)',
                [nome, preco,])

            console.log(nome, preco)
        }
        await connection.query('COMMIT')

    } catch (error) {
        console.log(error)

    } finally {
        connection.release()
    }

}
setProductsDB(data)