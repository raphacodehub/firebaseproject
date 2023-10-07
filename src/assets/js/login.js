// login.js

function init() {

// Verifica se o usuario está logado.
exec('firebase login:list', function(error, stdout) {
    if (error) { // Se um erro for identificado, significa que o usuario não está logado.

        // Exibe um alerta solicitando o login.
        if (confirm('Faça login no navegador')) {

            // Solicita o login.
            exec('firebase login', function(error, stdout) {
                if (error) {
                    alert('Erro ao fazer login'); // Exibe um alerto se houver um erro no processo.
                    if (alert) {
                        return init();
                    }
                } else {
                    let stdoutResult = stdout;
                    let email = stdoutResult.split('email ')[1];
                    alert('logado com: ' + email);
                }
            });
        } else {
            ipcRenderer.send('loginRecused');
        }
        return;
    } if (stdout) {
        let stdoutResult = stdout;
        let email = stdoutResult.split('email ')[1];

        if (confirm(`Logado com: ${email}`)) {
        } else {
            exec('firebase logout', function(error, stdout) {
                if (error) {
                    alert('Error ao tentar sair');
                } else {
                    alert('Você saiu de: ' + email);
                    return init();
                }
            });
        }
    }
});
}