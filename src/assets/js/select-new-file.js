// Select new file

// Input
const input = document.getElementById('file');
input.addEventListener('input', function() {

    const file = input.files[0]; // Obtem o arquivo selecionado.
    const fileName = file.name // Nome do aqruivo.
    const origin = file.path // Obtem o diretorio do aqruivo.
    const newOrigin = "./public/assets/img/" + fileName; // Define um novo diretorio.

    // Copia o arquivo para o novo diretorio.
    fs.copyFile(origin, newOrigin, function(error) {
        if (error) {
            alert('Erro ao enviar o arquivo, tente renomea-lo')
        } else {

            // Seleciona o arquivo index.html do firebase
            const htmlFile = path.join(__dirname, '../public/index.html')
            
            // Lê o arquivo
            fs.readFile(htmlFile, 'utf8', function(error, data) {
                if (error) throw error;

                // Cerrega o conteudo do arquivo no cheerio
                const chee = cheerio.load(data);

                // Seleciona a tag <img> e altera o caminho para nova imagem
                chee('img#banner').attr('src', './assets/img/' + fileName);

                // Obtem o novo conteudo
                const newData = chee.html();

                // Escreve o novo conteudo no arquivo.
                fs.writeFile(htmlFile, newData, 'utf8', function(error) {
                    if (error) throw error;
                });

            });
        }
    });


});