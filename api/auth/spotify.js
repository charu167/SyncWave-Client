// api/auth/spotify.js

module.exports = async (req, res) => {
    if (req.method === 'POST') {
      // Here you would handle the Spotify callback data.
      // For example, you might extract authorization tokens or other data sent by Spotify.
  
      // After processing the Spotify response, redirect the user to a client-side route
      // and pass along any needed data, such as tokens or error messages, as query parameters.
      const queryParams = new URLSearchParams({
        token: 'your_access_token', // Replace with actual data
        // ... any other data you want to pass to the client
      }).toString();
  
      res.redirect(`/callbackspotify?${queryParams}`);
    } else {
      // If not a POST request, return a 405 Method Not Allowed error
      res.status(405).end();
    }
  };
  