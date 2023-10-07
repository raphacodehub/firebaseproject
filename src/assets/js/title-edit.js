// title-edit.js

// Input
const inputTitle = document.getElementById('title');

// Seleciona o arquivo a ser modificado: /firebase/public/index.html.
const file = path.join(__dirname, '../public/index.html');

// Seleciona o arquivo a ser modificado: /src/index.html.
const mainIndex = path.join(__dirname, '../src/index.html');

inputTitle.addEventListener('input', function() {
    const value = inputTitle.value;


    // Lê o arquivo.
    fs.readFile(file, 'utf8', function(error, data) {
        if (error) throw error;

        // Carrega o conteúdo do arquivo no cheerio.
        const chee = cheerio.load(data);

        // Encontra a tag <h1> e altera o texto.
        chee('h1').text(value);

        // Obtem o novo conteúdo.
        const newData = chee.html();

        // Escreve o novo conteúdo no arquivo.
        fs.writeFile(file, newData, 'utf8', function(error) {
            if (error) throw error;
            else {
                // Lê o arquivo.
                fs.readFile(mainIndex, 'utf8', function(error, data) {
                    if (error) throw error;
            
                    // Carrega o conteúdo do arquivo no cheerio.
                    const chee = cheerio.load(data);
            
                    // Encontra a tag <h1> e altera o texto.
                    chee('input#title').attr('value', `${value}`);
            
                    // Obtem o novo conteúdo.
                    const newData = chee.html();
            
                    // Escreve o novo conteúdo no arquivo.
                    fs.writeFile(mainIndex, newData, 'utf8', function(error) {
                        if (error) throw error;
                    });
                });
            }
        });
    });
});