document.addEventListener('DOMContentLoaded', () => {
    const dataBody = document.getElementById('dataBody');
  
    // Fetch data from the server
    fetch('/')
      .then(response => response.json())
      .then(data => {
        // Loop through the retrieved data and create table rows
        data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.first_name}</td>
            <td>${item.last_name}</td>
            <td>${item.birth}</td>
          `;
          dataBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  