let quotes = [
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "Do or do not. There is no try.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const displayDiv = document.getElementById('quote-display');
  displayDiv.innerHTML = `
    <p>"${quote.text}"</p>
    <p><em>Category: ${quote.category}</em></p>
  `;
}

// Function to create a form for adding a new quote
function createAddQuoteForm() {
  const formContainer = document.getElementById('form-container');

  formContainer.innerHTML = `
    <h3>Add a New Quote</h3>
    <input type="text" id="new-quote-text" placeholder="Quote text"><br><br>
    <input type="text" id="new-quote-category" placeholder="Category"><br><br>
    <button onclick="addQuote()">Add Quote</button>
  `;
}

// Function to add a quote from the form
// function addQuote() {
//   const quoteText = document.getElementById('new-quote-text').value.trim();
//   const category = document.getElementById('new-quote-category').value.trim();

//   if (quoteText && category) {
//     quotes.push({ text: quoteText, category: category });
//     alert("Quote added!");
//     document.getElementById('new-quote-text').value = '';
//     document.getElementById('new-quote-category').value = '';
//   } else {
//     alert("Please fill in both the quote and category.");
//   }
// }

// Create the form on page load
document.addEventListener('DOMContentLoaded', () => {
  createAddQuoteForm();
});

function addQuote() {
  const quoteText = document.getElementById('new-quote-text').value.trim();
  const category = document.getElementById('new-quote-category').value.trim();
  const feedback = document.getElementById('feedback');

  if (quoteText && category) {
    const newQuote = { text: quoteText, category: category };  // ✅ Create the quote object
    quotes.push(newQuote);                                     // ✅ Add to the quotes array
    updateQuoteList();                                         // ✅ Update the DOM (render all quotes)
    feedback.textContent = "Quote added!";
    setTimeout(() => (feedback.textContent = ""), 2000);
    
    // ✅ Clear form fields
    document.getElementById('new-quote-text').value = '';
    document.getElementById('new-quote-category').value = '';
  } else {
    // ❌ Form validation failed
    feedback.style.color = 'red';
    feedback.textContent = "Please fill in both fields.";
    setTimeout(() => {
      feedback.textContent = '';
      feedback.style.color = 'green';
    }, 2000);
  }
}

function updateQuoteList() {
  const quoteList = document.getElementById('quote-list');
  quoteList.innerHTML = ''; // Clear list

  quotes.forEach((quote) => {
    const li = document.createElement('li');

    const quoteText = document.createElement('span');
    quoteText.textContent = `"${quote.text}" `;

    const category = document.createElement('em');
    category.textContent = `(${quote.category})`;

    li.appendChild(quoteText);
    li.appendChild(category);

    quoteList.appendChild(li);
  });
}


let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "Do or do not. There is no try.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Show a random quote
function showRandomQuote() {
  if (quotes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const displayDiv = document.getElementById('quote-display');
  displayDiv.innerHTML = '';

  const textP = document.createElement('p');
  textP.textContent = `"${quote.text}"`;

  const categoryP = document.createElement('p');
  categoryP.innerHTML = `<em>Category: ${quote.category}</em>`;

  displayDiv.appendChild(textP);
  displayDiv.appendChild(categoryP);
}

// Create form for adding quotes
function createAddQuoteForm() {
  const formContainer = document.getElementById('form-container');

  formContainer.innerHTML = `
    <h3>Add a New Quote</h3>
    <input type="text" id="new-quote-text" placeholder="Quote text"><br><br>
    <input type="text" id="new-quote-category" placeholder="Category"><br><br>
    <button id="add-quote-btn">Add Quote</button>
    <p id="feedback" style="color: green;"></p>
  `;

  document.getElementById('add-quote-btn').addEventListener('click', addQuote);
}

// Add quote and update localStorage + DOM
function addQuote() {
  const quoteText = document.getElementById('new-quote-text').value.trim();
  const category = document.getElementById('new-quote-category').value.trim();
  const feedback = document.getElementById('feedback');

  if (quoteText && category) {
    const newQuote = { text: quoteText, category: category };
    quotes.push(newQuote);

    // ✅ Save updated array to localStorage
    localStorage.setItem('quotes', JSON.stringify(quotes));

    updateQuoteList();
    feedback.textContent = "Quote added!";
    setTimeout(() => (feedback.textContent = ""), 2000);

    document.getElementById('new-quote-text').value = '';
    document.getElementById('new-quote-category').value = '';
  } else {
    feedback.style.color = 'red';
    feedback.textContent = "Please fill in both fields.";
    setTimeout(() => {
      feedback.textContent = '';
      feedback.style.color = 'green';
    }, 2000);
  }
}

// Display all quotes in a list using createElement/appendChild
function updateQuoteList() {
  const quoteList = document.getElementById('quote-list');
  quoteList.innerHTML = '';

  quotes.forEach((quote) => {
    const li = document.createElement('li');

    const textSpan = document.createElement('span');
    textSpan.textContent = `"${quote.text}" `;

    const categoryEm = document.createElement('em');
    categoryEm.textContent = `(${quote.category})`;

    li.appendChild(textSpan);
    li.appendChild(categoryEm);

    quoteList.appendChild(li);
  });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  createAddQuoteForm();
  updateQuoteList();
});

