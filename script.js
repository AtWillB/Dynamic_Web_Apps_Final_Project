/*Put helper functions here*/


async function mainEvent() {
  // the async keyword means we can make API requests
  const loadDataButton = document.querySelector("#data_load");

  

  // Example function for yoinking data from
  loadDataButton.addEventListener("click", async (submitEvent) => {
    // async has to be declared on every function that needs to "await" something
    console.log("loading data");
    loadAnimation.style.display = "inline-block";


    const results = await fetch(
      "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
    );

    const storedList = await results.json();
    localStorage.setItem("storedData", JSON.stringify(storedList));
    pasrsedData = storedList;


    console.table(storedList);
  });
}

document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
