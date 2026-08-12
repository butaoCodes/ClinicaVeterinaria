document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'admin@email.com' && password === 'admin123') {
        alert('Bem-vindo, Administrador!');
        window.location.href = '../admin/indexadmin.html';
    } else {
        alert('Bem-vindo, Usuário Comum!');
        window.location.href = '../usuario/indexuser.html';
    }
});
