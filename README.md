# 📚 Projeto A3 Qualidade de Software

Este projeto tem como objetivo oferecer uma plataforma de **visualização e venda de livros**, com um backend desenvolvido em Node.js e TypeScript, utilizando **Express** e testes automatizados com **Jest**.

---

## 🧠 Visão Geral

O sistema é dividido em duas partes:

- **Frontend**: Será responsável pela interface gráfica com o usuário.
- **Backend**: Serve APIs REST para cadastro de usuários e gerenciamento de livros.

---

## 🗂️ Estrutura do Projeto

```
/
├── backend/ # API em Node.js com Express
│ ├── src/ # Código fonte principal
│ └── test/ # Testes unitários com Jest
├── frontend/
└── ...

```

---

## 🖥️ Backend

### 🔧 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **Jest** para testes unitários
- **ts-node**
- **Nodemon**

### 📦 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/lordnerd/projeto-a3-carlos-testes.git
   cd projeto-a3-carlos-testes
   ```

2. Vá até a pasta `backend`:

   ```bash
   cd backend
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

---

### ▶️ Executando o Backend

Para rodar o backend em modo de desenvolvimento com `ts-node` e `nodemon`:

```bash
npm start
```

> O servidor será iniciado em `http://localhost:3000` (ou conforme configurado).

---

### 🧪 Executando os Testes

Este projeto utiliza **Jest** com `ts-jest` para realizar **testes unitários**. Para rodar os testes:

```bash
npm test
```

> Os testes estão localizados na pasta `src/tests/`.

---

## 💻 Frontend

> O frontend ainda está em desenvolvimento e será adicionado em breve. A ideia é disponibilizar uma interface para que os usuários possam:

- Visualizar a vitrine de livros;
- Pesquisar por título, autor ou categoria;
- Adicionar livros ao carrinho;
- Finalizar compras.

---

## 📚 Funcionalidades Planejadas

- Cadastro e autenticação de usuários;
- Cadastro de livros (admin);
- Visualização e compra de livros (usuários);
- Histórico de pedidos;
- Interface web (em breve).

---

## 🤝 Issues

Todas as atividades do projeto serão separadas através do uso do GitHub Projects, lá iremos separar as issues para cada colaborador do projeto.
