<template>
  <div class="main-container">
    <h1>Monte o pedido</h1>
    <FormPedido/>
  </div>
</template>

<script>
import FormPedido from '../components/FormPedido.vue'

export default{
  name:"Home",
  components:{
    FormPedido 
  }
}
</script>
<style scoped>
.main-container h1{
  color: #8D6271;
}
</style>
