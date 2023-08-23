# Projeto Space X Dashboard

O Projeto Space X Dashboard é uma aplicação desenvolvida para apresentar os dados disponibilizados pela SpaceX em formato de gráficos e tabelas. Os dados foram coletados e armazenados em um banco de dados personalizado para posterior visualização na interface do dashboard.

## Tecnologias usadas:

- Next.js
- Tailwind CSS
- React ChartJS
- Chart.js
- TypeScript
- Zustand

## Instruções de Execução

Para executar o projeto em sua máquina local, siga os passos abaixo:

- Caso queria testar esse projeto com alguma outra API:

  - Clone este repositório
  - Rode o commando `yarn` ou `npm install` para baixar todas as depedências
  - Certifique-se de ter a sua URL setada em seu arquivo do env.

- Este é o `client` de um monorepo. As intruções para funcionar junto da api estão na pasta principal.

# Processo de desenvolvimento e lógica envolvida.

- Maior problema foi parecido com o da API: Modelar os dados. Aqui foi necessário fazer isso para alimentar os gráficos.

- Também usar o zustand para criar um "isLoading" global ajudou MUITO a criar uma boa experiência de paginação e busca para o usuário.

This is a challenge by Coodesh
