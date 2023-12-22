# Brain Agriculture Backend Challenge

Projeto de backend desenvolvido para facilitar a administração de propriedades agrícolas, cultivos e agricultores, oferecendo uma solução para o registro e monitoramento de dados relacionados à atividade agrícola.

## Solução

A solução foi elaborada empregando Node.js em conjunto com o framework AdonisJS V5 como camada do backend. Para o armazenamento de dados, optou-se pelo PostgreSQL, juntamente com o Lucid ORM. Os testes foram implementados através do Japa Tests Runner, e a documentação foi elaborada utilizando Swagger.


## Tecnologias

- [AdonisJS](https://adonisjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Japa Tests Runner](https://japa.dev/docs/introduction)
- [Adonis Swagger](https://github.com/reg2005/adonis5-swagger)

## Requisitos

- NodeJS: v18+
- Docker
- Docker Compose

## Como rodar a aplicação em modo desenvolvimento (com NodeJS)

### Requisitos
  - Banco de dados **PostgreSQL** em execução

### Passo a passo
1. Clone o repositório: `git clone https://github.com/mariobmf/brain_ag_challenge.git`
2. Navegue até o diretório `backend`
3. Crie o arquivo `.env` e preencha com informações do Banco de dados
4. Execute os comandos abaixo:
```bash
npm install
node ace migration:run
npm run dev
```

## Como rodar a aplicação em modo desenvolvimento (com Docker)
Executar os comandos abaixo:
```bash
git clone https://github.com/mariobmf/brain_ag_challenge.git
docker compose up
```

## Como rodar os testes
para rodar todos testes:
```bash
npm run test
```
para rodar testes de unidade:
```bash
npm run test:unit
```
para rodar testes e2e:
```bash
npm run test:e2e
```

## Como acessar a documentação dos endpoints
1. Inicie a aplicação
2. Acesse a documentação no navegador: http://localhost:3333/docs


