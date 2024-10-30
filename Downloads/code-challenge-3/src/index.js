// Base URL for API requests
const baseUrl = "http://localhost:3000";

// Fetch and display the first movie's details
document.addEventListener("DOMContentLoaded", () => {
  loadFirstMovie();
  loadMoviesList();
});

// Load the first movie details when the page loads
function loadFirstMovie() {
  fetch(`${baseUrl}/films/1`)
    .then((response) => response.json())
    .then((film) => {
      displayMovieDetails(film);
    })
    .catch((error) => console.error("Error loading movie:", error));
}

// Display movie details in the DOM
function displayMovieDetails(film) {
  document.getElementById("poster").src = film.poster;
  document.getElementById("title").textContent = film.title;
  document.getElementById("runtime").textContent = `Runtime: ${film.runtime} mins`;
  document.getElementById("showtime").textContent = `Showtime: ${film.showtime}`;
  document.getElementById("description").textContent = film.description;

  const availableTickets = film.capacity - film.tickets_sold;
  document.getElementById("ticket-count").textContent = `Available Tickets: ${availableTickets}`;
  document.getElementById("buy-ticket").textContent = availableTickets > 0 ? "Buy Ticket" : "Sold Out";

  // Event listener for the Buy Ticket button
  document.getElementById("buy-ticket").onclick = () => buyTicket(film);
}

// Load and display the list of all movies
function loadMoviesList() {
  fetch(`${baseUrl}/films`)
    .then((response) => response.json())
    .then((films) => {
      const filmsList = document.getElementById("films");
      filmsList.innerHTML = ""; // Clear placeholder content

      films.forEach((film) => {
        const filmItem = document.createElement("li");
        filmItem.className = "film item";
        filmItem.textContent = film.title;

        // Add a delete button to each film
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteFilm(film.id, filmItem);
        
        filmItem.appendChild(deleteButton);
        filmItem.onclick = () => loadMovieDetails(film.id);
        filmsList.appendChild(filmItem);
      });
    })
    .catch((error) => console.error("Error loading movies list:", error));
}

// Load movie details when clicked from the list
function loadMovieDetails(movieId) {
  fetch(`${baseUrl}/films/${movieId}`)
    .then((response) => response.json())
    .then((film) => {
      displayMovieDetails(film);
    })
    .catch((error) => console.error("Error loading movie details:", error));
}

// Function to handle buying a ticket
function buyTicket(film) {
  const availableTickets = film.capacity - film.tickets_sold;
  
  if (availableTickets > 0) {
    const updatedTicketsSold = film.tickets_sold + 1;
    
    // PATCH request to update tickets sold
    fetch(`${baseUrl}/films/${film.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tickets_sold: updatedTicketsSold }),
    })
      .then((response) => response.json())
      .then((updatedFilm) => {
        displayMovieDetails(updatedFilm);
      })
      .catch((error) => console.error("Error updating tickets:", error));
  } else {
    document.getElementById("buy-ticket").textContent = "Sold Out";
  }
}

// Function to delete a movie
function deleteFilm(filmId, filmElement) {
  fetch(`${baseUrl}/films/${filmId}`, {
    method: "DELETE",
  })
    .then(() => {
      filmElement.remove(); // Remove film from the list in the DOM
    })
    .catch((error) => console.error("Error deleting movie:", error));
}
