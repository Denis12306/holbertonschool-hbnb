document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-link');

    if (token) {
        if (loginLink) loginLink.style.display = 'none';
        fetchPlaces(token);
    } else {
        if (loginLink) loginLink.style.display = 'block';
        fetchPlaces(null);
    }
}

async function fetchPlaces(token) {
    const apiUrl = 'http://127.0.0.1:5000/api/v1/places/';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'Authorization': token ? `Bearer ${token}` : '' }
        });

        if (response.ok) {
            const places = await response.json();
            displayPlaces(places);
        } else {
            console.warn("Le serveur a répondu mais avec une erreur.");
        }
    } catch (error) {
        console.error("Impossible de joindre l'API (CORS ou Serveur éteint).");
        console.log("Le filtre va quand même être activé sur les éléments HTML statiques.");
    } finally {
        setupPriceFilter();
    }
}

function displayPlaces(places) {
    const placesList = document.getElementById('places-list');
    if (!placesList) return;

    placesList.innerHTML = '';

    places.forEach(place => {
        const card = document.createElement('div');
        card.classList.add('place-card');

        const price = place.price_by_night || place.price || 0;
        const name = place.name || place.title || "Unknown Place";

        card.setAttribute('data-price', price);

        card.innerHTML = `
            <div class="images-container">
                <img src="../images/place1.jpg" class="place-image" alt="${name}">
            </div>
            <div class="place-info">
                <h3>${name}</h3>
                <p>Price: $${price}/night</p>
                <a href="place.html?id=${place.id}" class="details-button">View Details</a>
            </div>
        `;

        placesList.appendChild(card);
    });
}

function setupPriceFilter() {
    const priceFilter = document.getElementById('price-filter');
    if (!priceFilter) return;

    const newFilter = priceFilter.cloneNode(true);
    priceFilter.parentNode.replaceChild(newFilter, priceFilter);

    newFilter.addEventListener('change', (event) => {
        const selectedValue = event.target.value.trim().toLowerCase();
        const allCards = document.querySelectorAll('.place-card');

        allCards.forEach(card => {
            const cardPrice = parseFloat(card.getAttribute('data-price'));

            if (selectedValue === 'all' || selectedValue === '') {
                card.style.display = 'flex';
            } else {
                const max = parseFloat(selectedValue);
                if (!isNaN(cardPrice) && cardPrice <= max) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
}
