document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('weather-form');
  const resultDiv = document.getElementById('weather-result');

  // Empty state
  function showEmpty() {
    resultDiv.innerHTML = `
      <div class="weather-card empty">
        <div class="empty-icon">🌤️</div>
        <div class="empty-message">Découvrez la météo dans le monde entier.<br>Entrez le nom d'une ville pour commencer.</div>
      </div>
    `;
  }

  // Loading state
  function showLoading() {
    resultDiv.innerHTML = `
      <div class="loading-card">
        <div class="loading-icons">
          <span class="loading-icon">☀️</span>
          <span class="loading-icon">🌧️</span>
          <span class="loading-icon">🌬️</span>
        </div>
        <div class="empty-message">Chargement des données météo...</div>
      </div>
    `;
  }

  // Error state
  function showError(message) {
    resultDiv.innerHTML = `
      <div class="error-card">
        <div class="error-icon">⚠️</div>
        <div class="error-message">${message}</div>
        <button class="retry-btn" onclick="window.location.reload()">Réessayer</button>
      </div>
    `;
  }

  // Weather card
  function showWeather(data) {
    resultDiv.innerHTML = `
      <div class="weather-card">
        <div class="weather-header">
          <div class="weather-city">
            <h2>${data.city}</h2>
            <span class="weather-desc">${data.description}</span>
          </div>
          <img class="weather-main-icon" src="http://openweathermap.org/img/wn/${data.icon}@4x.png" alt="Icône météo">
        </div>
        <div class="weather-details">
          <div class="weather-detail">
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f321.svg" class="icon big" alt="Température">
            <span class="label">Température</span>
            <span class="value">${Math.round(data.temperature)} °C</span>
          </div>
          <div class="weather-detail">
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4a7.svg" class="icon big" alt="Humidité">
            <span class="label">Humidité</span>
            <span class="value">${data.humidity} %</span>
          </div>
          <div class="weather-detail">
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f32c.svg" class="icon big" alt="Vent">
            <span class="label">Vent</span>
            <span class="value">${Math.round(data.wind_speed * 10) / 10} m/s</span>
          </div>
        </div>
        <div class="weather-footer">
          Dernière mise à jour : ${new Date().toLocaleTimeString('fr-FR')}
        </div>
      </div>
    `;
  }

  // Initial state
  showEmpty();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();
    if (!city) {
      showError('Veuillez entrer une ville.');
      return;
    }
    showLoading();

    setTimeout(() => {
      fetch(`/api/weather/?city=${encodeURIComponent(city)}`)
        .then(resp => resp.json())
        .then(data => {
          if (data.error) {
            showError(data.error);
          } else {
            showWeather(data);
          }
        })
        .catch(() => {
          showError('Erreur lors de la récupération des données.');
        });
    }, 500);
  });
});