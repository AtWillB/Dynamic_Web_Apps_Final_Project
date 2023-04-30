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

  dropdownButton.style

  

  // Example function for yoinking data froms
  // loadDataButton.addEventListener("click", async (submitEvent) => {
    // async has to be declared on every function that needs to "await" something
    console.log("loading data");
    // loadAnimation.style.display = "inline-block";
    disc_vis = await fetch_json("https://exo-dash-planets.vercel.app/api/vis/discovery_methods_bar");
    stell_vis = await fetch_json("https://exo-dash-planets.vercel.app/api/vis/stellar_type_bar");
    chart = await create_chart(disc_vis)

    // console.log(chart.config.data.datasets[].data);

    

    // chart.config.data.datasets[0].data = stell_vis.Y
    // chart.config.data.labels = stell_vis.X
    // chart.update();

    console.log(chart.config.options.plugins.title['text']);


    // console.log(chart);

    dropdownButton.addEventListener("change", async (event) => {
      if (dropdownButton.value == "disc") {
          chart.config.data.datasets[0].data = disc_vis.Y;
          chart.config.data.labels = disc_vis.X;
          chart.config.options.plugins.title['text'] = "Number of Different Discovery Methods";

      }
      else if (dropdownButton.value == "stell") {
        chart.config.data.datasets[0].data = stell_vis.Y;
        chart.config.data.labels = stell_vis.X;
        chart.config.options.plugins.title['text'] = "Number of Different Stellar Types ";
      }      
      chart.update();

    
    })

    
}

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
