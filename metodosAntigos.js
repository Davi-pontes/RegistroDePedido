
function alterarTotal() {
    if (!this.editar) {
        this.editar = !this.editar;
    } else if (this.editar) {
        this.totalPed = this.totalPed;
        this.editar = !this.editar;
    }
}
async function getProdutos() {
    const req = await fetch("http://localhost:3000/produtos");
    const data = await req.json();

    this.produtos = data;
}
async function getFormaDePagamento() {
    const req = await fetch("http://localhost:3001/formapagamento");
    const data = await req.json();

    this.formaDepagamento = data;
}
async function getEntrega() {
    const req = await fetch("http://localhost:3000/entrega");
    const data = await req.json();

    this.entrega = data;
}
async function enviarPedido(e) {
    e.preventDefault();

    const precoCidadeBairro = parseFloat(
        this.cidadebairro.preço.replace("R$", "")
    );

    const somaReduce = this.preco.reduce((total, numero) => {
        const numeroLimpo = parseFloat(numero.replace("R$", ""));
        return total + numeroLimpo;
    }, 0);

    const totalPedido = "R$" + (somaReduce + precoCidadeBairro);

    const produtosFormatados = this.produtosSelecionados
        .join("\n")
        .replace(/"/g, "");
    const precosFormatados = this.preco.join("\n").replace(/"/g, "");

    const data = {
        nome: this.nome,
        telefone: this.telefone,
        produto: produtosFormatados,
        preco: precosFormatados,
        pagamento: this.forpagamento,
        cidade: this.cidadebairro.Bairro,
        endereco: this.endereco,
        taxa: this.cidadebairro.preço,
        total: this.totalPed,
    };

    const res = await axios.post("http://localhost:3001/mensagem", data)

    if (res.data == "Pedido enviado com sucesso") {
        this.msg = `Pedido realizado com sucesso`;
        setTimeout(() => (this.msg = ""), 3000);

        location.reload()

    } else {

        this.msg = `Erro ao enviar pedido`;
        setTimeout(() => (this.msg = ""), 3000);
    }
}
async function adicionaProduto() {
    if (this.produto) {
        this.buttonAlterar = true
        this.produtosSelecionados.push(this.produto.produto);
        this.preco.push(this.produto.preço);

        this.totalPed = this.preco.reduce((total, numero) => {
            const numeroLimpo = parseFloat(numero.replace("R$", ""));
            return total + numeroLimpo;
        }, 0);

        this.atualizarTotal();
    }
}
async function atualizarTotal() {
    let teste = parseFloat(this.produto.preço.replace("R$", ""));
    this.arrayTotal.push(teste);
    this.totalPed = this.arrayTotal.reduce((total, number) => {
        return total + number;
    }, 0);
}
async function adicionarTaxaAoTotal() {
    let tirarCifrao = parseFloat(this.cidadebairro.preço.replace("R$", ""));
    this.totalPed = this.totalPed + tirarCifrao;
}