const express = require('express')
const app = express()
var XLSX = require('xlsx')
const bodyParser = require('body-parser')
const cors = require('cors')
const Index = require('./index')
const venom = require('./Venom.js')
const allProducts = require('./functions/getProducts')


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


app.get('/produto', (req, res) => {

    var workbook = XLSX.readFile('./Dados Jhenifer doce.xlsx');
    var sheet_name_list = workbook.SheetNames;

    const dados = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

    res.send(dados)
})

app.post('/produto', (req,res) =>{
  const {produto, preco} = req.body

   var workbook = XLSX.readFile('./Dados Jhenifer doce.xlsx');
    var sheetName = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[sheetName]

    const linhaVazia = XLSX.utils.sheet_add_json(worksheet, [{
      'Produto': produto, 'Preço': preco 
    }],{ skipHeader: true, origin: 'A' })

    XLSX.writeFile(workbook, './Dados Jhenifer doce.xlsx')

    res.status(200).send('Dados a dicionado a planilha')


})

app.post('/mensagem', async (req,res) =>{
  try {
    const dados = req.body
    console.log(dados)

    const dadosPreparar = {
      nome: dados.nome,
      telefone: dados.telefone,
      produto: dados.produto,
      cidade:dados.cidade,
      endereco:dados.endereco,
      pagamento:dados.pagamento,
      total:'R$'+dados.total
    }

    let dadosFormatadosPreparar = ''

    for (const index in dadosPreparar){
      dadosFormatadosPreparar += dadosPreparar[index] + '\n'
    }

    const dadosEntrega = {
      nome: dados.nome,
      telefone: dados.telefone,
      cidade:dados.cidade,
      endereco:dados.endereco,
      pagamento:dados.pagamento,
      total:'R$'+dados.total
    }

    let dadosFormatadoEntrega = ''

    for(const index in dadosEntrega){
      dadosFormatadoEntrega += dadosEntrega[index] + '\n'
    }

    await client.sendText('120363141230225936@g.us', dadosFormatadoEntrega)
    await client.sendText('120363156215157686@g.us', dadosFormatadosPreparar)
    console.log("mensagem enviada com sucesso")

    res.send("Pedido enviado com sucesso")
      
  } catch (error) {
    console.log(error)
      
  }

})
app.get('/teste', async (req,res) => {
  const teste = await allProducts()

  res.status(200).json(teste)

})
app.listen('3001', () => {
  console.log('Servidor rodando na porta 3001')
})