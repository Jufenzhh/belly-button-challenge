// Get references to the DOM elements
const dropdown = d3.select("#selDataset");
const barChart = d3.select("#bar");
const bubbleChart = d3.select("#bubble");
const gaugeChart = d3.select("#gauge");
const metadataPanel = d3.select("#sample-metadata");

// Function to update the bar chart
function updateBarChart(sample) {
  const trace1 = {
    x: sample.sample_values.slice(0, 10).reverse(),
    y: sample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
    text: sample.otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"
  };
  const barData = [trace1];
  Plotly.newPlot("bar", barData);
}

// Function to update the bubble chart
function updateBubbleChart(sample) {
  const trace2 = {
    x: sample.otu_ids,
    y: sample.sample_values,
    text: sample.otu_labels,
    mode: 'markers',
    marker: {
      color: sample.otu_ids,
      size: sample.sample_values
    }
  };
  const bubbleData = [trace2];
  Plotly.newPlot('bubble', bubbleData);
}

// Function to update the gauge chart
function updateGaugeChart(metadata) {
  const trace3 = {
    type: "indicator",
    mode: "gauge+number",
    value: metadata.wfreq,
    title: { text: "Belly Button Washing Frequency <br> Scrubs per Week", font: { size: 18 } },
    gauge: {
      axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "darkblue" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "transparent",
      steps: [
        { range: [0, 1], color: 'rgba(232, 226, 202, .5)' },
        // ... (remaining steps)
      ],
    }
  };
  const gaugeData = [trace3];
  Plotly.newPlot('gauge', gaugeData);
}

// Function to update metadata
function updateMetadata(metadata) {
  metadataPanel.html("");
  Object.entries(metadata).forEach(([key, value]) => {
    metadataPanel.append("p").text(`${key}: ${value}`);
  });
}

// Function to update dashboard when a new sample is selected
function updateDashboard(selectedSample, data) {
  const sample = data.samples.find(sample => sample.id === selectedSample);
  const metadata = data.metadata.find(meta => meta.id == selectedSample);

  updateBarChart(sample);
  updateBubbleChart(sample);
  updateGaugeChart(metadata);
  updateMetadata(metadata);
}

// Fetch the JSON data and update the dashboard
fetch("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(response => response.json())
  .then(data => {
    // Populate the dropdown
    data.names.forEach(name => {
      const option = dropdown.append("option");
      option.text(name);
      option.property("value", name);
    });

    // Update the dashboard when a new option is selected
    dropdown.on("change", function () {
      const newId = d3.select(this).property("value");
      updateDashboard(newId, data);
    });

    // Update the dashboard with the first sample
    updateDashboard(data.names[0], data);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });




