// Import necessary modules or define your book retrieval function
const express = require('express');
const app = express();

// Function to simulate fetching all books from a database or external API
const getAllBooks = async (callback) => {
  try {
    // Simulate fetching data (replace this with your actual data retrieval logic)
    const books = await fetchDataFromDatabaseOrApi();

    // Execute the callback with the retrieved books
    callback(null, books);
  } catch (error) {
    // Handle errors and execute the callback with an error
    callback(error, null);
  }
};

// Route to get all books using the async callback function
app.get('/books', (req, res) => {
  // Call the getAllBooks function with an async callback
  getAllBooks(async (error, books) => {
    if (error) {
      // Handle error response
      return res.status(500).json({ error: 'Error fetching books' });
    }

    // Send the retrieved books as a response
    res.json({ books });
  });
});

// Dummy function to simulate fetching data
const fetchDataFromDatabaseOrApi = async () => {
  // Replace this with actual logic to fetch data
  return [
    { id: 1, title: 'Book 1' },
    { id: 2, title: 'Book 2' },
    { id: 3, title: 'Book 3' },
  ];
};

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
