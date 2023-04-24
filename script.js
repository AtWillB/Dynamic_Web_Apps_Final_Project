async function get_vis_data(url){
  results = await fetch(url);
  return results.json();
}

function get_column(list){
  const new_column = [];
  list.forEach((item) => {
    new_column.push(item);
  })
  return new_column
}



async function mainEvent() {
  // the async keyword means we can make API requests
  // const loadDataButton = document.querySelector("#data_load");

  

  // Example function for yoinking data froms
  // loadDataButton.addEventListener("click", async (submitEvent) => {
    // async has to be declared on every function that needs to "await" something
    console.log("loading data");
    // loadAnimation.style.display = "inline-block";


    const results  = await get_vis_data("https://exo-dash-planets.vercel.app/api/vis/discovery_methods_bar");
    console.log(results);

    const x_values = get_column(results.X);
    const y_values = get_column(results.Y);
    console.log(y_values);
    console.log(x_values);



    new Chart("discoveryChart", {
      type: "bar",
      data: {
        labels: x_values,
        datasets: [{
          label: 'Count',
          data: y_values,
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Number of Exoplanets Found by Method'
          },
          legend: {
            display: false,
          }
        },
        scales: {
          y: {
            type: 'logarithmic',
          },
        },
      }
    });
}

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
