document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('weather-form');
  const resultDiv = document.getElementById('weather-result');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();
    if (!city) {
      resultDiv.innerHTML = `<p class="error">Veuillez entrer une ville.</p>`;
      return;
    }

    resultDiv.innerHTML = `<p>Chargement...</p>`;

    fetch(`/api/weather/?city=${encodeURIComponent(city)}`)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          resultDiv.innerHTML = `<p class="error">${data.error}</p>`;
        } else {
          resultDiv.innerHTML = `
            <div class="weather-card">
              <h2>${data.city}</h2>
              <img src="http://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Icône météo">
              <p>Température : ${data.temperature} °C</p>
              <p>Humidité : ${data.humidity} %</p>
              <p>Vent : ${data.wind_speed} m/s</p>
              <p>Description : ${data.description}</p>
            </div>
          `;
        }
      })
      .catch(err => {
        console.error(err);
        resultDiv.innerHTML = `<p class="error">Erreur lors de la récupération des données.</p>`;
      });
  });
});
