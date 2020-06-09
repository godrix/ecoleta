import Knex from 'knex';

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex) {
  await knex('collectionItems').insert([
    { title: 'Lâmpadas', image: 'lampadas.svg' },
    { title: 'Pilhas e baterias', image: 'baterias.svg' },
    { title: 'papéis e papelão', image: 'papeis-papelao.svg' },
    { title: 'Resíduos eletronicos', image: 'eletronicos.svg' },
    { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
    { title: 'Óleo de cozinha', image: 'oleo.svg' },
  ]);
}
