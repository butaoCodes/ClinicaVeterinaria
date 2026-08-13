// ========================================
// SCRIPT DE ADMINISTRAÇÃO - PAINEL DO ADMIN
// ========================================
// Este arquivo contém funções para gerenciar clientes (CRUD)
// Permite listar, buscar, criar, editar e deletar clientes

// ========================================
// FUNÇÃO: LISTAR TODOS OS CLIENTES
// ========================================
// Busca todos os clientes no servidor e exibe em uma lista HTML
async function listarclientes() {
    // Faz requisição GET ao servidor para obter todos os clientes
    const resposta = await fetch('http://localhost:3023/clientes');
    // Converte a resposta para formato JSON
    const clientes = await resposta.json();

    // Obtém o elemento HTML onde a lista será exibida
    const lista = document.getElementById('lista');
    // Limpa o conteúdo anterior
    lista.innerHTML =''

    // Percorre cada cliente e cria um item de lista com botões de edição e exclusão
    clientes.forEach((cliente) =>{
        lista.innerHTML += `
        <li>
            ${cliente.id} - ${cliente.nome}
            <button onclick="editarCliente(${cliente.id}, '${cliente.nome}')">Editar</button>
            <button onclick="excluirCliente(${cliente.id})">Excluir</button>
        </li>
        `
    })
}

// ========================================
// FUNÇÃO: CADASTRAR NOVO CLIENTE
// ========================================
// Cria um novo cliente no banco de dados
async function cadastrarCliente(){
    // Obtém o nome digitado no campo de entrada
    const nome = document.getElementById('nome').value

    // Valida se o nome não está vazio
    if(nome == ''){
        alert("DIGITE O NOME DO CLIENTE")
        return;
    }
    
    // Faz requisição POST ao servidor com os dados do novo cliente
    const resposta = await fetch('http://localhost:3023/clientes', {
        method: 'POST',  // Método POST para criar novo recurso
        headers: {'Content-Type': 'application/json'},  // Especifica formato JSON
        body: JSON.stringify({nome})  // Envia o nome do cliente
    })

    // Converte a resposta para JSON
    const dados = await resposta.json();
    // Exibe mensagem de sucesso do servidor
    alert(dados.mensagem)

    // Limpa o campo de entrada
    document.getElementById('nome').value='';
    // Atualiza a lista de clientes
    listarclientes();
}

// ========================================
// FUNÇÃO: BUSCAR CLIENTE POR NOME
// ========================================
// Busca clientes que correspondem ao nome digitado (busca parcial)
async function buscarCliente(){
    // Obtém o nome de busca do campo de entrada
    const nome = document.getElementById('searchNome').value;

    // Valida se o campo não está vazio
    if(nome.trim() === ''){
        alert('Digite o nome do cliente para buscar');
        return;
    }

    // Faz requisição GET ao servidor com o nome como parâmetro
    const resposta = await fetch(`http://localhost:3023/clientes/buscar?nome=${encodeURIComponent(nome)}`);
    const lista = document.getElementById('lista');
    // Limpa a lista anterior
    lista.innerHTML = '';

    // Verifica se a requisição foi bem-sucedida
    if (!resposta.ok) {
        const erro = await resposta.json().catch(() => ({ erro: 'Erro na busca' }));
        lista.innerHTML = `<li>${erro.erro || 'Erro na busca'}</li>`;
        return;
    }

    // Converte a resposta para JSON
    const clientes = await resposta.json();

    // Verifica se foram encontrados resultados
    if (!Array.isArray(clientes) || clientes.length === 0) {
        lista.innerHTML = '<li>Nenhum cliente encontrado</li>';
        return;
    }

    // Exibe todos os clientes encontrados
    clientes.forEach((cliente) =>{
        lista.innerHTML += `
        <li>
            ${cliente.id} - ${cliente.nome}
        </li>
        `
    })
}

