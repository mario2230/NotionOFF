# 📱 Notion OFF

Aplicativo mobile inspirado no Notion, desenvolvido com **Ionic + Vue**, com foco em organização pessoal, funcionamento offline e estrutura flexível baseada em blocos.

---

## 🚀 Objetivo

Criar uma aplicação onde o usuário possa:

* Criar e organizar páginas
* Escrever conteúdos dinâmicos (texto, título, checklist, etc.)
* Trabalhar offline com armazenamento local
* Evoluir futuramente para sincronização online

---

## 🧠 Conceito Principal

O sistema é baseado em **blocos**, onde todo conteúdo dentro de uma página é tratado como um elemento flexível.

Exemplos de blocos:

* Texto
* Título
* Checklist
* Imagem

Isso permite uma estrutura semelhante ao Notion, com alta flexibilidade.

---

## 🧱 Tecnologias Utilizadas

* Ionic Vue
* Vue 3 (Composition API)
* TypeScript
* SQLite (para armazenamento local)
* CSS customizado com tema próprio

---

## 🎨 Tema

Cor principal utilizada:

```css
--ion-color-new: #6366F1;
```

Estilo:

* Minimalista
* Interface limpa
* Inspirado no Notion

---

## 📂 Estrutura do Projeto

```
src/
 ├── views/
 │    ├── HomePage.vue
 │    ├── DocumentosPage.vue
 │    ├── PerfilPage.vue
 │    ├── LoginPage.vue
 │    └── CadastroPage.vue
 │
 ├── router/
 │    └── index.ts
 │
 ├── theme/
 │    └── variables.css
```

---

## 📱 Telas do Aplicativo

### 🏠 Home

* Exibe documentos recentes
* Botão para criação de novas páginas

---

### 📄 Documentos

* Campo de título
* Área de texto
* Checklist
* Estrutura baseada em blocos

---

### 👤 Perfil

* Alteração de dados do usuário
* Troca de senha
* Logout

---

### 🔐 Login

* Autenticação do usuário
* Acesso à tela de cadastro

---

## 🗄️ Modelagem do Banco

### Tabela: usuarios

* id_usuario
* nome
* email
* senha_hash
* criado_em

---

### Tabela: paginas

* id_pagina
* titulo
* id_usuario
* criado_em

---

### Tabela: blocos

* id_bloco
* id_pagina
* tipo
* conteudo (JSON em TEXT)
* ordem
* id_pai (hierarquia)
* feito (checklist)
* criado_em
* atualizado_em

---

## 🔗 Relacionamentos

* Um usuário possui várias páginas
* Uma página possui vários blocos
* Um bloco pode conter outros blocos (estrutura hierárquica)

---

## ⚙️ Funcionalidades Atuais

* Estrutura de páginas
* Interface inicial funcional
* Sistema de blocos (base)
* Navegação entre telas

---

## 🚧 Próximos Passos

* Implementar CRUD completo com SQLite
* Renderização dinâmica de blocos
* Criação de novos tipos de blocos
* Sistema de sincronização com API
* Melhorias de UX/UI
* Componentização avançada

---

## 📌 Status do Projeto

Em desenvolvimento 🚧
Foco em aprendizado, arquitetura e construção de portfólio.

---

## 🎯 Objetivo Final

Construir um aplicativo completo, escalável e com boas práticas, capaz de demonstrar:

* Conhecimento em frontend mobile
* Modelagem de dados
* Arquitetura offline-first
* Organização de código

---

## 👨‍💻 Autor

Desenvolvido como projeto de estudo e evolução prática.
