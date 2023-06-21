let books = [];
let noResultsData;

function filterBooks(event) {
  event.preventDefault();

  const searchType = document.getElementById('search-type').value;
  const searchTerm = document.getElementById('search-term').value.toLowerCase();

  let filteredBooks = [];

  if (searchType === 'title') {
    filteredBooks = books.filter(book => book.nome.toLowerCase().includes(searchTerm));
  } else if (searchType === 'author') {
    filteredBooks = books.filter(book => {
      if (Array.isArray(book.autor)) {
        return book.autor.some(author => author.toLowerCase().includes(searchTerm));
      } else {
        return book.autor.toLowerCase().includes(searchTerm);
      }
    });
  } else if (searchType === 'publisher') {
    filteredBooks = books.filter(book => book.editora.toLowerCase().includes(searchTerm));
  } else if (searchType === 'category') {
    filteredBooks = books.filter(book => book.categoria.toLowerCase().includes(searchTerm));
  }

  displayBooks(filteredBooks);
}

function displayBooks(booksArray) {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  if (booksArray.length === 0) {
    const noResultsRow = document.createElement('tr');
    const noResultsData = document.createElement('td');
    noResultsData.setAttribute('colspan', '6');
    noResultsData.textContent = ('Nenhum resultado encontrado.');
      Swal.fire ({
        icon: 'warning',
        title: 'Oops...',
        text: 'Livro não cadastrado no estoque 🙁'
        }).then((result) => {
          if (result.isConfirmed){
            location.reload();
          }
        })

    noResultsRow.appendChild(noResultsData);
    tableBody.appendChild(noResultsRow);
    
    return;
  } 

  booksArray.forEach(book => {
    const newRow = document.createElement('tr');
    const nameData = document.createElement('td');
    const authorData = document.createElement('td');
    const publisherData = document.createElement('td');
    const categoryData = document.createElement('td');
    const priceData = document.createElement('td');
    const stockData = document.createElement('td');

    nameData.textContent = book.nome;
    authorData.textContent = Array.isArray(book.autor) ? book.autor.join(', ') : book.autor;
    publisherData.textContent = book.editora;
    categoryData.textContent = book.categoria;
    priceData.textContent = book.preco;
    stockData.textContent = book.estoque;

    newRow.appendChild(nameData);
    newRow.appendChild(authorData);
    newRow.appendChild(publisherData);
    newRow.appendChild(categoryData);
    newRow.appendChild(priceData);
    newRow.appendChild(stockData);

    tableBody.appendChild(newRow);
  });
}

fetch('books.json')
  .then(response => response.json())
  .then(data => {
    books = data;
    displayBooks(books);
  })
  .catch(error => {
    Swal.fire('Erro ao carregar os dados dos livros:', error.message, 'error');
  });

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', filterBooks);


Swal.fire({
  title: '<strong>Seja bem-vindo!</strong>',
  imageUrl: './assets/book-alert-192x192.png',
  imageHeight: 100,
  html:
    'Aqui você poderá acessar nossos livros em estoque 😉',
  showCloseButton: true,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonText:
    'Continuar',
})

