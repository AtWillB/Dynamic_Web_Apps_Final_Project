async function load_to_local() {
  disc_vis = await fetch_json("https://exo-dash-planets.vercel.app/api/vis/discovery_methods_bar");
  stell_vis = await fetch_json("https://exo-dash-planets.vercel.app/api/vis/stellar_type_bar");

  localStorage.setItem('disc_vis', JSON.stringify(disc_vis));
  localStorage.setItem('stell_vis', JSON.stringify(stell_vis));
  
}

async function fetch_json(url) {
  results = await fetch(url);
  results = await results.json();
  return results;
}

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
  const disc_chart = document.querySelector("#discovery_method");
  const stellar_chart = document.querySelector("#stellar_type");


  


  console.log("loading data");
  load_to_local(); // load data into local storage
  
  disc_vis = localStorage.getItem("disc_vis");
  disc_vis = JSON.parse(disc_vis);
  stell_vis = localStorage.getItem("stell_vis");
  stell_vis = JSON.parse(stell_vis);




  chart = await create_chart(disc_vis)


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

    
}

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
