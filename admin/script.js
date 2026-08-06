async function listarclientes() {
    const resposta = await fetch('http://localhost:3023/clientes');
    const clientes = await resposta.json();

    const lista = document.getElementById('lista');
    lista.innerHTML =''

    clientes.forEach(curso =>{
        lista.innerHTML += `
        <li>
            ${curso.id} - ${curso.nome}
            <button onclick="editarCurso(${curso.id}, '${curso.nome}')">Editar</button>
            <button onclick="excluirCurso(${curso.id})">Excluir</button>
        </li>
        `
    })
}

async function cadastrarCurso(){
    const nome = document.getElementById('nome').value

    if(nome == ''){
        alert("DIGITE O NOME DO CURSO")
        return;
    }
    
    const resposta = fetch('http://localhost:3023/clientes', {
        method: 'POST',
        headers: {'Content-Type': 'application'},
        body:JSON.stringify({nome})
    })

    const dados = await resposta.json();
    alert(dados.mensagem)

    document.getElementById('nome').value='';
    listarclientes();

}

async function editarCurso(id , nomeAtual) {
    const novoNome = prompt('Digite um novo nome: ', nomeAtual);
    
    if(!novoNome) return;

    await fetch(`http://localhost:3023/clientes/${id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({nome: novoNome})
    })
    listarclientes();
}

async function excluirCurso(id){
    if(!confirm('Deseja realmente excluir esse curso?')) return;

    await fetch(`http://localhost:3023/clientes/${id}`,{
        method: 'DELETE'
    })
    listarclientes();
}