const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const venom = require('../Venom.js')
const allProducts = require('./functions/Products.js')
const cidadeBairro = require('./functions/CidadeBairro.js')
const Pagamento = require('./functions/FormasDePagamento.js')
const Pedido = require('./functions/Pedido.js')
const Cliente = require('./functions/Cliente.js')


app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let client

// (async () => {
//   try {
//     client = await venom.Connect()
//     console.log('Cliente do Venom Bot conectado')

//     // client.onMessage((msg) => {
//     //   console.log(msg);
//     // })
//   } catch (error) {
//     console.log('Erro ao conectar o cliente', error)
//   }
// })()
app.get('/cliente', async(req,res) => {
  try {
    const telefone = '81986933177'
    const dadosUsuario = await Cliente.pegarDadosDoCliente(telefone)

    res.status(200).json(dadosUsuario)
    
  } catch (error) {
    res.status(500).send('Erro ao processar solicitação')
  }
})

//Pegar todos os produtos cadastrado
app.get('/produto', async (req, res) => {
  try {
    const products = await allProducts.allProducts()

    res.status(200).json(products)

  } catch (error) {
    res.status(500).send('Erro ao processar solicitação')
  }
})
app.get('/cidadebairro', async (req,res) => {
  try {
    const cidadebairro = await cidadeBairro.getCidadeBairro()

    res.status(200).json(cidadebairro)
    
  } catch (error) {
    res.status(500).send('Erro ao processar solicitação')
  }
})
app.get('/formapagamento', async(req,res) => {
  try {
    const formasDePagamentos = await Pagamento.formasDePagamentos()

    res.status(200).json(formasDePagamentos)
    
  } catch (error) {
    res.status(500).send('Erro ao processar solicitação')
  }
})
app.post('/pedido', async (req,res) => {
  try {
    const resultado = await Pedido.AdicionarProduto(req.body)

    res.status(200).send(resultado)
    
  } catch (error) {
    res.status(500).send('Erro ao processar solicitação')
  }
})
app.post('/produto', async(req,res) => {
  try {
    const dados = req.body
    await allProducts.inserirProdutos(dados.produto,dados.preco,dados.disponibilidade)

    res.status(200).send('Adicionado com sucesso')
    
  } catch (error) {
    res.status(500).send('Erro ao processar solicitação')
  }
})
app.put('/produto', async(req,res) => {
  try {
    const data = req.body
    await allProducts.alterarProduto(data)

    res.status(200).send("Alterado com sucesso")
  } catch (error) {
    res.status(500).send('Erro ao processar solicitação')
  }
})
app.delete('/produto/:idProduto', async (req,res) => {
  try {
    const idProduto = req.params.idProduto;

    await allProducts.deletarProduto(idProduto)

    res.status(200).send('Produto deletado com sucesso')
    
  } catch (error) {
    console.log(error)
    res.status(500).send('Erro ao processar solicitação')
  }
})
app.listen('3001', () => {
  console.log('Servidor rodando na porta 3001')
})