<template >
  <div id="topo">
    <Message :msg="msg" v-show="msg" />
    <div class="pai">
      <div class="Total-atualizado">
        <p v-if="!editar" class="total-text">
          R$
          {{ totalPed }}
        </p>
        <input v-else type="text" v-model="totalPed" class="total-input" />
        <button
          v-if="buttonAlterar"
          @click="alterarTotal"
          id="button-alterar-total"
        >
          Alterar Total
        </button>
      </div>

      <form id="form-pedido">
        <div class="input-container">
          <label for="nome">Nome do Cliente:</label>
          <input
            type="text"
            id="nome"
            v-model="nome"
            placeholder="Digite o nome do cliente"
          />
        </div>
        <div class="input-container">
          <label for="produto">Escolha o produto</label>
          <select name="produto" id="produto" v-model="produto">
            <option disabled>Selecione o produto</option>
            <option
              v-for="(produto, index) in produtos"
              :key="index"
              :value="produto"
            >
              {{ produto.Nome }}
            </option>
          </select>
          <div id="input-container" @click.prevent="adicionarProduto">
            <button id="add-products">+</button>
          </div>
        </div>

        <div class="input-container">
          <label for="forpagamento">Forma de pagamento</label>
          <select name="forpagamento" id="forpagamento" v-model="forpagamento">
            <option disabled>Selecione a forma de pagamento</option>
            <option
              v-for="forma in formaDepagamento"
              :key="forma.id_pagamento"
              :value="forma"
            >
              {{ forma.descricao }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label for="cidade-bairro">Cidade/Bairro</label>
          <select
            name="cidade-bairro"
            id="cidade-bairro"
            v-model="cidadebairro"
            @change="adicionarTaxalAoTotal()"
          >
            <option disabled>Cidade/Bairro</option>
            <option
              v-for="(cidade, index) in entrega"
              :key="index"
              :value="cidade"
            >
              {{ cidade.nome }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label for="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            v-model="telefone"
            placeholder="Digite o numero"
            autocomplete="off"
          />
        </div>
        <div class="input-container">
          <label for="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            v-model="endereco"
            placeholder="Digite o endereço"
            autocomplete="off"
          />
        </div>
        <div class="input-container">
          <input
            type="submit"
            class="submit-btn"
            value="Enviar Pedido"
            @click="enviarPedido"
          />
        </div>
      </form>
      <div class="produtos-adicionado">
        <div v-for="(produto, index) in produtosSelecionados" :key="index">
          <ul>
            {{
              produto.Nome
            }}
            R${{
              produto.preco
            }}
            <span
              class="produto-x"
              @click.prevent="removerProduto(index, produto.preco)"
              >X</span
            >
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";
import axios from "axios";

export default {
  name: "FormPedido",
  data() {
    return {
      produtos: null,
      formaDepagamento: null,
      entrega: null,
      editar: false,
      buttonAlterar: false,

      nome: null,
      produtosSelecionados: [],
      forpagamento: null,
      cidadebairro: null,
      telefone: null,
      endereco: null,
      msg: null,
      totalPed: 0,
      cidadeSelecionada: "",
    };
  },
  methods: {
    async getProdutos() {
      const req = await fetch("http://localhost:3001/produto");
      const data = await req.json();

      this.produtos = data;
    },
    async getFormaDePagamento() {
      const req = await fetch("http://localhost:3001/formapagamento");
      const data = await req.json();

      this.formaDepagamento = data;
    },
    async getEntrega() {
      const req = await fetch("http://localhost:3001/cidadebairro");
      const data = await req.json();

      this.entrega = data;
    },
    adicionarProduto() {
      if (this.produto) {
        this.buttonAlterar = true;
        this.produtosSelecionados.push(this.produto);

        this.totalPed += parseFloat(this.produto.preco);
      } else {
        this.msg = "Adicione um produto";
        setTimeout(() => (this.msg = null), 2000);
      }
    },
    adicionarTaxalAoTotal() {
      this.totalPed += parseFloat(this.cidadebairro.Taxa);
      console.log(this.cidadebairro);
    },
    removerProduto(index, preco) {
      this.produtosSelecionados.splice(index, 1);
      this.totalPed -= preco;
      if (this.produtosSelecionados.length == 0) {
        this.buttonAlterar = false;
      }
    },
    async enviarPedido() {
      const dados = {
        nome: this.nome,
        telefone: this.telefone,
        produtos: this.produtosSelecionados,
        formaDepagamento: this.forpagamento,
        cidadebairro: this.cidadebairro,
        endereco: this.endereco,
        total: this.totalPed,
      };
      await axios.post('http://localhost:3001/pedido', dados)

      this.nome = null
      this.telefone = null
      this.produtosSelecionados = []
      this.forpagamento = null
      this.cidadebairro = null
      this.endereco = null
      this.totalPed = 0
      this.produto = null
    },
  },
  mounted() {
    this.getProdutos();
    this.getFormaDePagamento();
    this.getEntrega();
  },
  components: {
    Message,
  },
};
</script>

<style scoped>
.pai {
  display: flex;
  flex-direction: column;
  margin-top: -20px;
}
#form-pedido {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
.input-container {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-bottom: 20px;
}
label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #8d6271;
  padding: 5px 10px;
  border-left: 4px solid #57e5fa;
}
input,
select {
  padding: 5px 10px;
  width: 300px;
  border: 1px solid #8d6271;
  color: #8d6271;
}
.submit-btn {
  background-color: #fac1d9;
  color: #8d6271;
  font-weight: bold;
  border-radius: 5px;
  border: 1px solid #fac1d9;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.5s;
}
.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
#add-products {
  background-color: #fac1d9;
  color: #8d6271;
  font-weight: bold;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #fac1d9;
  cursor: pointer;
  transition: 0.5s;
  float: right;
  width: 30px;
  margin-top: -30px;
}
#add-products:hover {
  background-color: transparent;
  color: #222;
}
.total {
  width: 40px;
  height: 70px;
  border: 2px solid #8d6271;
  z-index: 9999;
  float: left;
}
.Total-atualizado {
  width: 120px;
  height: 60px;
  align-content: center;
  margin: 0 auto;
}
.total-text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.produtos-adicionado {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  border: 1px solid #8d6271;
  border-radius: 10px;
  align-items: center;
}
.total-input {
  width: 80px;
}
#button-alterar-total {
  margin-top: 7px;
  width: 120px;
  height: 23px;
  background-color: #fac1d9;
  border-radius: 5px;
  border: 1px solid #fac1d9;
  color: #8d6271;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  transition: 0.5s;
}
#button-alterar-total:hover {
  background-color: transparent;
  color: #222;
}
.total-input {
  width: 120px;
  height: 23px;
  font-size: 14px;
}
.produto-x {
  color: red;
  cursor: pointer;
}
.produto-x:hover {
  border-radius: 3px;
  background-color: #8d6271;
  transition: 0.2s;
}
</style>