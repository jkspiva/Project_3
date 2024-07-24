README: Alcohol Consumption Visualization Project

Overview

This project visualizes the per capita alcohol consumption across different states in the US from 1980 to 2016. The data is displayed through various visualizations such as line charts, bar charts, pie charts, and an interactive map. The project utilizes HTML, CSS, JavaScript, Chart.js, and D3.js to render the visualizations, ensuring an informative and engaging user experience.

Data and Files

The primary dataset, Alcohol_Consumption_US.csv, contains state-wise alcohol consumption data categorized by beer, wine, and spirits. This data is parsed and utilized to create dynamic visualizations. The all_beverages.html file serves as the main HTML structure, incorporating various scripts and styles to render the visualizations. The christian_style.css file provides the styling for the visual elements, while the logic_christian.js and foster_logic_3.js files contain the logic for creating and updating charts and maps based on user interactions.

Visualizations and Features

	•	Line Chart: Displays the total alcohol consumption of each state over time.
	•	Bar Chart: Allows users to select different years and visualize per capita consumption of beer, wine, and spirits for each state.
	•	Pie Chart: Shows the distribution of beer, wine, and spirits consumption for a selected state and year.
	•	Interactive Map: Highlights states and provides detailed alcohol consumption data when a state is selected.
	•	Dynamic Updates: Users can select different years from a dropdown, and the visualizations update accordingly to reflect the data for the selected year.

How to Run

	1.	Prerequisites: Ensure you have a modern web browser that supports JavaScript.
	2.	Files: Place all the project files (all_beverages.html, christian_style.css, logic_christian.js, foster_logic_3.js, Alcohol_Consumption_US.csv) in the same directory.
	3.	Open HTML: Open all_beverages.html in a web browser to start exploring the visualizations.
	4.	Interactivity: Use the dropdown menus and map interactions to explore different years and states, observing how the visualizations change dynamically.

Technical Details

	•	HTML: Structures the main layout and incorporates external scripts for chart rendering.
	•	CSS: Styles the visual elements, ensuring a consistent and visually appealing interface.
	•	JavaScript: Handles data parsing, chart creation, and interactivity. Uses D3.js for CSV parsing and Chart.js for creating charts.
	•	CSV Data: Parsed and utilized to dynamically populate charts and maps based on user selections.

Conclusion

This project provides a comprehensive visualization of alcohol consumption trends across the US, allowing users to explore data interactively. By leveraging modern web technologies, it offers an engaging way to understand how alcohol consumption patterns have evolved over time.

References

	•	Chart.js: Chart.js Documentation
	•	D3.js: D3.js Documentation
	•	Leaflet: Leaflet Documentation