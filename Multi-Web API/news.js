const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const country = "my"; // Malaysia
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

let requestURL;
let apiKey = "d215f539261f42ce9749a4dc432e6954"; // Your News API Key

// Create cards from data
const generateUI = (articles) => {
  container.innerHTML = ""; // Clear previous content
  articles.forEach(item => {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `
      <div class="news-content">
        <div class="news-title">
          ${item.title}
        </div>
        <div class="news-description">
          ${item.description || item.content || ""}
        </div>
        <a href="${item.url}" target="_blank" class="view-button">Read More</a>
      </div>`;
    container.appendChild(card);
  });
};

// News API Call
const getNews = async () => {
  try {
    let response = await fetch(requestURL);
    if (!response.ok) {
      throw new Error("Failed to fetch news data");
    }
    let data = await response.json();
    generateUI(data.articles);
  } catch (error) {
    console.error("Error fetching news data:", error);
    alert("Failed to fetch news data. Please try again later.");
  }
};

// Category Selection
const selectCategory = (category) => {
  requestURL = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`)}`;
  getNews();
};

// Options Buttons
const createOptions = () => {
  optionsContainer.innerHTML = "";
  options.forEach((category) => {
    let button = document.createElement("button");
    button.classList.add("option");
    button.textContent = category;
    button.addEventListener("click", () => selectCategory(category));
    optionsContainer.appendChild(button);
  });
};

const init = () => {
  requestURL = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`)}`;
  getNews();
  createOptions();
};

window.onload = init;
