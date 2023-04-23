async function get_vis_data(url){
  results = await fetch(url);
  return results;
}



async function mainEvent() {
  // the async keyword means we can make API requests
  // const loadDataButton = document.querySelector("#data_load");

  

  // Example function for yoinking data froms
  // loadDataButton.addEventListener("click", async (submitEvent) => {
    // async has to be declared on every function that needs to "await" something
    console.log("loading data");
    // loadAnimation.style.display = "inline-block";


    results  = await fetch("https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+DISTINCT discoverymethod, count(discoverymethod)+from+ps+groupby+discoverymethod&format=json");
    console.log(results);
}

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
