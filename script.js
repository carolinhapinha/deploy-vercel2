import express from 'express';
import path from 'path';

const app = express();
app.use(express.urlencoded({ extended: true }));

const porta = 3000;
const host = '0.0.0.0';

let listaClientes = []; // Armazenar os clientes cadastrados
let listaFilmes = [];   // Armazenar os filmes cadastrados

// Função para exibir o formulário de cadastro de cliente
function exibirFormularioCadastroCliente(req, res) {
    res.send(`
        <html>
            <head>
                <title>Cadastro de Clientes</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container text-center">
                    <h1 class="mb-5">Cadastro de Cliente</h1>
                    <form method="POST" action="/cadastrarCliente" class="border p-3 row g-3" novalidate>
                        <div class="col-md-4">
                            <label for="nome" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="nome" name="nome" required>
                        </div>
                        <div class="col-md-4">
                            <label for="sobrenome" class="form-label">Sobrenome</label>
                            <input type="text" class="form-control" id="sobrenome" name="sobrenome" required>
                        </div>
                        <div class="col-md-4">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>
                        <div class="col-md-6">
                            <label for="cidade" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="cidade" name="cidade" required>
                        </div>
                        <div class="col-md-3">
                            <label for="estado" class="form-label">UF</label>
                            <select class="form-select" id="estado" name="estado" required>
                                <option value="SP">São Paulo</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="MG">Minas Gerais</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="cep" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="cep" name="cep" required>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary" type="submit">Cadastrar Cliente</button>
                        </div>
                    </form>
                    <br>
                    <a class="btn btn-secondary" href="/">Voltar ao Menu</a>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `);
}

// Função para exibir o formulário de cadastro de filme
function exibirFormularioCadastroFilme(req, res) {
    res.send(`
        <html>
            <head>
                <title>Cadastro de Filmes</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container text-center">
                    <h1 class="mb-5">Cadastro de Filme</h1>
                    <form method="POST" action="/cadastrarFilme" class="border p-3 row g-3" novalidate>
                        <div class="col-md-6">
                            <label for="nomeFilme" class="form-label">Nome do Filme</label>
                            <input type="text" class="form-control" id="nomeFilme" name="nomeFilme" required>
                        </div>
                        <div class="col-md-6">
                            <label for="anoFilme" class="form-label">Ano de Lançamento</label>
                            <input type="text" class="form-control" id="anoFilme" name="anoFilme" required>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary" type="submit">Cadastrar Filme</button>
                        </div>
                    </form>
                    <br>
                    <a class="btn btn-secondary" href="/">Voltar ao Menu</a>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `);
}

// Função para exibir todos os cadastros (clientes e filmes)
function listarTodosCadastros(req, res) {
    // Lista de clientes formatada em HTML
    let listaClientesHtml = listaClientes.map(cliente => `
        <tr>
            <td>${cliente.nome}</td>
            <td>${cliente.sobrenome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.cidade}</td>
            <td>${cliente.estado}</td>
            <td>${cliente.cep}</td>
        </tr>
    `).join('');

    // Lista de filmes formatada em HTML
    let listaFilmesHtml = listaFilmes.map(filme => `
        <tr>
            <td>${filme.nomeFilme}</td>
            <td>${filme.anoFilme}</td>
        </tr>
    `).join('');

    res.send(`
        <html>
            <head>
                <title>Todos os Cadastros</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container mt-5">
                    <h2 class="mb-4">Clientes Cadastrados</h2>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Email</th>
                                <th>Cidade</th>
                                <th>Estado</th>
                                <th>CEP</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${listaClientesHtml}
                        </tbody>
                    </table>

                    <h2 class="mb-4 mt-5">Filmes Cadastrados</h2>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nome do Filme</th>
                                <th>Ano de Lançamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${listaFilmesHtml}
                        </tbody>
                    </table>

                    <a href="/" class="btn btn-secondary">Voltar ao Menu</a>
                </div>
            </body>
        </html>
    `);
}

// Configuração das rotas
app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});
app.get('/cadastrarCliente', exibirFormularioCadastroCliente);
app.get('/cadastrarFilme', exibirFormularioCadastroFilme);
app.post('/cadastrarCliente', (req, res) => {
    const { nome, sobrenome, email, cidade, estado, cep } = req.body;
    listaClientes.push({ nome, sobrenome, email, cidade, estado, cep });
    res.redirect('/listarTodos');
});
app.post('/cadastrarFilme', (req, res) => {
    const { nomeFilme, anoFilme } = req.body;
    listaFilmes.push({ nomeFilme, anoFilme });
    res.redirect('/listarTodos');
});
app.get('/listarTodos', listarTodosCadastros);

// Inicialização do servidor
app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
