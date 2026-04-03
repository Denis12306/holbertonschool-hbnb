function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

async function loginUser(email, password) {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      document.cookie = `token=${data.access_token}; path=/`;
      window.location.href = 'index.html';
    } else {
      const errorText = await response.text();
      alert('Login failed: ' + errorText);
    }
  } catch (error) {
    console.error(error);
    alert('Error during login');
  }
}

function setupLoginForm() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await loginUser(email, password);
  });
}

async function fetchPlaces(token) {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/places', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });

    if (response.ok) {
      const places = await response.json();
      displayPlaces(places);
      setupPriceFilter();
    } else {
      alert('Failed to fetch places: ' + response.statusText);
    }
  } catch (error) {
    console.error(error);
    alert('Error fetching places');
  }
}

function displayPlaces(places) {
  const list = document.getElementById('places-list');
  if (!list) return;
  list.innerHTML = '';

  places.forEach(place => {
    const div = document.createElement('div');
    div.className = 'place-card';
    div.dataset.price = place.price;
    div.innerHTML = `
      <h3>${place.name}</h3>
      <p>${place.description}</p>
      <p>Price: $${place.price}/night</p>
      <a href="place.html?id=${place.id}" class="details-button">View Details</a>
    `;
    list.appendChild(div);
  });
}

places.forEach(place => {
  const div = document.createElement('div');
  div.className = 'place-card';
  div.dataset.price = place.price;
  div.style.display = 'flex';
  div.innerHTML = `
      <h3>${place.name}</h3>
      <p>${place.description}</p>
      <p>Price: $${place.price}/night</p>
      <a href="place.html?id=${place.id}" class="details-button">View Details</a>
    `;
  list.appendChild(div);
});


function setupPriceFilter() {
  const filter = document.getElementById('price-filter');
  if (!filter) return;

  filter.addEventListener('change', () => {
    const maxPrice = filter.value;
    document.querySelectorAll('.place-card').forEach(card => {
      const price = parseFloat(card.dataset.price);
      card.style.display = (maxPrice === 'All' || price <= parseFloat(maxPrice)) ? 'block' : 'none';
    });
  });
}

function getPlaceIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function fetchPlaceDetails(token, placeId) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/places/${placeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });

    if (response.ok) {
      const place = await response.json();
      displayPlaceDetails(place);
    } else {
      alert('Failed to fetch place details: ' + response.statusText);
    }
  } catch (error) {
    console.error(error);
    alert('Error fetching place details');
  }
}

function displayPlaceDetails(place) {
  const detailsSection = document.getElementById('place-details');
  if (!detailsSection) return;
  detailsSection.innerHTML = '';

  const div = document.createElement('div');
  div.className = 'place-details';
  div.innerHTML = `
    <h3 class="details-title">${place.name}</h3>
    <p class="place-info"><b>Description:</b> ${place.description}</p>
    <p class="place-info"><b>Location:</b> ${place.latitude}, ${place.longitude}</p>
    <p class="place-info"><b>Price per night:</b> $${place.price}</p>
    <p class="place-info"><b>Amenities:</b> ${place.amenities.length ? place.amenities.map(a => a.name).join(', ') : 'None'}</p>
    <p class="place-info"><b>Host:</b> ${place.owner.first_name} ${place.owner.last_name} (${place.owner.email})</p>
  `;
  detailsSection.appendChild(div);

  const reviewsSection = document.getElementById('reviews');
  if (reviewsSection) {
    reviewsSection.innerHTML = '<h3>Reviews:</h3>';
    if (place.reviews.length) {
      place.reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review-card';
        reviewDiv.innerHTML = `
          <p><i>${review.user.first_name} ${review.user.last_name}</i></p>
          <div>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
          <p>${review.text}</p>
        `;
        reviewsSection.appendChild(reviewDiv);
      });
    } else {
      const reviewDiv = document.createElement('div');
      reviewDiv.className = 'review-card';
      reviewDiv.innerHTML = '<p>No reviews for this place</p>';
      reviewsSection.appendChild(reviewDiv);
    }
  }
}

function checkAuthForPlaceDetails(placeId) {
  const token = getCookie('token');
  const addReviewSection = document.getElementById('add-review');
  if (!addReviewSection) return;

  if (!token) addReviewSection.style.display = 'none';
  else {
    addReviewSection.style.display = 'block';
    fetchPlaceDetails(token, placeId);
  }
}

async function submitReview(token, placeId, reviewText, rating) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/places/${placeId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text: reviewText, rating: rating })
    });

    if (response.ok) {
      alert('Review submitted successfully!');
      document.getElementById('review-form').reset();
    } else {
      const errorText = await response.text();
      alert('Failed to submit review: ' + errorText);
    }
  } catch (error) {
    console.error(error);
    alert('Error submitting review');
  }
}

function setupAddReviewForm() {
  const reviewForm = document.getElementById('review-form');
  if (!reviewForm) return;

  const token = getCookie('token');
  if (!token) return;

  const placeId = getPlaceIdFromURL();
  if (!placeId) return;

  reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const reviewText = document.getElementById('review').value.trim();
    const rating = parseInt(document.getElementById('rating').value);
    if (!reviewText || !rating) {
      alert('Please enter review text and select a rating');
      return;
    }
    await submitReview(token, placeId, reviewText, rating);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupLoginForm();

  const placesList = document.getElementById('places-list');
  if (placesList) {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-link');
    if (loginLink) loginLink.style.display = token ? 'none' : 'block';

    fetchPlaces(token);
    setupPriceFilter();
  }

  const placeDetailsSection = document.getElementById('place-details');
  if (placeDetailsSection) {
    const placeId = getPlaceIdFromURL();
    checkAuthForPlaceDetails(placeId);
  }

  setupAddReviewForm();
});
