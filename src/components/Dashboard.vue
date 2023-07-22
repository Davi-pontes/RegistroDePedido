<template>
  <div class="FD">
    <button id="btn-fd">Finalizar Dia</button>
  </div>
  <div id="pedido-table">
    <Message :msg="msg" v-show="msg" />
    <div>
      <div id="pedido-table-heading">
        <div class="order-id" id="id">#:</div>
        <div>Cliente:</div>
        <div>Telefone:</div>
        <div>Cidade/Birro:</div>
        <div>Endereço:</div>
        <div>Forma de pagamento:</div>
        <div>Total:</div>
        <div>Preço:</div>
        <div>Produto:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div id="pedido-table-rows">
      <div class="pedido-table-row" v-for="pedido in pedidos" :key="pedido.id">
        <div class="order-number">{{ pedido.id }}</div>
        <div>{{ pedido.nome }}</div>
        <div>{{ pedido.telefone }}</div>
        <div>{{ pedido.cidade }}</div>
        <div>{{ pedido.endereco }}</div>
        <div>{{ pedido.pagamento }}</div>
        <div>{{ pedido.total }}</div>
        <div>{{ pedido.preco }}</div>
        <div>{{ pedido.produto }}</div>
        <button class="delete-btn" @click="deletePedido(pedido.id)">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";

export default {
  name: "Dashboard",
  data() {
    return {
      pedidos: null,
      pedido_id: null,
      msg: null,
      totalBrutoNoDia: 0,
      totalMotoqueiro: 20,
      totalLiquido: 0,
    };
  },
  components: {
    Message,
  },
  methods: {
    async getPedidos() {
      const req = await fetch("http://localhost:3000/pedido");

      const data = await req.json();

      this.pedidos = data;
    },
    async deletePedido(id) {
      const req = await fetch(`http://localhost:3000/pedido/${id}`, {
        method: "DELETE",
      });

      const res = await req.json();

      this.msg = `Pedido removido com sucesso!`;

      setTimeout(() => (this.msg = ""), 3000);

      this.getPedidos();
    },
    async finalizarDia() {
      for (let index in this.pedidos) {
        let remover = this.pedidos[index].total.replace("R$", "");
        let remover1 = this.pedidos[index].taxa.replace("R$", "");

        let totalFormatado = parseFloat(remover);
        let totalFormatado1 = parseFloat(remover1);

        this.totalBrutoNoDia += totalFormatado;
        this.totalMotoqueiro += totalFormatado1;
      }

      this.totalLiquido = totalBrutoNoDia - totalMotoqueiro;
    },
  },
  mounted() {
    this.getPedidos();
  },
};
</script>

<style scoped>
#pedido-table {
  max-width: 1350px;
  margin: 0 auto;
}

#pedido-table-heading,
#pedido-table-rows,
.pedido-table-row {
  display: flex;
  flex-wrap: wrap;
}
#pedido-table-heading {
  font-weight: bold;
  color: #d37fa2;
  padding: 12px;
  border-bottom: 3px solid #d37fa2;
}

#pedido-table-heading div,
.pedido-table-row div {
  width: 10%;
}
.pedido-table-row {
  width: 100%;
  padding: 12px;
  color: #8d6271;
  border-bottom: 1px solid #ccc;
}
#pedido-table-heading .order-id,
.pedido-table-row .order-number {
  width: 5%;
}
select {
  padding: 12px 6px;
  margin-right: 12px;
}

.delete-btn {
  height: 40px;
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
.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
.FD {
  position: absolute;
  right: 20%;
  top: 20%;
}
#btn-fd {
    cursor: pointer;
  background-color: #fac1d9;
  color: #8d6271;
  font-weight: bold;
  border: 2px solid #8d6271;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
}
</style>