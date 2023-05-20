<template >
    <div id="nav">
        <router-link to='/' id="logo_url">
            <img :src="logo" :alt="alt" id="logo">
        </router-link>
        <router-link to="/">Home</router-link>
        <router-link to="/pedido">Pedidos</router-link>
    </div>

</template>
<script>
export default {
    name:"NavBar",
    props: ["logo", "alt"]
    
}
</script>

<style scoped>
#nav{
    background-color: #FAC1D9;
    border-bottom: 4px solid #fa9ac2;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

}
#nav #logo_url{
    margin: auto;
    margin-left: 0;
}
#logo{
    width: 40px;
    height: 40px;
}
#nav a{
    color: #8D6271;
    text-decoration: none;
    margin: 12px;
    transition: .5s;
}
#nav a:hover{
    color: #fff;
}


</style>