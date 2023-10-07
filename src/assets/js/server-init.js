// server-init.js

// Inciar o server
const hostInit = document.getElementById('host-init');
hostInit.addEventListener('click', function() {
    // Envia o evento para o arquivo: electron/main.js.
    ipcRenderer.send('initServer');
});