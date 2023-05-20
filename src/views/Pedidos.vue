<template>
  <div class="main-container">
    <h1>Gerencia Pedidos:</h1>
    <Dashboard/>
  </div>
</template>

<script>
import Dashboard from '../components/Dashboard.vue'
 
export default {
  name: "Pedidos",
  components: {
    Dashboard
  }
}

</script>
<style scoped>
.main-container h1{
  color: #8D6271;
}
</style>