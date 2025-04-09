// This file handles the incoming POST request from the frontend

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Get preferences from the request body
        const preferences = req.body;
  
        // Here, you can save the preferences to a database or process them
        console.log('Received preferences:', preferences);
  
        // Send a success response
        return res.status(200).json({ message: 'Preferences saved successfully' });
      } catch (error) {
        // If there is an error, send an error response
        return res.status(500).json({ error: 'Error saving preferences' });
      }
    } else {
      // If the request is not a POST, send an error response
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  