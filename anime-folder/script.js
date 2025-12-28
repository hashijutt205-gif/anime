/* for navbar */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('toggle');
});
/* for  hiding the navbar  */



/* For BookMark */
// Bookmark functionality
document.querySelectorAll(".bookmark-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".anime-card");
    const title = card.querySelector("h3").innerText;
    const img = card.querySelector("img").src;

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    // Check if already exists
    const exists = bookmarks.some((anime) => anime.title === title);

    if (!exists) {
      bookmarks.push({ title, img });
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

      this.querySelector("i").classList.remove("far"); // empty icon
      this.querySelector("i").classList.add("fas"); // filled icon
      alert(`${title} added to bookmarks!`);
    } else {
      alert(`${title} is already in your bookmarks!`);
    }
  });
});
/* for page */
function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  // Show the selected page
  document.getElementById(pageId).classList.add('active');

  // Highlight active navbar link
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => link.classList.remove('active-link'));
  const activeLink = Array.from(links).find(link => link.getAttribute('onclick')?.includes(pageId));
  if (activeLink) activeLink.classList.add('active-link');
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}
/* for anime folder */
function filterAnime() {
  const selectedGenre = document.getElementById('genre-filter').value.toLowerCase();
  const searchText = document.getElementById('anime-search').value.toLowerCase();
  const cards = document.querySelectorAll('.anime-card');

  cards.forEach(card => {
    const genre = card.getAttribute('data-genre').toLowerCase();
    const title = card.getAttribute('data-title').toLowerCase();

    const matchesGenre = selectedGenre === 'all-genre' || genre.includes(selectedGenre);
    const matchesSearch = title.includes(searchText);

    card.style.display = (matchesGenre && matchesSearch) ? 'block' : 'none';
  });
}
/* for anime folder genres */
function filterAnime() {
  const searchInput = document.getElementById("anime-search").value.toLowerCase().trim();
  const genreSelect = document.getElementById("genre-filter").value.toLowerCase();
  const cards = document.querySelectorAll(".anime-card");

  cards.forEach(card => {
    const title = card.getAttribute("data-title").toLowerCase();
    const genres = card.getAttribute("data-genre").toLowerCase();

    const matchesSearch = title.includes(searchInput);
    const matchesGenre = (genreSelect === "all-genre" || genres.includes(genreSelect));

    if (matchesSearch && matchesGenre) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

/* for search bar */
function filterAnime() {
  // Get user input and selected genre
  const searchInput = document.getElementById("anime-search").value.toLowerCase();
  const genreFilter = document.getElementById("genre-filter").value.toLowerCase();

  // Get all anime cards
  const cards = document.querySelectorAll(".anime-card");

  // Track if any anime matches
  let found = false;

  // Loop through each card
  cards.forEach(card => {
    const title = card.getAttribute("data-title").toLowerCase();
    const genres = card.getAttribute("data-genre").toLowerCase();

    // Check for search and genre match
    const matchesSearch = title.includes(searchInput) || genres.includes(searchInput);
    const matchesGenre = genreFilter === "all-genre" || genres.includes(genreFilter);

    if (matchesSearch && matchesGenre) {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  // Show a message if nothing is found
  const existingMsg = document.getElementById("no-result-msg");
  if (existingMsg) existingMsg.remove();

  if (!found) {
    const message = document.createElement("div");
    message.id = "no-result-msg";
    message.textContent = "❌ No anime found matching your search!";
    message.style.color = "white";
    message.style.textAlign = "center";
    message.style.fontSize = "18px";
    message.style.marginTop = "20px";
    document.querySelector(".main-body").appendChild(message);
  }
}

function filterAnime() {
  const searchInput = document.getElementById("anime-search").value.toLowerCase();
  const genreFilter = document.getElementById("genre-filter").value.toLowerCase();
  const cards = document.querySelectorAll(".anime-card");
  let found = false;

  // Remove old popup
  const oldPopup = document.getElementById("popup-msg");
  if (oldPopup) oldPopup.remove();

  cards.forEach(card => {
    const title = card.getAttribute("data-title").toLowerCase();
    const genres = card.getAttribute("data-genre").toLowerCase();
    const matchesSearch = title.includes(searchInput) || genres.includes(searchInput);
    const matchesGenre = genreFilter === "all-genre" || genres.includes(genreFilter);

    if (matchesSearch && matchesGenre) {
      card.style.display = "block";
      card.classList.add("fade-in");
      found = true;
    } else {
      card.classList.remove("fade-in");
      card.style.display = "none";
    }
  });

  // Show popup if nothing found
  if (!found) {
    const popup = document.createElement("div");
    popup.id = "popup-msg";
    popup.textContent = "😢 No anime found!";
    popup.style.position = "fixed";
    popup.style.top = "70%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "rgba(0,0,0,0.8)";
    popup.style.padding = "20px 40px";
    popup.style.borderRadius = "10px";
    popup.style.fontSize = "20px";
    popup.style.color = "#ffcb05";
    popup.style.border = "2px solid #1e90ff";
    popup.style.textShadow = "0 0 8px #1e90ff";
    popup.style.boxShadow = "0 0 20px #1e90ff";
    popup.style.zIndex = "9999";
    popup.style.animation = "fadeIn 0.5s ease";
    document.body.appendChild(popup);

    // Remove popup automatically after 2 seconds
    setTimeout(() => {
      popup.style.animation = "fadeOut 0.5s ease";
      setTimeout(() => popup.remove(), 500);
    }, 2000);
  }
}

// Make it live as you type
document.getElementById("anime-search").addEventListener("keyup", filterAnime);
document.getElementById("genre-filter").addEventListener("change", filterAnime);


/* for image slider */
// ===== Carousel Script =====
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
const dotContainer = document.querySelector('.carousel-dots');

// Create dots dynamically
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dotContainer.appendChild(dot);
});
const dots = Array.from(dotContainer.children);

let currentIndex = 0;

// Move to slide function
function moveToSlide(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// Next button
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  moveToSlide(currentIndex);
});

// Prev button
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  moveToSlide(currentIndex);
});

// Dots navigation
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    moveToSlide(currentIndex);
  });
});

