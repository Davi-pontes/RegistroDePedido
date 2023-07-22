<template >
  <div class="Total-atualizado">
    <p class="total-text">
      R$
      {{ totalPed }}
    </p>
  </div>
  <div id="topo">
    <Message :msg="msg" v-show="msg" />
    <div class="pai">
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
            <option value="">Selecione o produto</option>
            <option
              v-for="produto in produtos"
              :key="produto.id"
              :value="produto"
            >
              {{ produto.produto }}
            </option>
          </select>
          <div id="input-container" @click.prevent="adicionaProduto">
            <button id="add-products">+</button>
          </div>
        </div>

        <div class="input-container">
          <label for="forpagamento">Forma de pagamento</label>
          <select name="forpagamento" id="forpagamento" v-model="forpagamento">
            <option value="">Selecione a forma de pagamento</option>
            <option
              v-for="forma in formaDepagamento"
              :key="forma.id"
              :value="forma.forma"
            >
              {{ forma.forma }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label for="cidade-bairro">Cidade/Bairro</label>
          <select
            name="cidade-bairro"
            id="cidade-bairro"
            v-model="cidadebairro"
            @change="adicionarTaxaAoTotal()"
          >
            <option>Cidade/Bairro</option>
            <option v-for="cidade in entrega" :key="cidade.id" :value="cidade">
              {{ cidade.Bairro }}
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
        <div v-for="produto in produtosSelecionados" :key="produto.id">
        <p> {{produto}} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";
import axios from "axios"

export default {

  name: "FormPedido",
  data() {
    return {
      produtos: null,
      formaDepagamento: null,
      entrega: null,

      nome: null,
      produtosSelecionados: [],
      preco: [],
      forpagamento: null,
      cidadebairro: null,
      telefone: null,
      endereco: null,
      msg: null,
      totalPed: 0,
      cidadeSelecionada: null,
      arrayTotal: [],
    };
  },
  methods: {
    async getProdutos() {
      const req = await fetch("http://localhost:3000/produtos");
      const data = await req.json();

      this.produtos = data;
    },
    async getStatus() {
      const req = await fetch("http://localhost:3000/status");
      const data = await req.json();
    },
    async getFormaDePagamento() {
      const req = await fetch("http://localhost:3000/FormaDePagamento");
      const data = await req.json();

      this.formaDepagamento = data;
    },
    async getEntrega() {
      const req = await fetch("http://localhost:3000/entrega");
      const data = await req.json();

      this.entrega = data;
    },
    async enviarPedido(e) {

      e.preventDefault();

      const precoCidadeBairro = parseFloat(
        this.cidadebairro.preço.replace("R$", "")
      );

      const somaReduce = this.preco.reduce((total, numero) => {
        const numeroLimpo = parseFloat(numero.replace("R$", ""));
        return total + numeroLimpo;
      }, 0);

      const totalPedido = "R$" + (somaReduce + precoCidadeBairro);

      const produtosFormatados = this.produtosSelecionados
        .join("\n")
        .replace(/"/g, "");
      const precosFormatados = this.preco.join("\n").replace(/"/g, "");

      const data = {
        nome: this.nome,
        produto: produtosFormatados,
        preco: precosFormatados,
        pagamento: this.forpagamento,
        cidade: this.cidadebairro.Bairro,
        taxa: this.cidadebairro.preço,
        total: totalPedido,
        telefone: this.telefone,
        endereco: this.endereco,
      };

      const dataJson = JSON.stringify(data);
      console.log(dataJson)

      axios.post('http://localhost:3000/pedido', dataJson)

      //const res = await req.json();

      //this.msg = `Pedido N° ${res.id} realizado com sucesso`;

      // setTimeout(() => (this.msg = ""), 3000);

      // this.nome = "";
      // this.produto = "";
      // this.forpagamento = "";
      // this.cidadebairro = "";
      // this.telefone = "";
      // this.endereco = "";
      // this.totalPed = "";

      // document.getElementById("topo").scrollIntoView({ behavior: "smooth" });
    },
    async adicionaProduto() {
      if (this.produto) {
        this.produtosSelecionados.push(this.produto.produto);
        this.preco.push(this.produto.preço);

        this.totalPed = this.preco.reduce((total, numero) => {
          const numeroLimpo = parseFloat(numero.replace("R$", ""));
          return total + numeroLimpo;
        }, 0);

        this.msg = `Produto adicionado com sucesso!`;

        setTimeout(() => (this.msg = ""), 1000);
        this.atualizarTotal();
      }
    },
    async atualizarTotal() {
      let teste = parseFloat(this.produto.preço.replace("R$", ""));
      this.arrayTotal.push(teste);
      this.totalPed = this.arrayTotal.reduce((total, number) => {
        return total + number;
      }, 0);
    },
    async adicionarTaxaAoTotal() {
      let tirarCifrao = parseFloat(this.cidadebairro.preço.replace("R$", ""));
      this.totalPed = this.totalPed + tirarCifrao;
    },
  },
  mounted() {
    this.getProdutos();
    this.getStatus();
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
  border: 2px solid #fac1d9;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
  margin-top: 19px;
}
.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
#add-products {
  background-color: #fac1d9;
  color: #8d6271;
  font-weight: bold;
  border: 2px solid #fac1d9;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
  margin-left: 30px;
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
  border: 1px solid black;

  float: right;
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
</style>