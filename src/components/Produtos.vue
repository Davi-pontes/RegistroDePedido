<template >
  <div class="table">
    <thead>
      <tr>
        <th>Selecione</th>
        <th>Produtos</th>
        <th id="precoProd">Preço</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="editMode">
        <td></td>
      <td><input  id="produtonovo" type="text" v-model="novoProduto" placeholder="Produto"></td>
      <td><input id="preconovo" type="text" v-model="novoPreco" placeholder="Preço"></td>
      </tr>
      <tr v-for="produto in produtos" :key="produto.Produtos">  
        <td><input type="checkbox" v-model="selecionados" :value="produto" @change="checkBox"></td>
        <td>{{ produto.Produtos }}</td>
        <td>R${{ produto.Preço }}</td>
      </tr>
      
    </tbody>
  </div>
  <div class="input-container">
    <button id="add-products">Alterar</button>
    <button id="add-products" @click="adicionar">Adicionar</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "produto",

  data() {
    return {
      produtos: null,
      selecionados: [],
      editMode: false,
      produtoSelecionado: null,
      novoProduto: "",
      novoPreço: "",
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:3000/produto");
      this.produtos = response.data;
    } catch (erro) {
      console.log(erro);
    }
  },
  methods: {

    checkBox(){
      console.log(JSON.stringify(this.selecionados))
    },
    
    adicionar(){
      this.editMode = true;

    }
  }
};
</script>

<style>
.table {
  width: 400px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
  overflow: auto;
}
.input-container {
  display: flex;
  justify-content: center;
  width: 350px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}
#add-products {
    width: 130px;
    height: 30px;
  background-color: #fac1d9;
  color: #8d6271;
  font-weight: bold;
  border: 2px solid #fac1d9;
  padding: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.5s;
  margin-right: 20px;
}
#add-products:last-child {
  margin-right: 0; /* Remove a margem direita do último botão */
}
#add-products:hover {
  background-color: transparent;
  color: #222;
}
.table th {
  border-bottom: 2px solid black;
}
#produtonovo{
  width: 200px;
  font-size: 16px;
}
#preconovo {
  width: 50px;
  font-size: 16px;
}

</style>