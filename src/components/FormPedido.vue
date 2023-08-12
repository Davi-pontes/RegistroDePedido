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
        <button v-if="buttonAlterar" @click="alterarTotal" id="button-alterar-total">
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
          <p>{{ produto }}</p>
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
      preco: [],
      forpagamento: null,
      cidadebairro: null,
      telefone: '',
      endereco: null,
      msg: null,
      totalPed: 0,
      cidadeSelecionada: '',
      arrayTotal: [],
    };
  },
  methods: {
    alterarTotal() {
      if (!this.editar) {
        this.editar = !this.editar;
      } else if (this.editar) {
        this.totalPed = this.totalPed;
        this.editar = !this.editar;
      }
    },
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
        telefone: this.telefone,
        produto: produtosFormatados,
        preco: precosFormatados,
        pagamento: this.forpagamento,
        cidade: this.cidadebairro.Bairro,
        endereco: this.endereco,
        taxa: this.cidadebairro.preço,
        total: this.totalPed,
      };

      const res = await axios.post("http://localhost:3001/mensagem", data)

      if (res.data == "Pedido enviado com sucesso") {
        this.msg = `Pedido realizado com sucesso`;
        setTimeout(() => (this.msg = ""), 3000);

        location.reload()

      } else {

        this.msg = `Erro ao enviar pedido`;
        setTimeout(() => (this.msg = ""), 3000);
      }
    },
    async adicionaProduto() {
      if (this.produto) {
        this.buttonAlterar = true
        this.produtosSelecionados.push(this.produto.produto);
        this.preco.push(this.produto.preço);

        this.totalPed = this.preco.reduce((total, numero) => {
          const numeroLimpo = parseFloat(numero.replace("R$", ""));
          return total + numeroLimpo;
        }, 0);

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
</style>