// Load data into local storage
async function load_to_local() {
  disc_vis = await fetch_json("https://exo-dash-planets.vercel.app/api/vis/discovery_methods_bar");
  stell_vis = await fetch_json("https://exo-dash-planets.vercel.app/api/vis/stellar_type_bar");
  num_planets = await fetch_json("https://exo-dash-planets.vercel.app/api/stat/num_planets");


  localStorage.setItem('disc_vis', JSON.stringify(disc_vis));
  localStorage.setItem('stell_vis', JSON.stringify(stell_vis));
  localStorage.setItem('num_planets', JSON.stringify(num_planets));
}

// retrieve data from localstorage
function retrieve_from_local(item) {
  result = "";

  if (item == "disc_vis") {
    result = localStorage.getItem("disc_vis");
    result = JSON.parse(result);
  }
  else if (item == "stell_vis") {
    result = localStorage.getItem("stell_vis");
    result = JSON.parse(result);
  }

  else if (item == "num_planets") {
    result = localStorage.getItem("num_planets");
    result = JSON.parse(result);
  }

  return result
}

// short function for grabbing json from fetch request
async function fetch_json(url) {
  results = await fetch(url);
  results = await results.json();
  return results;
}

//function to make the chart
async function create_chart(results) {
  console.log(results);

  chart = new Chart(results.Title, 
      {type: "bar", data: {
            labels: results.X,
            datasets: [{ label: 'Count', data: results.Y,}]
      }, 
      options: { plugins: { 
            title: { display: true, text: "Number of Different Discovery Methods"},
            legend: {display: false,}},
            scales: { y: { type: 'logarithmic',},},} });
  return chart;
}





async function mainEvent() {
  // the async keyword means we can make API requests
  const dropdownButton = document.querySelector("#vis_selector");



  


  console.log("loading data");
  load_to_local(); // load data into local storage

  const disc_vis = retrieve_from_local('disc_vis');
  const stell_vis = retrieve_from_local('stell_vis');

  chart = await create_chart(disc_vis)

  // Drop down button changes the visualization
  dropdownButton.addEventListener("change", async (event) => {
    if (dropdownButton.value == "disc") {
        chart.config.data.datasets[0].data = disc_vis.Y;
        chart.config.data.labels = disc_vis.X;
        chart.config.options.plugins.title['text'] = "Number of Different Discovery Methods";

    }
    else if (dropdownButton.value == "stell") {
      chart.config.data.datasets[0].data = stell_vis.Y;
      chart.config.data.labels = stell_vis.X;
      chart.config.options.plugins.title['text'] = "Number of Different Star Types ";
    }      
    chart.update();

    
  })

  // 

    
}

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
