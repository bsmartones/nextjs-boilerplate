import { google } from 'googleapis'

export default async function handler(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    })

    const searchconsole = google.searchconsole({ version: 'v1', auth })

    const response = await searchconsole.searchanalytics.query({
      siteUrl: 'https://www.example.com/',
      requestBody: {
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        dimensions: ['query'],
        rowLimit: 1000,
      },
    })

    const formattedData = response.data.rows.map(row => ({
      keyword: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      position: row.position,
    }))

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching Search Console data:', error)
    res.status(500).json({ error: 'Failed to fetch Search Console data' })
  }
}
