  // Sélection des différents éléments du javascript
  const weatherFormEl = document.querySelector(".form");
  const locationInputEl = document.querySelector(".form__input");
  const weatherDataContainerEl = document.querySelector(".data");
  const btnSearch = document.getElementById("btnSearch");

  const data__city = document.getElementById("data__city");
  const data__updated = document.getElementById("data__updated");
  const data__icon = document.getElementById("data__icon");
  const data__temperature = document.getElementById("data__temperature");
  const data__current = document.getElementById("data__current");
  const data__humidity = document.getElementById("data__humidity");
  const data__wind = document.getElementById("data__wind");
  const card = document.getElementById("card");

  var direction = { "W": "Ouest", "N": "Nord", "S": "Sud", "E": "Est", "NE": "Nord-Est", "NW": "Nord-Ouest", "SE": "Sud-Est", "SW": "Sud-Ouest", "SSW": "Sud-Sud-Ouest", "SSE": "Sud-Sud-Est","ESE":"Est-Sud-Est","NNE": "Nord-Nord-Est", "NNW": "Nord-Nord-Ouest", "WNW": "Ouest-Nord-Ouest" };

  const defaultLocation = "Saint-Etienne";
  locationInputEl.addEventListener("keypress", (event) => {
    card.classList.remove("appearCard");
    if (event.key === "Enter") {
      event.preventDefault();
      btnSearch.click();
    }
  })

  // Choix de la ville sur le click
  btnSearch.addEventListener("click", () => {

    const enteredLocation = locationInputEl.value.trim();

    if (enteredLocation === "") {
      // Message d'erreur si la ville demandée n'est pas comprise
      weatherDataContainerEl.textContent = "Please enter a valid location";

    } else {
      // Recherche et Affichage des informations météo
      displayWeatherData(enteredLocation.charAt(0).toUpperCase() + enteredLocation.slice(1));
    }
  });

 
  // Opération asynchrone
  const displayWeatherData = (location) => {
    const API_KEY = "3d1853a7fd9b499794571220230607";
    
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`)
      .then((response) => {


        return response.json();

      })
      .then((data) => {
        // Supprimer l'ancienne demande
console.log(data);
        weatherDataContainerEl.textContent = "";


        // Partie à renseigner à l'aide de la documentation technique en ligne et de votre formateur
        data__city.textContent = data.location.name;                                                     // Mettre à jour data__city.textContent
        data__humidity.innerHTML = '<i class="fas fa-droplet"></i> ' +data.current.humidity+"%";         // Mettre à jour data__humidity.innerHTML 
        data__updated.textContent =  "Mis à jour à: "+ data.current.last_updated.slice(11);                                        // Mettre à jour data__updated.textContent 
        data__wind.innerHTML = '<i class="fas fa-wind"></i> '+data.current.wind_kph+"km/h "+direction[data.current.wind_dir];               // Mettre à jour data__wind.innerHTML
        data__temperature.textContent = data.current.temp_c+"°C";                                          // Mettre à jour data__temperature.textContent 
        
        
        // Mettre à jour card.classList
        card.classList.add("appearCard");
        // Mettre à jour  l'url de l'icone météo reçue data__icon.src 

        data__icon.src = data.current.condition.icon;

      })
      .catch(() => {
        // Display an error message in the weather data container
        weatherDataContainerEl.textContent =
          "Error occurred while fetching weather data, check the spelling.";
      });


  };

  displayWeatherData(defaultLocation);
