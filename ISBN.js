const express = require('express');
const axios = require('axios');
const app = express();

// Function to search for a book by ISBN using promises
const searchByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for ISBN lookup
    const apiEndpoint = `https://api.example.com/books/${isbn}`;

    // Make an HTTP request to the API
    axios.get(apiEndpoint)
      .then(response => {
        // Resolve the promise with the book details
        resolve(response.data);
      })
      .catch(error => {
        // Reject the promise with the error
        reject(error);
      });
  });
};

// Route to search for a book by ISBN
app.get('/books/:isbn', async (req, res) => {
  const isbn = req.params.isbn;

  try {
    // Call the searchByISBN function with the provided ISBN
    const bookDetails = await searchByISBN(isbn);

    // Send the retrieved book details as a response
    res.json({ book: bookDetails });
  } catch (error) {
    // Handle error response
    res.status(500).json({ error: 'Error searching for the book by ISBN' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
