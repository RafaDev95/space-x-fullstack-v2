# Este monorepo trata-se do Projeto Fullstack Space X. Cada documentação está dentro da pasta referente (server e client).

## Projeto trata-se de receber dados da api da space X, armazenar em um banco de dados e usar esses dados armazenados para servir o front end.

## Instruções de Execução do projeto:

- Clone este repositório

  - Acesse a pasta server com o comando `cd server` e sigas os passos:

    - Rode o commando `yarn` ou `npm install` para baixar todas as depedências
    - Vá até o https://www.mongodb.com, crie sua conta juntamente de um banco de dados/cluster.
    - Certifique-se de ter a sua URL setada em seu arquivo do env ou a coloque diretamente no arquivo schema.prisma(não recomendado). `Exemplo de URL: mongodb+srv://usuariocadastrado:senhaqui@cluster0.sqcgq.mongodb.net/nome_do_seu_db`
    - Execute os seguintes comandos: `npx prisma generate` e depois `npx prisma db push`. Com o generate, o prisma fornce umas interfaces/tipagens baseadas nos schemas criados. O db push é para "espelhar" os schemas no banco de dados, são criadas coleções vazias ao executá-lo.
    - Rode o comando: `npx ts-node-dev src/getAndSaveSpaceXData.ts` para buscar os dados na api da space x e armazená-los.
    - Agora é só rodar o comando `yarn dev`

  - Após terminar com a pasta server, vá para pasta client
    - Rode o commando `yarn` ou `npm install` para baixar todas as depedências
    - Certifique-se de ter a sua URL setada em seu arquivo do env.

This is a challenge by Coodesh