// ========================================
// FUNÇÃO: BUSCAR CLIENTE POR ID
// ========================================
// Busca um cliente específico pelo seu ID numérico
async function buscarClientePorId(){
    // Obtém o ID digitado no campo de entrada
    const id = document.getElementById('searchId').value;

    // Valida se o ID não está vazio
    if(String(id).trim() === ''){
        alert('Digite o ID do cliente para buscar');
        return;
    }

    // Faz requisição GET ao servidor com o ID específico
    const resposta = await fetch(`http://localhost:3023/clientes/${encodeURIComponent(id)}`);
    const lista = document.getElementById('lista');
    // Limpa a lista anterior
    lista.innerHTML = '';

    // Verifica se a requisição foi bem-sucedida
    if (!resposta.ok) {
        const erro = await resposta.json().catch(() => ({ erro: 'Cliente não encontrado' }));
        lista.innerHTML = `<li>${erro.erro || 'Cliente não encontrado'}</li>`;
        return;
    }

    // Converte a resposta para JSON
    const cliente = await resposta.json();

    // Verifica se o cliente foi encontrado
    if (!cliente || !cliente.id) {
        lista.innerHTML = '<li>Nenhum cliente encontrado</li>';
        return;
    }

    // Exibe o cliente encontrado
    lista.innerHTML = `
    <li>
        ${cliente.id} - ${cliente.nome}
    </li>
    `;
}

// ========================================
// FUNÇÃO: EDITAR CLIENTE
// ========================================
// Atualiza o nome de um cliente existente
async function editarCliente(id , nomeAtual) {
    // Exibe uma caixa de diálogo para o usuário digitar o novo nome
    const novoNome = prompt('Digite um novo nome: ', nomeAtual);
    
    // Se o usuário cancelar ou não digitar nada, encerra a função
    if(!novoNome) return;

    // Faz requisição PUT ao servidor para atualizar o cliente
    await fetch(`http://localhost:3023/clientes/${id}`, {
        method: 'PUT',  // Método PUT para atualizar recurso
        headers: {'Content-Type':'application/json'},  // Especifica formato JSON
        body:JSON.stringify({nome: novoNome})  // Envia o novo nome
    })
    // Atualiza a lista após a edição
    listarclientes();
}

// ========================================
// FUNÇÃO: LISTAR TODAS AS MENSAGENS RECEBIDAS
// ========================================
// Busca todas as mensagens no servidor e exibe em uma lista HTML
async function listarMensagens() {
    // Faz requisição GET ao servidor para obter todas as mensagens
    const resposta = await fetch('http://localhost:3023/mensagens');
    // Converte a resposta para formato JSON
    const mensagens = await resposta.json();

    // Obtém o elemento HTML onde as mensagens serão exibidas
    const listaMensagens = document.getElementById('listaMensagens');
    // Limpa o conteúdo anterior
    listaMensagens.innerHTML = '';

    // Se não houver mensagens, exibe mensagem vazia
    if (mensagens.length === 0) {
        listaMensagens.innerHTML = '<li>Nenhuma mensagem recebida</li>';
        return;
    }

    // Percorre cada mensagem e cria um item de lista com informações
    mensagens.forEach((msg) => {
        // Formata a data para um formato legível
        const data = new Date(msg.data_criacao).toLocaleString('pt-BR');
        listaMensagens.innerHTML += `
        <li class="mensagem-item">
            <strong>De:</strong> ${msg.nome} (${msg.email})<br>
            <strong>Mensagem:</strong> ${msg.mensagem}<br>
            <small>Data: ${data}</small>
            <button onclick="deletarMensagem(${msg.id})">Deletar</button>
        </li>
        `
    })
}

// ========================================
// FUNÇÃO: DELETAR MENSAGEM
// ========================================
// Remove uma mensagem do banco de dados
async function deletarMensagem(id) {
    // Pede confirmação antes de deletar
    if (!confirm('Deseja realmente deletar essa mensagem?')) return;

    // Faz requisição DELETE ao servidor
    const resposta = await fetch(`http://localhost:3023/mensagens/${id}`, {
        method: 'DELETE'
    });

    // Se deletado com sucesso, atualiza a lista
    if (resposta.ok) {
        alert('Mensagem deletada com sucesso!');
        listarMensagens();
    } else {
        alert('Erro ao deletar mensagem');
    }
}