function exportQuotes() {
  const quoteData = JSON.stringify(quotes, null, 2); // Pretty format
  const blob = new Blob([quoteData], { type: "application/json" }); // ✅ Blob with MIME type

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json"; // Suggested file name
  a.click();

  URL.revokeObjectURL(url); // Clean up memory
}

// Attach export event listener
document.addEventListener("DOMContentLoaded", () => {
  createAddQuoteForm();
  updateQuoteList();

  // ✅ Add listener to export button
  const exportBtn = document.getElementById("export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportQuotes);
  }
});

// Import quotes from a JSON file
function importQuotesFromFile(file) {
  const reader = new FileReader(); // ✅ FileReader

  reader.onload = function (e) {   // ✅ onload
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes = importedQuotes;
        localStorage.setItem('quotes', JSON.stringify(quotes));
        updateQuoteList();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format. Must be a JSON array.");
      }
    } catch (err) {
      alert("Error reading file: " + err.message);
    }
  };

  reader.readAsText(file); // ✅ readAsText
}

// Listen for import button click
document.addEventListener("DOMContentLoaded", () => {
  createAddQuoteForm();
  updateQuoteList();

  // Export listener (already present)
  const exportBtn = document.getElementById("export-btn");
  if (exportBtn) exportBtn.addEventListener("click", exportQuotes);

  // ✅ Import listener
  const importBtn = document.getElementById("import-btn");
  const importFile = document.getElementById("import-file");

  if (importBtn && importFile) {
    importBtn.addEventListener("click", () => {
      const file = importFile.files[0];
      if (!file) {
        alert("Please select a file first.");
        return;
      }
      importQuotesFromFile(file); // Call import function
    });
  }
});

// This function updates the category dropdown based on available quotes
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter"); // ✅ categoryFilter

  // Get unique categories from quotes array
  const categories = quotes.map(q => q.category); // ✅ map()
  const uniqueCategories = [...new Set(categories)];

  // Clear existing options
  categoryFilter.innerHTML = '<option value="all">All</option>';

  // Populate dropdown
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// ✅ Function to filter quotes and display in quoteDisplay
function filterQuote(category) {
  const quoteDisplay = document.getElementById("quoteDisplay"); // ✅ quoteDisplay
  quoteDisplay.innerHTML = ''; // Clear display

  const filtered = category === "all"
    ? quotes
    : quotes.filter(q => q.category === category);

  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes found for this category.";
    return;
  }

  // Display filtered quotes
  filtered.forEach(quote => {
    const p = document.createElement("p");
    p.textContent = `"${quote.text}" (${quote.category})`;
    quoteDisplay.appendChild(p);
  });
}

document.getElementById("categoryFilter").addEventListener("change", (e) => {
  filterQuote(e.target.value); // ✅ use filterQuote instead of updateQuoteList
});


function filterQuote(category) {
  const selectedCategory = category; // ✅ Explicitly use selectedCategory
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = '';

  const filtered = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes found for this category.";
    return;
  }

  filtered.forEach(quote => {
    const p = document.createElement("p");
    p.textContent = `"${quote.text}" (${quote.category})`;
    quoteDisplay.appendChild(p);
  });
}
document.getElementById("categoryFilter").addEventListener("change", (e) => {
  const selectedCategory = e.target.value; // ✅ Use variable explicitly
  filterQuote(selectedCategory);
});


function fetchQuotesFromServer() {
  // Simulated "fetched" data
  const fetchedQuotes = [
    { text: "Success is not final, failure is not fatal.", category: "Motivation" },
    { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" }
  ];

  quotes = fetchedQuotes;
  localStorage.setItem("quotes", JSON.stringify(quotes));

  updateQuoteList();
  populateCategories();
}
