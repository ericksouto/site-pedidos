let carrinho = [];

function adicionarItem(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            nome,
            preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

function aumentarItem(nome) {
    const item = carrinho.find(item => item.nome === nome);

    if (item) {
        item.quantidade++;
    }

    atualizarCarrinho();
}

function diminuirItem(nome) {
    const item = carrinho.find(item => item.nome === nome);

    if (!item) return;

    item.quantidade--;

    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(item => item.nome !== nome);
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="itemCarrinho">
                <span>
                    ${item.nome} (${item.quantidade}x)
                </span>

                <div class="botoes">
                    <button onclick="diminuirItem('${item.nome}')">-</button>
                    <button onclick="aumentarItem('${item.nome}')">+</button>
                </div>
            </div>
        `;

        lista.appendChild(li);
    });

    totalElemento.textContent =
        total.toFixed(2).replace(".", ",");
}

function finalizarPedido() {
    const telefone = "5521994297139";
    
    const nome =
        document.getElementById("nomeCliente").value;

    const endereco =
        document.getElementById("enderecoCliente").value;

    const observacoes =
    document.getElementById("observacoes").value;

    if (carrinho.length === 0) {
        alert("Adicione itens ao carrinho.");
        return;
    }

    let total = 0;

    let mensagem =
        `Olá, gostaria de fazer um pedido:%0A%0A`;

    carrinho.forEach(item => {
        const subtotal =
            item.preco * item.quantidade;

        total += subtotal;

        mensagem +=
            `• ${item.nome} (${item.quantidade}x) - R$ ${subtotal.toFixed(2)}%0A`;
    });

    mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;
    mensagem += `%0ANome: ${nome}`;
    mensagem += `%0AEndereço: ${endereco}`;

    

    if (observacoes.trim() !== "") {
    mensagem += `%0AObservações: ${observacoes}`;
    }

    window.open(
        `https://wa.me/${telefone}?text=${mensagem}`,
        "_blank"
    );
}