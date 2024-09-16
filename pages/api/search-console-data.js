import { google } from 'googleapis'

export default async function handler(req, res) {
  try {
    // Check if the request method is GET
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    // Initialize the Google Auth client
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    })

    // Create a new Search Console client
    const searchconsole = google.searchconsole({ version: 'v1', auth })

    // Get the current date and 30 days ago
    const endDate = new Date().toISOString().split('T')[0]
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    // Make the API request
    const response = await searchconsole.searchanalytics.query({
      siteUrl: process.env.SEARCH_CONSOLE_SITE_URL,
      requestBody: {
        startDate: startDate,
        endDate: endDate,
        dimensions: ['query'],
        rowLimit: 1000,
      },
    })

    // Format the response data
    const formattedData = response.data.rows.map(row => ({
      keyword: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      position: row.position,
    }))

    // Send the formatted data as the response
    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching Search Console data:', error)
    res.status(500).json({ error: 'Failed to fetch Search Console data' })
  }
}
