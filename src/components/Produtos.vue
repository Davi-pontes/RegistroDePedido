<template >
  <div class="main">
    <div class="table" ref="tabela">
      <thead>
        <tr>
          <th>Produtos</th>
          <th>Preço</th>
          <th>Disponibilidade</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="editMode" >
          <td>
            <input
              id="produtonovo"
              type="text"
              v-model="novoProduto"
              placeholder="Produto"
            />
          </td>
          <td>
            <input
              id="preconovo"
              type="number"
              v-model="novoPreco"
              placeholder="Preço"
            />
          </td>
          <td>
            <input
              id="disponibilidade"
              type="text"
              v-model="disponibilidade"
              placeholder="Disponibilidade"
            />
          </td>
        </tr>

        <tr v-for="produto in produtos" :key="produto.id_produto">
          <td>
            <template v-if="isEditing">
              <input
                v-model="produto.Nome"
                id="edit-nome"
                @change="guardar(produto)"
              />
            </template>
            <template v-else>
              {{ produto.Nome }}
            </template>
          </td>
          <td class="left-padding">
            <template v-if="isEditing">
              <input
                type="number"
                v-model="produto.preco"
                id="edit-preco"
                @change="guardar(produto)"
              />
            </template>
            <template v-else> R${{ produto.preco }} </template>
          </td>
          <td class="left-padding">
            {{ produto.disponibilidade }}
          </td>
          <td class="btn-rm" @click="removerProduto(produto.id_produto)">X</td>
        </tr>
      </tbody>
    </div>
    <div class="input-container">
      <button id="add-products" @click="toggleEditingMode">
        {{ textoBotaoAlterar }}
      </button>
      <button id="add-products" @click="adicionar">Adicionar</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "produto",

  data() {
    return {
      produtosAlterados: [],
      produtos: null,
      selecionados: [],
      editMode: false,
      isEditing: false,
      textoBotaoAlterar: "Alterar",
      novoProduto: "",
      novoPreco: "",
      disponibilidade: "Disponivel",
    };
  },
  async mounted() {
    this.carregarProdutos();
  },
  methods: {
    guardar(produto) {
      const index = this.produtosAlterados.findIndex(
        (item) => item.id_produto === produto.id_produto
      );

      if (index !== -1) {
        this.produtosAlterados.splice(index, 1);
      }
      this.produtosAlterados.push(produto);
    },
    async carregarProdutos() {
      try {
        const response = await axios.get("http://localhost:3001/produto");
        this.produtos = response.data;
      } catch (erro) {
        console.error(erro);
      }
    },
    async toggleEditingMode() {
      
      if (this.isEditing) {
        this.isEditing = false;
        this.textoBotaoAlterar = "Alterar";
        await axios.put(
          "http://localhost:3001/produto",
          this.produtosAlterados
        );
        this.carregarProdutos()
      } else if (this.isEditing && this.produtosAlterados.length == 0){
        this.isEditing = false;
        this.textoBotaoAlterar = "Alterar";
      }
      else {
        this.isEditing = true;
        this.textoBotaoAlterar = "Concluir";
      }
    },
    async adicionar() {
      try {
        if (this.editMode) {
          const precoComDuasCasasDecimais = parseFloat(this.novoPreco).toFixed(
            2
          );
          const nomeToUppercase = this.novoProduto.toUpperCase();
          const disponibilidadeToUppercase = this.disponibilidade.toUpperCase();

          const data = {
            produto: nomeToUppercase,
            preco: precoComDuasCasasDecimais,
            disponibilidade: disponibilidadeToUppercase,
          };

          await axios.post("http://localhost:3001/produto", data);
          this.novoProduto = "";
          this.novoPreco = "";
          this.editMode = false;

          this.carregarProdutos();
        } else {
          this.editMode = true;
          this.$refs.tabela.scrollTo(0, 0);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async removerProduto(idProduto) {
      try {
        await axios.delete(`http://localhost:3001/produto/${idProduto}`);

        this.produtos = this.produtos.filter(
          (produto) => produto.id_produto !== idProduto
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.table {
  width: 620px;
  height: 300px;
  overflow: auto;
  border-radius: 10px;
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

.left-padding {
  padding-left: 20px;
}
.btn-rm {
  padding-left: 10px;
  color: red;
  cursor: pointer;
  transition: 0.3s;
}
.btn-rm:hover {
  color: rgb(82, 25, 25);
}

.input-container {
  display: flex;
  justify-content: center;
  width: 350px;
  margin-top: 15px;
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

#add-products:hover {
  background-color: transparent;
  color: #222;
}
#produtonovo {
  height: 25px;
}
#preconovo {
  height: 25px;
  width: 80px;
}
#preconovo::-webkit-inner-spin-button,
#preconovo::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#edit-preco::-webkit-inner-spin-button,
#edit-preco::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#disponibilidade {
  height: 25px;
  width: 120px;
  padding-left: 5px;
  font-size: 16px;
}
#edit-nome {
  width: 380px;
}
#edit-preco {
  width: 60px;
}
</style>
