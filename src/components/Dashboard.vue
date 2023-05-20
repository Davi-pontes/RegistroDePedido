<template>
    <div id="pedido-table">
        <Message :msg="msg" v-show="msg"/>
        <div>
            <div id="pedido-table-heading">
                <div class="order-id">#:</div>
                <div>Cliente:</div>
                <div>Produto:</div>
                <div>Preço:</div>
                <div>Forma de pagamento:</div>
                <div>Cidade/Birro:</div>
                <div>Taxa:</div>
                <div>Total:</div>
                <div>Telefone:</div>
                <div>Endereço:</div>
                <div>Ações:</div>
            </div>
        </div>
        <div id="pedido-table-rows">
            <div class="pedido-table-row" v-for="pedido in pedidos" :key="pedido.id">
                <div class="order-number">{{ pedido.id}}</div>
                <div>{{ pedido.nome}}</div>
                <div>{{pedido.produto}}</div>
                <div>{{pedido.preco}}</div>
                <div>{{pedido.pagamento}}</div>
                <div>{{pedido.cidade}}</div>
                <div>{{pedido.taxa}}</div>
                <div>{{pedido.total}}</div>
                <div>{{pedido.telefone}}</div>
                <div>{{pedido.endereco}}</div>
                <button class="delete-btn" @click="deletePedido(pedido.id)">Cancelar</button>
            </div>
        </div>

    </div>
</template>

<script>
import Message from './Message.vue'

export default {
    name: "Dashboard",
    data() {
        return {
             pedidos: null,
             pedido_id:null,
             msg: null
        }
    },
    components: {
        Message
    },
    methods:{
        async getPedidos(){
            const req = await fetch('http://localhost:3000/pedido');

            const data = await req.json();

            this.pedidos = data;
        },
        async deletePedido(id){
            const req = await fetch(`http://localhost:3000/pedido/${id}`,{
                method: "DELETE"
            })

            const res = await req.json()

            this.msg = `Pedido removido com sucesso!`

            setTimeout(() => this.msg = '', 3000)   

            this.getPedidos()

        }
    },
    mounted() {
        this.getPedidos();
        
    }
    
}
</script>

<style scoped>
#pedido-table{
    max-width: 1350px;
    margin: 0 auto;
}

#pedido-table-heading,
#pedido-table-rows,
.pedido-table-row{
    display: flex;
    flex-wrap: wrap;
}
#pedido-table-heading{
    font-weight: bold;
    color: #D37FA2;
    padding: 12px;
    border-bottom: 3px solid #D37FA2;
}

#pedido-table-heading div,
.pedido-table-row div{
    width: 10%;
}
.pedido-table-row{
    width: 100%;
    padding: 12px;
    color: #8D6271;
    border-bottom: 1px solid #CCC;
}
#pedido-table-heading .order-id,
.pedido-table-row .order-number{
    width: 5%;
}
select {
    padding: 12px 6px;
    margin-right: 12px;
}

.delete-btn{
    background-color: #FAC1D9;
    color: #8D6271;
    font-weight: bold;
    border: 2px solid #FAC1D9;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
}
.delete-btn:hover{
    background-color: transparent;
    color: #222;
}

</style>