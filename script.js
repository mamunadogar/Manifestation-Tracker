const form = document.getElementById("manifest-form");
const username = document.getElementById("username");
const affirmation = document.getElementById("affirmation");
const date = document.getElementById("date");
const list = document.getElementById("list");

// Load saved affirmations on page load
document.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("affirmations")) || [];
  saved.forEach(addAffirmationToList);
});

// Form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = username.value.trim();
  const text = affirmation.value.trim();
  const dateValue = date.value;

  if (user === "" || text === "" || dateValue === "") {
    alert("Fill all fields with intention 🧘‍♀️");
    return;
  }

  const entry = {
    user,
    text,
    date: dateValue,
  };

  addAffirmationToList(entry);
  saveToLocalStorage(entry);

  form.reset();
});

// Add affirmation to DOM
function addAffirmationToList(entry) {
  const li = document.createElement("li");
  li.classList.add("card");

  li.innerHTML = `
    <p><strong>${entry.user}</strong> manifests:</p>
    <p>"${entry.text}"</p>
    <p><small>🌙 Target: ${entry.date}</small></p>
  `;

  list.prepend(li); // newest on top
}

// Save to local storage
function saveToLocalStorage(entry) {
  const affirmations = JSON.parse(localStorage.getItem("affirmations")) || [];
  affirmations.unshift(entry);
  localStorage.setItem("affirmations", JSON.stringify(affirmations));
}
