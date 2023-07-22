const express = require('express')
const app = express()
var XLSX = require('xlsx')
const bodyParser = require('body-parser')
const cors = require('cors')
const Index = require('./index')


app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


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
app.post('/pedido', async(req,res) =>{
  try {
    console.log(req.body)

      await Index.enviarMensagem(req.body)

      res.send('Mensagem enviada')
      
  } catch (error) {
    console.log(error)
      
  }

})

app.listen('3000', () => {
  console.log('Servidor rodando na porta 3000')
})



// async function getProdutos() {
  
//     const req = await fetch('http://localhost:3000/produtos');
//     const data = await req.json();
//     let produtos = [];
//     for (let i = 0; i < data.length; i++) {
//       produtos.push(data[i].produto);
//       produtos.push(data[i].preço);
//     }
  
//     const produtosFormatados = produtos.join(', ');
//     console.log(produtosFormatados);
  
//   }

  

// getProdutos()
