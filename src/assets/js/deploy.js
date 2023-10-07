/* deploy.js */

// Deploy
const deploy = document.getElementById('deploy');
deploy.addEventListener('click', function() {

    ipcRenderer.send('deploy'); // Envia a solicitação do deploy para o arquivo: /electron/main.js.

    // Desabilita o botão.
    deploy.setAttribute("disabled", "")

    // Seleciona a tag progress.
    const deployProgress = document.getElementById('deploy-prog');

    // Seleciona uma label para inserir o status do progresso.
    const deployStats = document.getElementById('deploy-stats');

    // Zera o status do label.
    deployStats.innerHTML = '';

    // Zera a porcentagem da barra de progresso.
    deployProgress.setAttribute("value", "0");

    // Simula o progresso do deploy.
    let progress = 0;
    const deployInterval = setInterval(() => {
        progress += 8;
        
        // Inseri a "procentagem" do progresso ao atributo value.
        deployProgress.setAttribute("value", `${progress}`);

        // Inseri o status do progresso na label.
        deployStats.innerHTML = `${progress}` + '%';

        // Se o progresso chegar a "96%" o intervalo é encerrado.
        if (progress === 104) {

            // Encerra o intervalo.
            clearInterval(deployInterval);

            // Altera o status do label para 100%
            deployStats.innerHTML = '100%';
        }
    }, 1000);

    // Caso recaba um evento de erro do arquivo main.js, o intervalo é encerrado.
    ipcRenderer.on('deployError', function() {
        clearInterval(deployInterval); // Encerra o intervalo.
        deployProgress.setAttribute("value", "0"); // Zera a barra de progresso.
        deployStats.innerHTML = 'Não foi possivel atualizar o site'; // Informa o erro no label.

    });

    /* Se a execução do deploy for encerrada com sucesso, o intervalo é encerrado
    e o valor do progresso é alterado para 100% */
    ipcRenderer.on('deploySucess', function() {

        // Encerra a intervalo do progresso.
        clearInterval(deployInterval);

        // Altera o valor do progresso para 100%.
        deployProgress.setAttribute("value", "100");

        // Atualiza o status de no label.
        deployStats.innerHTML = 'Site atualizado.';
        
        // Abilita o botão.
        deploy.removeAttribute("disabled");


    });
});