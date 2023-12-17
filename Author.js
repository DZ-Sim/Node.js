const express = require('express');
const axios = require('axios');
const app = express();

// Function to search for books by author using promises
const searchByAuthor = (author) => {
  return new Promise((resolve, reject) => {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for author search
    const apiEndpoint = `https://api.example.com/books?author=${encodeURIComponent(author)}`;

    // Make an HTTP request to the API
    axios.get(apiEndpoint)
      .then(response => {
        // Resolve the promise with the list of books by the author
        resolve(response.data.books);
      })
      .catch(error => {
        // Reject the promise with the error
        reject(error);
      });
  });
};

// Route to search for books by author
app.get('/books/author/:author', async (req, res) => {
  const author = req.params.author;

  try {
    // Call the searchByAuthor function with the provided author
    const booksByAuthor = await searchByAuthor(author);

    // Send the retrieved books as a response
    res.json({ books: booksByAuthor });
  } catch (error) {
    // Handle error response
    res.status(500).json({ error: 'Error searching for books by the author' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
