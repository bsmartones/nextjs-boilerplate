import { MetadataRoute } from 'next'
import dagre from 'dagre'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://example.com' // Replace with your actual base URL

  // Define your pages
  const pages = [
    { url: '/', lastModified: new Date() },
    { url: '/about', lastModified: new Date() },
    { url: '/contact', lastModified: new Date() },
    // Add more pages as needed
  ]

  // Create a new directed graph
  const dagreGraph = new dagre.graphlib.Graph()

  // Set an object for the graph label
  dagreGraph.setGraph({})

  // Default to assigning a new object as a label for each new edge.
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  // Add nodes to the graph
  pages.forEach((page, index) => {
    dagreGraph.setNode(index.toString(), { label: page.url, width: 100, height: 50 })
  })

  // Define edges (connections between pages)
  const edges = [
    { from: '0', to: '1' }, // Home to About
    { from: '0', to: '2' }, // Home to Contact
    // Add more edges as needed
  ]

  // Add edges to the graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.from, edge.to)
  })

  // Run the layout algorithm
  dagre.layout(dagreGraph)

  // Generate sitemap entries
  const sitemapEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.lastModified,
  }))

  return sitemapEntries
}
