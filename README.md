# Serviço de Gestão (Fase 1)

API RESTful desenvolvida em Node.js com TypeScript para a disciplina de Projeto de Sistemas Backend (PUCRS). Este projeto representa o **Serviço de Gestão**, focado em aplicar rigorosamente os conceitos de **Arquitetura Limpa (Clean Architecture)** e os **Princípios SOLID**.

---

## Tecnologias Utilizadas

* **Linguagem:** Node.js com TypeScript
* **Framework Web:** Express
* **Banco de Dados:** SQLite (escolhido pela leveza e facilidade de execução local)
* **ORM:** Prisma
* **Ferramenta de Teste de API:** Bruno

---

## Arquitetura e Padrões

O projeto foi construído separando responsabilidades em camadas distintas para garantir baixo acoplamento e alta coesão:
* **Domain (Domínio):** Entidades puras e interfaces de repositórios (Inversão de Dependência).
* **Application (Casos de Uso):** Regras de negócio da aplicação, agnósticas a frameworks web ou banco de dados.
* **Adapters (Adaptadores):** Controllers (para o Express) e implementações de Repositórios (para o Prisma).
* **Infrastructure (Infraestrutura):** Configurações do servidor Web (Express) e scripts de inicialização de Banco de Dados.

---

## Como Configurar e Rodar o Projeto

Siga os passos abaixo para executar a aplicação localmente:

### 1. Instalar as Dependências
Abra o terminal na raiz do projeto e execute:
```bash
npm install 
```

### 2. Criar o Banco de Dados
O projeto utiliza SQLite. Para criar o arquivo do banco e gerar as tabelas a partir do schema do Prisma, rode:
```bash
npx prisma db push
```

### 3. Popular o Banco (Seed)
Para criar os dados iniciais exigidos (10 clientes, 5 planos e 5 assinaturas), execute o script de seed:
```bash
npm run seed
```

### 4. Iniciar o Servidor
Para criar os dados iniciais exigidos (10 clientes, 5 planos e 5 assinaturas), execute o script de seed:
```bash
npm run dev
```
(O servidor estará acessível na porta 3000)

## Endpoints da API
Com o servidor rodando, você pode testar as seguintes rotas na porta 3000

* Clientes
  * GET /gerenciaplanos/clientes - Lista todos os clientes.

* Planos
  * GET /gerenciaplanos/planos - Lista todos os planos.

  * PATCH /gerenciaplanos/planos/:idPlano  - Atualiza o custo mensal de um plano específico.

* Assinaturas
  * POST /gerenciaplanos/assinaturas - Cria uma nova assinatura.

  * GET /gerenciaplanos/assinaturas/:tipo - Lista assinaturas por status (TODOS, ATIVOS, CANCELADOS).

  * GET /gerenciaplanos/asscli/:codcli - Lista as assinaturas de um cliente específico.

  * GET /gerenciaplanos/assinaturaplano/:codplano - Lista as assinaturas vinculadas a um plano específico.

## Testando a API

Na raiz do projeto, há um arquivo .json exportado (Postman/Bruno) contendo a Collection com todos os requests pré-configurados. Basta importar na sua ferramenta de preferência e executar os disparos.