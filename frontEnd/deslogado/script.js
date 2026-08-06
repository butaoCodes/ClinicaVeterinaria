document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Define os dados fixos do administrador para o teste
    if (email === 'admin@email.com' && password === 'admin123') {
        alert('Bem-vindo, Administrador!');
        window.location.href = '/clinica veterinaria/admin/indexadmin.html'; // Página do admin
    } else {
        alert('Bem-vindo, Usuário Comum!');
        window.location.href = '/clinica veterinaria/usuario/indexuser.html'; // Página do usuário comum
    }
});
