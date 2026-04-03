document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
});

// --- Gestion des Cookies ---
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// --- Vérification de l'Authentification ---
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

// --- Récupération des données API ---
async function fetchPlaces(token) {
    const apiUrl = 'http://127.0.0.1:5000/api/v1/places/';
    const headers = { 'Content-Type': 'application/json' };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(apiUrl, { method: 'GET', headers: headers });
        if (response.ok) {
            const places = await response.json();
            displayPlaces(places);

            setupPriceFilter();
        } else {
            console.error('Erreur lors de la récupération des lieux');
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
    }
}

// --- Affichage Dynamique des Lieux ---
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

// --- Filtrage Client-Side ---
function setupPriceFilter() {
    const priceFilter = document.getElementById('price-filter');
    if (!priceFilter) return;

    const newFilter = priceFilter.cloneNode(true);
    priceFilter.parentNode.replaceChild(newFilter, priceFilter);

    newFilter.addEventListener('change', (event) => {
        const selectedMaxPrice = event.target.value;
        const allCards = document.querySelectorAll('.place-card');

        allCards.forEach(card => {
            const cardPrice = parseFloat(card.getAttribute('data-price'));

            if (selectedMaxPrice === 'All' || selectedMaxPrice === 'all') {
                card.style.display = 'flex'; //
            } else {
                const max = parseFloat(selectedMaxPrice);
                card.style.display = (cardPrice <= max) ? 'flex' : 'none';
            }
        });
    });
}
