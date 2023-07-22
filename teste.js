

async function finalizarDia(){
    
    const req = await fetch('http://localhost:3000/pedido');

    const data = await req.json();

    pedidos = data;

    let totalBrutoNoDia = 0
    let totalMotoqueiro = 20

    for (let index in pedidos){

        let remover = pedidos[index].total.replace('R$', '')
        let remover1 = pedidos[index].taxa.replace('R$', '')

        let totalFormatado = parseFloat(remover)
        let totalFormatado1 = parseFloat(remover1)

       totalBrutoNoDia += totalFormatado
       totalMotoqueiro += totalFormatado1


    }

    let totalLiquido = totalBrutoNoDia - totalMotoqueiro

    console.log(totalBrutoNoDia)
    console.log(totalMotoqueiro)
    console.log(totalLiquido)

}

getPedidos()