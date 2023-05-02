// Load data into local storage
async function load_to_local() {
  disc_vis = await fetch_json("https://exo-dash-planets.vercel.app/api/vis/discovery_methods_bar");
  stell_vis = await fetch_json("https://exo-dash-planets.vercel.app/api/vis/stellar_type_bar");
  // year_vis  = await fetch_json("https://exo-dash-planets.vercel.app/api/vis/disc_year_line");
  num_planets = await fetch_json("https://exo-dash-planets.vercel.app/api/stat/num_planets");
  num_systems = await fetch_json("https://exo-dash-planets.vercel.app/api/stat/num_systems");
  avg_mass_planet_e = await fetch_json("https://exo-dash-planets.vercel.app/api/stat/avg_mass_planet_e");


  localStorage.setItem('disc_vis', JSON.stringify(disc_vis));
  localStorage.setItem('stell_vis', JSON.stringify(stell_vis));
  // localStorage.setItem('year_vis', JSON.stringify(year_vis));
  localStorage.setItem('num_planets', JSON.stringify(num_planets));
  localStorage.setItem('num_systems', JSON.stringify(num_systems));
  localStorage.setItem('avg_mass_planet_e', JSON.stringify(avg_mass_planet_e));

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
  else if (item == "year_vis") {
    result = localStorage.getItem("year_vis");
    result = JSON.parse(result);
  }

  else if (item == "num_planets") {
    result = localStorage.getItem("num_planets");
    result = JSON.parse(result);
  }

  else if (item == "num_systems" ) {
    result = localStorage.getItem("num_systems");
    result = JSON.parse(result);
  }
  else if (item == "avg_mass_planet_e") {
    result = localStorage.getItem("avg_mass_planet_e");
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

  chart = new Chart(results.Title, 
      {type: "bar", data: {
            labels: results.X,
            datasets: [{ label: 'Count', data: results.Y,}]
      }, 
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { 
            title: { display: true, text: "Number of Different Discovery Methods"},
            legend: {display: false,}},
            scales: { y: { type: 'logarithmic',},},
      }

  });
  return chart;
}





async function mainEvent() {
  // the async keyword means we can make API requests
  const dropdownButton = document.querySelector("#vis_selector");
  const stat1_text = document.querySelector("#stat1");
  const stat2_text = document.querySelector("#stat2");
  const stat3_text = document.querySelector("#stat3");




  


  console.log("loading data");
  load_to_local(); // load data into local storage

  const disc_vis = retrieve_from_local('disc_vis');
  const stell_vis = retrieve_from_local('stell_vis');
  // const year_vis = retrieve_from_local('year_vis');

  chart = await create_chart(disc_vis)

  // Drop down button changes the visualization
  dropdownButton.addEventListener("change", async (event) => {
    if (dropdownButton.value == "disc") {
        data = {datasets: [{data: disc_vis.Y}], labels: disc_vis.X};
        chart.config.data = data;
        chart.config.type = "bar";
        chart.config.options.plugins.title['text'] = "Number of Different Exoplanet Discovery Methods";
        chart.config.options.plugins.scales = { y: { type: 'logarithmic',}};

    }
    else if (dropdownButton.value == "stell") {
      data = {datasets: [{data: stell_vis.Y}], labels: stell_vis.X};
      chart.config.type = "pie";
      chart.config.data = data
      chart.config.options.plugins.title['text'] = "Host Stars Spectral Types of Exoplanets as Pie Chart";
      chart.config.options.plugins.scales = {};
      console.log(chart);
    }
    else if (dropdownButton.value == "year") {
      data = {datasets: [{data: year_vis.Y}], labels: year_vis.X};
      chart.config.type = "line";
      chart.config.data = data
      chart.config.options.plugins.title['text'] = "Number of Exoplanet Discoveries per Year";
      chart.config.options.plugins.scales = {};
    }      
    chart.update();

    
  })

  // Placing the statistics
  const stat1 = retrieve_from_local('num_planets');
  stat1_text.innerHTML = 'Total Number of Exo-Planets: '+stat1.num_planets.toString();

  const stat2 = retrieve_from_local('num_systems');
  stat2_text.innerHTML = 'Total Number of Star Systems: '+stat2.num_systems.toString();

  const stat3 = retrieve_from_local('avg_mass_planet_e');
  stat3_text.innerHTML = 'Average planetary mass(Earth masses): '+stat3.avg_mass_planet_e.toFixed(2).toString();
    
}

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
