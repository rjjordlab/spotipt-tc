// Registar o nosso "main" para quando o DOM está carregado.
// O 'DOMContentLoaded' é executado ligeiramente antes do 'load',
// logo, quando possível, deve ser usado.
document.addEventListener('DOMContentLoaded', function main(e) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/assets/xml/discot.xml');  // Configurar o URL para obter o XML.

    xhr.onload = function xmlLoaded(e) {  // Executado quando o conteúdo é carregado.
        if (xhr.status === 200) {  // OK
            var xml = xhr.responseXML;

            // 'xml' é um documento, tal como o 'document'.
            // Podemos desempenhar as mesmas tarefas nele que no 'document'.
            console.log(xml);  

            // Colocar os CDs do XML na página.

            var cds = xml.querySelectorAll('cd');

            for (var i = 0; i < cds.length; i++) {
                var cd = cds[i];
                var titulo = cd.getAttribute('titulo');
                var tituloContainer = document.createElement('p');
                tituloContainer.textContent = "Álbum: " + titulo;
                document.body.appendChild(tituloContainer);

                var artista = cd.getAttribute('autoria');
                var artistaContainer = document.createElement('p');
                artistaContainer.textContent = "Artista: " + artista;
                document.body.appendChild(artistaContainer);

                var editora = cd.getAttribute('editora');
                var editoraContainer = document.createElement('p');
                editoraContainer.textContent = "Editora: " + editora;
                document.body.appendChild(editoraContainer);

                var linkamazon = cd.getAttribute('amazon');
                var linkamazonContainer = document.createElement('p');
                linkamazonContainer.textContent = "Link: " + linkamazon;
                document.body.appendChild(linkamazonContainer);

                var capa = cd.getElementsByTagName('capa')[0].getAttribute('imagMini');
                var capaContainer = document.createElement('p');
                capaContainer.textContent = "Capa IMG: " + capa;
                document.body.appendChild(capaContainer);

                var dataD = cd.getElementsByTagName('data')[0].getAttribute('dia');
                var dataM = cd.getElementsByTagName('data')[0].getAttribute('mes');
                var dataA = cd.getElementsByTagName('data')[0].getAttribute('ano');
                var dataContainer = document.createElement('p');
                dataContainer.textContent = "Data: " + dataD + "/" + dataM + "/" + dataA;
                document.body.appendChild(dataContainer);

                var faixaslista = cd.getElementsByTagName('faixa').length;
                for (var j = 0; j < faixaslista; j++) {
                    var faixaNum = cd.getElementsByTagName('faixa')[j].getAttribute('num');
                    var faixaNome = cd.getElementsByTagName('faixa')[j].getAttribute('ref');
                    var faixaContainer = document.createElement('p');
                    faixaContainer.textContent = "Faixa nº" + faixaNum + ": " + faixaNome;
                    document.body.appendChild(faixaContainer);
                }

            }

        } else {  // Erro
            console.error(`Status ${xhr.status}`, xhr.responseText);
        }
    };

    xhr.onerror = function communicationsError(e) {  // Problema de comunicação.
        console.error('An error occured.', e);
    };

    xhr.send();  // Enviar o pedido.
});
