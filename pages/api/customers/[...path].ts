import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get the authorization header from the request
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header required' });
    }

    // Extract the path from the query parameters
    const path = req.query.path as string[];
    let apiUrl = 'http://localhost:5189/api/Customers';
    
    if (path && path.length > 0) {
      apiUrl += '/' + path.join('/');
    }

    // Add query parameters if they exist (excluding the path parameter)
    const queryParams = new URLSearchParams();
    Object.keys(req.query).forEach(key => {
      if (key !== 'path') {
        const value = req.query[key];
        if (typeof value === 'string') {
          queryParams.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v));
        }
      }
    });

    if (queryParams.toString()) {
      apiUrl += '?' + queryParams.toString();
    }

    // Make the request to the external API
    const response = await axios({
      method: req.method,
      url: apiUrl,
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      data: req.method !== 'GET' ? req.body : undefined,
    });

    // Return the response from the external API
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('API proxy error:', error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).json({ error: 'No response from external API' });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
