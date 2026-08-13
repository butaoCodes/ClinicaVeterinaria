// ========================================
// SCRIPT DE LOGIN - AUTENTICAÇÃO DE USUÁRIOS
// ========================================
// Este arquivo gerencia o login de usuários, distinguindo entre admin e usuário comum

// Obtém o formulário de login e adiciona um listener para o evento 'submit'
document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault(); 

    // Obtém o email digitado no campo de entrada
    const email = document.getElementById('email').value;
    // Obtém a senha digitada no campo de entrada
    const password = document.getElementById('password').value;

    // Verifica se o email e senha correspondem ao administrador
    if (email === 'admin@email.com' && password === 'admin123') {
        // Exibe mensagem de boas-vindas para admin
        alert('Bem-vindo, Administrador!');
        // Redireciona para a página de administração
        window.location.href = '../admin/indexadmin.html';
    } else {
        // Exibe mensagem de boas-vindas para usuário comum
        alert('Bem-vindo, Usuário Comum!');
        // Redireciona para a página do usuário comum
        window.location.href = '../usuario/indexuser.html';
    }
});
