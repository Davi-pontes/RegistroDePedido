const express = require('express')
const app = express()
var XLSX = require('xlsx')
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    var workbook = XLSX.readFile('./BDjheniferdoce.xlsx');
    var sheet_name_list = workbook.SheetNames;
    res.send(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
})



async function getProdutos() {
    const req = await fetch('http://localhost:3000/produtos');
    const data = await req.json();
    let produtos = [];
    for (let i = 0; i < data.length; i++) {
      produtos.push(data[i].produto);
      produtos.push(data[i].preço);
    }
  
    const produtosFormatados = produtos.join(', ');
    console.log(produtosFormatados);
  
    // Adicionar dados à planilha
    // var workbook = XLSX.utils.book_new();
    // var worksheet = XLSX.utils.json_to_sheet(data);
    // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    // XLSX.writeFile(workbook, 'BDjheniferdoce.xlsx');
    // console.log('Produtos adicionados com sucesso!')
  }

  app.listen('3000', () => {
    console.log('Servidor rodando na porta 3000')
})

getProdutos()
