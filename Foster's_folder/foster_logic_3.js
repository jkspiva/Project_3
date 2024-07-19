// Select elements
const chartSelector = document.getElementById('chartSelector');
const chartDisplay = document.getElementById('chartDisplay');
const canvas = document.getElementById('myChart').getContext('2d');

// Default CSV file
const defaultCsv = '2001_alc_data.csv'; // Default CSV file

// Initialize default data with 2001 CSV
let defaultData = {}; // Placeholder for default data
let defaultChart; // Placeholder for default chart

// Load 2001 CSV data for default chart
loadChart(defaultCsv);

// Event listener for dropdown change
chartSelector.addEventListener('change', function() {
    const selectedCsv = this.value;
    
    // Remove previous chart if exists
    if (defaultChart) {
        defaultChart.destroy();
    }

    // Load and render the selected CSV file
    loadChart(selectedCsv);
});

function loadChart(csvFile) {
    d3.csv(csvFile).then(function(data) {
        // Assuming the CSV data has columns like 'state', 'beer_per_capita', 'wine_per_capita', etc.
        const states = data.map(d => d.state);
        const beerData = data.map(d => parseFloat(d.beer_per_capita));
        const wineData = data.map(d => parseFloat(d.wine_per_capita));
        const spiritsData = data.map(d => parseFloat(d.spirits_per_capita));
        const allData = data.map(d => parseFloat(d.all_alc));

        // Create default data for chart
        defaultData = {
            labels: states,
            datasets: [
                {
                    label: 'Beer per Capita',
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    data: beerData,
                },
                {
                    label: 'Wine per Capita',
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    data: wineData,
                },
                {
                    label: 'Spirits per Capita',
                    backgroundColor: 'rgba(255, 206, 86, 0.7)',
                    data: spiritsData,
                },
                {
                    label: 'All Beverages per Capita',
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                    data: allData,
                }
            ]
        };

        // Create bar chart using Chart.js
        defaultChart = new Chart(canvas, {
            type: 'bar',
            data: defaultData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Alcohol Consumption Trends (${csvFile})`
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'State'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Per Capita Consumption'
                        },
                        beginAtZero: true // Start y-axis from zero
                    }
                }
            }
        });

    }).catch(function(error) {
        console.log('Error loading CSV:', error);
    });
}