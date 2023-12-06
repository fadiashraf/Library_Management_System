const data = require('../dummyData/data.dummy.json');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // seed dummy authors
  await knex('authors').insert(data.authors).onConflict().ignore();
  const authors = await knex.select('id', 'name').from('authors');

  // seed dummy books
  const booksWithAuthorIds = data.books.map((book) => {
    const author_id = authors.find((name) => book.author)?.id;
    delete book.author;
    return { ...book, author_id };
  });
  await knex('books').insert(booksWithAuthorIds).onConflict().ignore();
};
