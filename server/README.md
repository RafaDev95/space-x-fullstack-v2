# API sobre informações de lançamentos da Space X

## Esta api recebe os dados da API da space x e armazena em um banco de dados. Onde os dados armazenados são enviados para alimentar o front end. Existe um CRON programado para atualizar estes dados todos os dias às 09:00.

# Para acessar os endpoints via Swagger, acesse: /api-docs

## Tecnologias

- Nodejs
- Typescript
- Axios
- PrismaORM(MongoDB)

## Instruções de Execução

Para executar o projeto em sua máquina local, siga os passos abaixo:

- Caso queria testar esse projeto com alguma outro client:

  - Clone este repositório
  - Rode o commando `yarn` ou `npm install` para baixar todas as depedências
  - Vá até o https://www.mongodb.com, crie sua conta juntamente de um banco de dados/cluster.
  - Certifique-se de ter a sua URL setada em seu arquivo do env ou a coloque diretamente no arquivo schema.prisma(não recomendado). `Exemplo de URL: mongodb+srv://usuariocadastrado:senhaqui@cluster0.sqcgq.mongodb.net/nome_do_seu_db`
  - Execute os seguintes comandos: `npx prisma generate` e depois `npx prisma db push`. Com o generate, o prisma fornce umas interfaces/tipagens baseadas nos schemas criados. O db push é para "espelhar" os schemas no banco de dados, são criadas coleções vazias ao executá-lo.
  - Rode o comando: `npx ts-node-dev src/getAndSaveSpaceXData.ts` para buscar os dados na api da space x e armazená-los.
  - Agora é só rodar o comando `yarn dev`

- Esta é o API ou `server` de um monorepo. As intruções para funcionar junto do client estão na pasta principal.

# Processo de desenvolvimento e lógica envolvida.

## Salvando dados no banco de dados

A princípio eu li toda a documentação/requisições do projeto e fiz um planejamento mas, algumas coisas não saíram como esperado e decidi alterar o schema de `launch` para simplificar as buscas.

- O schema do `launch` tem apenas os dados que são necessários para uso no front end, tais como data, resultado do lançamento, nome do foguete, se foi reutilizado, logos, link para youtube e afins.

- No início eu me confudi sobre o campo "name" e "rocket". Na api da space x, são retornados esses 2 campos, onde name é a missão e rocket um id. Para saber o nome do rocket precisei usar a api de foguetes deles (https://api.spacexdata.com/v4/rockets/${rocket_id}).
  No schema `launch` eu resolvi deixar campos iguais aos retornados pela api deles (os que eu salvei, que como disse, não foram todos). Para ficar mais fácil de consultar algo futuramente e dar mais fidelidade.

- Segundo "problema" foi em como salvar o nome do foguete dentro do documento `launch`, sendo que é necessário fazer uma requisição para outro endpoint. O resultado foi:

  - Criar uma função que retorna todos os lançamentos _(launches)_, estando com essess lançamentos salvos, criei uma função que recebe o rocketId(campo rocket retornado pela API de launches) que faz a busca baseada neste Id e retorna os dados do foguete _(getRocketData)_.
  - Com esses dados em mãos foi feito um for para cada launch(item) dentro do array launches (for launch of launches) e dentro desse laço é criado cada lançamento retornado, com o nome do foguete incluso.

  - Aqui tive outro problema para salvar os "cores", que é o campo onde fala se houve reutilização. Quando eles eram inclusos diretamente na criação do documento `launch`, estava tendo um problema com ID's. De acordo com o prisma, algumas chaves(ids) estavam sendo reutilizadas.
    -A solução foi: verificar se aquele `core` existia e então atualiza-lo, caso não, criar um novo diretamente e associar os IDs.

## Paginação e filtros

- Foi preciso criar uma objeto vazio para lidar com a lógica de buscar: missão, foguete ou resultado (sucess ou falha).
- E por que um parametro para 3 tipos de busca? Bom, foi o que eu interpretei lendo o desafio: "`O endpoint de paginação de uma busca hipotética deve retornar a seguinte estrutura:
[GET]/launches?search=tesla&limit=4`". Pode ter sido uma má interpretação? Pode, mas pelo menos ficou igual ao solicitado e está funcionando. 🤔

## Retorno de dados

- Foi bem trabalhoso pensar em como modelar isso e retornar de maneira legível para o client. Lidar com os lançamentos anuais e o sumário de cada ano. Devido aos campos que pode vir como null (**cores**, por exemplo) e precisam entrar na soma para os gráficos, o código ficou bem maior do que eu esperava, inclusive, coloquei alguns comentários que achei importantes.

- Aqui tem mais uma coisa que espero ter interpretado certo: no wireframe, existem: Heavy Falcon, `New Falcon 9`, `Used Falcon` e Falcon 1. A api me retorna: Heavy Falcon, `Falcon 9` e Falcon 1.
- Como na documentação do projeto é mencionado o campo **core.reused**, foi daí que surgiu a ideia de salvar esse bendito campo e me baseei nele para definir o que seria o `New Falcon`, que no caso seria cada lançamento, e o `Used Falcon` que seria as vezes que ele foi reutilizado. **(core.reused === true)**.
- A princípo achei que era o campo **core.flight** mas, o resultado final era muito discrepante. Usando o wireframe como base juntamente de um dashboard disponível no github da api da space x.
- A lógica de se basea no **core.reused** parece ser mais precisa.

- Primeira vez usando o Swagger. Bem provável tem alguma forma de automatizar esses components, seja com interfaces ou os schemas do prisma mas, no momento, preferi fazer da maneira que achei mais simples pra não tomar muito tempo estudando métodos automatizados.

- As lógicas dos endpoints `overall` e `yearly` ficaram bem parecidas mas mesmo assim preferi separar devido ao volume de cáculo feito pelo `yearly`, além de aceitar um ano como parâmetro. Dessa forma fica mais fácil de administrar.

This is a challenge by [Coodesh](https://coodesh.com/)
