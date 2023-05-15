
# Ferramenta de Atualização de Preços para E-commerce

Este é um projeto de uma ferramenta desenvolvida em Node.js (back-end) e React.js (front-end) que permite aos usuários atualizarem os preços de produtos de forma massiva em uma loja de e-commerce. A ferramenta possui recursos adicionais para evitar erros e garantir que as regras de negócio sejam cumpridas.
## Stack utilizada

**Front-end:** React, Typescript, CSS

**Back-end:** Node, Express, Sequelize, Typescript, Docker

**Tests:**  chai, sinnon, mocha, nyc

**Database:** MySQL


## Instalação

* Clone este repositório em sua máquina.
* Certifique-se de que o Docker esteja instalado e em execução.
* No diretório raiz do projeto, execute o comando docker-compose up para iniciar o banco de dados MySQL.
* Acesse o diretório api e execute o comando npm install para instalar as dependências do back-end.
* Acesse o diretório client e execute o comando npm install para instalar as dependências do front-end.
* Após a instalação das dependências, execute npm run start:dev no diretório api para iniciar o servidor back-end.
* Em outro terminal, execute npm start no diretório client para iniciar o aplicativo front-end.
* Acesse o aplicativo em seu navegador através do endereço http://localhost:5173.
* No aplicativo, carregue o arquivo de precificação e clique no botão "VALIDAR" para iniciar a validação.
* Após a validação, revise as informações exibidas e verifique se alguma regra foi violada.
* Se todas as validações estiverem corretas, o botão "ATUALIZAR" será habilitado. Clique nele para atualizar os preços no banco de dados.
* Certifique-se de que as dependências necessárias estão instaladas corretamente e que os comandos estão sendo executados nos diretórios corretos.







## Roadmap

- Melhorar o suporte de navegadores

- Adicionar mais integrações


## Funcionalidades

O sistema desenvolvido deve atender aos seguintes requisitos:

* Back-end desenvolvido em Node.js, contendo todas as regras definidas.
* Front-end desenvolvido em React.js, utilizado pelo usuário da ferramenta.
* Banco de dados MySQL (versão 5 ou 8).
* O sistema deve permitir que o usuário carregue o arquivo de precificação.
* O sistema deve ter um botão chamado "VALIDAR" para iniciar a validação do arquivo.
* Ao clicar em "VALIDAR", o sistema deve ler o arquivo e realizar as seguintes verificações:
    * Verificar se todos os campos necessários estão presentes no arquivo.
    * Verificar se os códigos de produtos informados existem.
    * Verificar se os preços estão preenchidos e são valores numéricos válidos.
    * Verificar se o arquivo respeita as regras descritas no cenário.
* Após a validação, o sistema deve exibir as seguintes informações dos produtos que foram enviados:
    * Código do produto, nome do produto, preço atual e novo preço.
    * Caso uma ou mais regras de validação tenham sido quebradas, o sistema deve exibir ao lado de cada produto qual regra foi violada.

* O sistema deve ter um botão chamado "ATUALIZAR" que só ficará habilitado se todos os produtos do arquivo forem validados e não houver violação de regras.

* Ao clicar em "ATUALIZAR", o sistema deve salvar os novos preços no banco de dados e deixar a tela pronta para o envio de um novo arquivo.
