const express = require('express');
const axios = require('axios');
const app = express();

// Function to search for books by title using promises
const searchByTitle = (title) => {
  return new Promise((resolve, reject) => {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for title search
    const apiEndpoint = `https://api.example.com/books?title=${encodeURIComponent(title)}`;

    // Make an HTTP request to the API
    axios.get(apiEndpoint)
      .then(response => {
        // Resolve the promise with the list of books matching the title
        resolve(response.data.books);
      })
      .catch(error => {
        // Reject the promise with the error
        reject(error);
      });
  });
};

// Route to search for books by title
app.get('/books/title/:title', async (req, res) => {
  const title = req.params.title;

  try {
    // Call the searchByTitle function with the provided title
    const booksByTitle = await searchByTitle(title);

    // Send the retrieved books as a response
    res.json({ books: booksByTitle });
  } catch (error) {
    // Handle error response
    res.status(500).json({ error: 'Error searching for books by title' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
