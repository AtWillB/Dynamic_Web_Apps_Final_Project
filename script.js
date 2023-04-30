async function create_chart(vis_promise) {
  results = await vis_promise.json();
  console.log(results);

  new Chart(results.Title, 
      {type: "bar", data: {
            labels: results.X,
            datasets: [{ label: 'Count', data: results.Y,}]
      }, 
      options: { plugins: { 
            title: { display: true, text: results.Title},
            legend: {display: false,}},
            scales: { y: { type: 'logarithmic',},},} });
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
    disc_vis = await fetch("https://exo-dash-planets.vercel.app/api/vis/discovery_methods_bar");
    stell_vis = await fetch("https://exo-dash-planets.vercel.app/api/vis/stellar_type_bar");
    create_chart(disc_vis)


    // create_chart(stell_vis)
    



    // const results  = await get_vis_data("https://exo-dash-planets.vercel.app/api/vis/discovery_methods_bar");
    // console.log(results);


    dropdownButton.addEventListener("change", async (event) => {
      results = await get_vis(dropdownButton.value);
      // console.log(results.X);
      // console.log(results.Y);

      new Chart("discoveryChart", 
      {type: "bar", data: {
            labels: results.X,
            datasets: [{ label: 'Count', data: results.Y,}]
      }, 
      options: { plugins: { 
            title: { display: true, text: 'Number of Exoplanets Found by Method'},
            legend: {display: false,}},
            scales: { y: { type: 'logarithmic',},},} });
    
    })

    
}

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
