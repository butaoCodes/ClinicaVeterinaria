async function listarclientes() {
    const resposta = await fetch('http://localhost:3023/clientes');
    const clientes = await resposta.json();

    const lista = document.getElementById('lista');
    lista.innerHTML =''

    clientes.forEach((cliente, index) =>{
        lista.innerHTML += `
        <li>
            ${index + 1} - ${cliente.nome}
            <button onclick="editarCliente(${cliente.id}, '${cliente.nome}')">Editar</button>
            <button onclick="excluirCliente(${cliente.id})">Excluir</button>
        </li>
        `
    })
}

async function cadastrarCliente(){
    const nome = document.getElementById('nome').value

    if(nome == ''){
        alert("DIGITE O NOME DO CLIENTE")
        return;
    }
    
    const resposta = await fetch('http://localhost:3023/clientes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome})
    })

    const dados = await resposta.json();
    alert(dados.mensagem)

    document.getElementById('nome').value='';
    listarclientes();

}

async function editarCliente(id , nomeAtual) {
    const novoNome = prompt('Digite um novo nome: ', nomeAtual);
    
    if(!novoNome) return;

    await fetch(`http://localhost:3023/clientes/${id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({nome: novoNome})
    })
    listarclientes();
}

async function excluirCliente(id){
    if(!confirm('Deseja realmente excluir esse cliente?')) return;

    await fetch(`http://localhost:3023/clientes/${id}`,{
        method: 'DELETE'
    })
    listarclientes();
}
