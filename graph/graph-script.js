const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=150&price_change_percentage=24h&sparkline=true";
const comparisonGraphContainer = document.getElementById("comparison-graph");

async function fetchCryptoData() {
  const response = await fetch(API_URL);
  const data = await response.json();
  renderBarComparisonGraph(data);
}

function renderBarComparisonGraph(data) {
  const comparisonLabels = data.map(coin => coin.name); // Labels are cryptocurrency names

  // Create datasets for bar comparison graph (real-time prices for each coin)
  const datasets = [{
    label: "Cryptocurrency Prices (USD)",
    data: data.map(coin => coin.current_price), // Use actual prices from the API
    backgroundColor: data.map(() => getRandomColor()), // Random colors for each bar
    borderColor: 'rgba(0,0,0,0.2)', // Border color for the bars
    borderWidth: 1
  }];

  // Render the bar comparison graph using Chart.js
  const ctx = document.createElement('canvas');
  comparisonGraphContainer.innerHTML = ''; // Clear previous graph
  comparisonGraphContainer.appendChild(ctx);

  new Chart(ctx, {
    type: 'bar', // Bar chart
    data: {
      labels: comparisonLabels, // Cryptocurrency names as labels
      datasets: datasets
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Cryptocurrencies' }
        },
        y: {
          title: { display: true, text: 'Price (USD)' },
          beginAtZero: false
        }
      },
      barPercentage: 0.8, // Adjusts the width of the bars
      categoryPercentage: 0.9, // Adjusts the distance between bars
      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
  });
}

function getRandomColor() {
  // Generate a random color in HEX format
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

fetchCryptoData();