// Auto-slide
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  moveToSlide(currentIndex);
}, 5000);
/* for hiding all content */
function filterAnime() {
  const input = document.getElementById('anime-search').value.toLowerCase().trim();
  const animeCards = document.querySelectorAll('.anime-card');
  const carousel = document.querySelector('.carousel-section');
  const mainHeader = document.querySelector('.main-header');
  const line = document.querySelector('.line');

  let hasResults = false;

  animeCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const genres = card.dataset.genre.toLowerCase();

    // Show card if it matches input
    if (title.includes(input) || genres.includes(input)) {
      card.style.display = 'block';
      hasResults = true;
    } else {
      card.style.display = 'none';
    }
  });

  // If user is typing (not empty), hide carousel and headers
  if (input !== "") {
    if (carousel) carousel.style.display = 'none';
    if (mainHeader) mainHeader.style.display = 'none';
    if (line) line.style.display = 'none';
  } else {
    // If search is cleared → show everything back
    animeCards.forEach(card => card.style.display = 'block');
    if (carousel) carousel.style.display = 'block';
    if (mainHeader) mainHeader.style.display = 'block';
    if (line) line.style.display = 'block';
  }

  // Optional: if nothing matches, you can show a “No results” message
  const existingMsg = document.querySelector('#no-results');
  if (existingMsg) existingMsg.remove();
  if (input !== "" && !hasResults) {
    const msg = document.createElement('p');
    msg.id = 'no-results';
    msg.textContent = "No anime found 😔";
    msg.style.color = "white";
    msg.style.marginTop = "20px";
    msg.style.fontSize = "20px";
    document.querySelector('.cards').appendChild(msg);
  }
}
/* for the search history */
