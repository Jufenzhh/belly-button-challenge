# belly-button-challenge
the app.js script creates an interactive dashboard that displays data based on a selected sample from a dropdown menu.
The script starts by getting DOM Element References which grabs references to different HTML elements in the document using the D3 Library. 
The script then defines functions and displays the Bar Chart, Bubble Chart and Gauage Chart visualizations based on the sample values of OTUs.
The script then follows with the defining of the function of updatemetadata that updates the metadata panel from the metadata JSON object. 
Defines the main function of updatedashboard that takes a selected sample ID, then calls the function to update the visualizations.
Finally it fetches data and populates the dropdown using using the 'fetch' api and updates the dashboard with fetched data. 
