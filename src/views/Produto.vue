<template>
  
  <div class="main-container">
    <Produtos/>
  </div>
</template>

<script>
import Produtos from '../components/Produtos.vue'

export default{
  name:"produto",
  components:{
    Produtos
    
  }
}
</script>
<style scoped>
.main-container h1{
  color: #8D6271;
}
</style>
