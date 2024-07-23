let allBeveragesData = {};
let allYears = new Set();
let currentYear = null;
let allBeveragesChart = null;

// Load the JSON data
d3.json("Alcohol_Consumption_US.json").then(function(data) {
    data.forEach(d => {
        if (!allBeveragesData[d.State]) {
            allBeveragesData[d.State] = [];
        }
        allBeveragesData[d.State].push({
            year: d.Year,
            allBeverages: d["All beverages (Per capita consumption)"]
        });
        allYears.add(d.Year);
    });

    // Populate the year dropdown
    const yearSelect = document.getElementById('yearSelect');
    allYears = Array.from(allYears).sort();
    allYears.forEach(year => {
        let option = document.createElement('option');
        option.value = year;
        option.text = year;
        yearSelect.add(option);
    });

    // Set the default year
    currentYear = allYears[0];
    yearSelect.value = currentYear;

    // Update the chart for the default year
    updateAllBeveragesChart();
});

// Function to update the all beverages chart based on the selected year
function updateAllBeveragesChart() {
    currentYear = document.getElementById('yearSelect').value;
    
    let stateBeveragesData = [];
    Object.keys(allBeveragesData).forEach(state => {
        let stateYearData = allBeveragesData[state].find(d => d.year == currentYear);
        if (stateYearData) {
            stateBeveragesData.push({ state: state, allBeverages: stateYearData.allBeverages });
        }
    });

    stateBeveragesData.sort((a, b) => b.allBeverages - a.allBeverages);

    let labels = stateBeveragesData.map(d => d.state);
    let data = stateBeveragesData.map(d => d.allBeverages);

    var ctx = document.getElementById('allBeveragesChart').getContext('2d');
    if (allBeveragesChart) {
        allBeveragesChart.destroy();
    }
    allBeveragesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `All Beverages Consumption (${currentYear})`,
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}