# 🌅 Captured Moments — Backend

O **Captured Moments** é um **SaaS** desenvolvido para registrar e guardar **momentos especiais**, como viagens inesquecíveis e experiências únicas.  
Este repositório contém o **servidor backend**, responsável por gerenciar usuários, autenticação, upload de fotos e integração com a **IA (Ollama + Llama 3.2)**, que aprimora a ortografia e intensifica o texto das memórias.

---

## 🧠 Inteligência Artificial Integrada

A IA do Captured Moments utiliza o **modelo Llama 3.2** através do **Ollama**, oferecendo:
- Correção ortográfica automática  
- Aperfeiçoamento do texto, tornando as descrições mais envolventes e emocionais  

---

## ⚙️ Tecnologias Principais

- **Node.js** — Ambiente de execução  
- **Fastify** — Framework web rápido e eficiente  
- **Prisma** — ORM moderno para comunicação com o banco de dados  
- **TypeScript** — Tipagem estática para maior confiabilidade  
- **Multer** — Upload e manipulação de imagens  
- **Bcrypt** — Criptografia segura de senhas  
- **JWT** — Autenticação e controle de acesso  
- **Axios** — Comunicação com a IA do Ollama  

---

## ⚡ Instalação e Execução Local

### 🔧 Pré-requisitos
- **Node.js** v18 ou superior  
- **PostgreSQL** configurado  
- **Ollama** instalado e com o modelo `llama3.2` disponível  

### 📦 Passos para rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/rafael-bogos/captured-moments-server.git

# Acesse a pasta
cd captured-moments-server

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# (edite o arquivo .env com as suas informações, como banco de dados e chaves JWT)

# Execute as migrações do Prisma
npx prisma migrate dev

# Inicie o servidor em modo de desenvolvimento
npm run dev
```

O servidor será iniciado e estará disponível em:  
👉 **http://localhost:8080**

---

## 🚀 Objetivo

O backend do **Captured Moments** foi projetado para oferecer **desempenho, segurança e integração inteligente**, garantindo uma experiência fluida e confiável para o usuário final.  
Ele é o coração do sistema que transforma **recordações simples em histórias inesquecíveis**.

---

## 🧑‍💻 Autor

**Desenvolvido por Rafael Bogos**  
💛 Criado com paixão por tecnologia e boas lembranças.
