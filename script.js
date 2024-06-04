// JavaScript
const searchInput = document.getElementById('searchInput');
const table = document.getElementById('myTable').getElementsByTagName('tbody')[0];
const rows = table.rows;
const headers = table.parentNode.getElementsByTagName('th');

// Función de búsqueda
searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase();
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    let match = false;
    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].textContent.toLowerCase();
      if (cellText.includes(searchText)) {
        match = true;
        break;
      }
    }
    rows[i].style.display = match ? '' : 'none';
  }
});

// Función de ordenamiento
for (let i = 0; i < headers.length; i++) {
  headers[i].addEventListener('click', () => {
    sortTable(i);
  });
}

function sortTable(columnIndex) {
    const sortOrder = headers[columnIndex].getAttribute('data-sort') === 'asc' ? 1 : -1;
    const rowsArray = Array.from(rows);
  
    // Reiniciar los indicadores de orden
    const sortIndicators = headers[columnIndex].getElementsByClassName('sort-indicator')[0];
    sortIndicators.classList.remove('asc', 'desc');
  
    rowsArray.sort((a, b) => {
      const aText = a.cells[columnIndex].textContent.trim().toLowerCase();
      const bText = b.cells[columnIndex].textContent.trim().toLowerCase();
      if (aText < bText) return -sortOrder;
      if (aText > bText) return sortOrder;
      return 0;
    });
  
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
  
    for (let i = 0; i < rowsArray.length; i++) {
      table.appendChild(rowsArray[i]);
    }
  
    // Actualizar el indicador de orden de la columna seleccionada
    sortIndicators.classList.add(sortOrder === 1 ? 'asc' : 'desc');
  
    headers[columnIndex].setAttribute('data-sort', sortOrder === 1 ? 'desc' : 'asc');
  }


  const rowsPerPageSelect = document.getElementById('rows-per-page');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

let currentPage = 1;
let rowsPerPage = 10;
let totalPages = 1;

function updatePagination() {
  const totalRows = table.rows.length;
  totalPages = Math.ceil(totalRows / rowsPerPage);
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].style.display = i >= startIndex && i < endIndex ? '' : 'none';
  }
}

rowsPerPageSelect.addEventListener('change', () => {
  rowsPerPage = parseInt(rowsPerPageSelect.value, 10);
  currentPage = 1;
  updatePagination();
});

prevPageBtn.addEventListener('click', () => {
  currentPage--;
  updatePagination();
});

nextPageBtn.addEventListener('click', () => {
  currentPage++;
  updatePagination();
});

updatePagination();