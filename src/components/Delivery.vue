<template >
<div class="main">

  <div class="table">
    <thead>
      <tr>
        <th>Cidade/Bairro</th>
        <th>taxa</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="bairro in cidadeBairro" :key="bairro.id_cidadeBairro">
        <td>{{ bairro.nome }}</td>
        <td>R${{ bairro.Taxa }}</td>
      </tr>
    </tbody>
  </div>
    <div class="input-container">
      <button id="add-products">Alterar</button>
      <button id="add-products" @click="adicionar">Adicionar</button>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "delivery",
  data() {
    return {
      cidadeBairro: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:3001/cidadebairro");
      this.cidadeBairro = response.data;
    } catch (erro) {
    }
  },
};
</script>

<style scoped>
.table {
  width: 300px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
  overflow: auto;
}
.table::-webkit-scrollbar {
  width: 5px;
}

.table::-webkit-scrollbar-thumb {
  background-color: #0000005c;
  border-radius: 6px;
}

.table::-webkit-scrollbar-track {
  background-color: transparent;
}
.table th {
  background-color: #f5f5f5;
  position: sticky;
  top: 0;
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