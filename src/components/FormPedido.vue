<template >
  <div id="topo">
    <Message :msg="msg" v-show="msg" />
    <div>
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
        </div>
        <div id="add-product" @click="adicionaProduto">
          <button id="add-product">Adicionar</button>
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
          >
            <option value="">Cidade/Bairro</option>
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
          <input type="submit" class="submit-btn" value="Enviar Pedido" @click="enviarPedido"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";

export default {
  name: "FormPedido",
  data() {
    return {
      produtos: null,
      formaDepagamento: null,
      entrega: null,

      nome: null,
      produto: null,
      produtosSelecionados: [],
      forpagamento: null,
      cidadebairro: null,
      telefone: null,
      endereco: null,
      msg: null,
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
      const precoProduto = parseFloat(this.produto.preço.replace("R$", ""));
      const precoCidadeBairro = parseFloat(
      this.cidadebairro.preço.replace("R$", "")
      );

      const data = {
        nome: this.nome,
        produto: this.produtosSelecionados,
        preco: this.produto.preço,
        pagamento: this.forpagamento,
        cidade: this.cidadebairro.Bairro,
        taxa: this.cidadebairro.preço,
        total: precoProduto + precoCidadeBairro,
        telefone: this.telefone,
        endereco: this.endereco,
        status: "Solicitado",
      };

      const dataJson = JSON.stringify(data);

      const req = await fetch("http://localhost:3000/pedido", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: dataJson,
      });
      const res = await req.json();

      this.msg = `Pedido N° ${res.id} realizado com sucesso`;

      setTimeout(() => (this.msg = ""), 3000);

      this.nome = "";
      this.produto = "";
      this.forpagamento = "";
      this.cidadebairro = "";
      this.telefone = "";
      this.endereco = "";

      document.getElementById("topo").scrollIntoView({ behavior: "smooth" });
    },
    async adicionaProduto() {
      if (this.produto) {
        this.produtosSelecionados.push(this.produto.produto);
        console.log(this.produtosSelecionados);
      }
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
#form-pedido {
  max-width: 400px;
  margin: 0 auto;
}
.input-container {
  display: flex;
  flex-direction: column;
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
}
.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>