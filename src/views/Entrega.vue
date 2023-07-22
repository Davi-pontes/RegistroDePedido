<template>
  
  <div class="main-container">
    <Delivery/>
  </div>
</template>

<script>
import Delivery from '../components/Delivery.vue'

export default{
  name:"entrega",
  components:{
    Delivery 
  }
}
</script>

<style scoped>
.main-container h1{
  color: #8D6271;
}
</style>
