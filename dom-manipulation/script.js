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