'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Search } from "lucide-react"

// Mock data - in a real application, this would come from your API
const mockData = [
  { keyword: "nextjs tutorial", clicks: 1200, impressions: 15000, position: 2.3 },
  { keyword: "react state management", clicks: 800, impressions: 10000, position: 3.1 },
  { keyword: "typescript best practices", clicks: 600, impressions: 8000, position: 4.5 },
  { keyword: "vercel deployment", clicks: 1500, impressions: 20000, position: 1.8 },
  { keyword: "serverless functions", clicks: 950, impressions: 12000, position: 2.7 },
]

export default function SearchConsoleTracker() {
  const [data, setData] = useState(mockData)
  const [sortColumn, setSortColumn] = useState('clicks')
  const [sortDirection, setSortDirection] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // In a real application, you would fetch data from your API here
    // For example:
    // const fetchData = async () => {
    //   const response = await fetch('/api/search-console-data')
    //   const newData = await response.json()
    //   setData(newData)
    // }
    // fetchData()
  }, [])

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('desc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const filteredData = sortedData.filter(item =>
    item.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Search Console Rank Tracker</CardTitle>
        <CardDescription>Daily updated keyword data from Google Search Console</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" onClick={() => setData(mockData)}>
            Refresh Data
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Keyword</TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort('clicks')}>
                Clicks {sortColumn === 'clicks' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort('impressions')}>
                Impressions {sortColumn === 'impressions' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort('position')}>
                Position {sortColumn === 'position' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.keyword}>
                <TableCell className="font-medium">{item.keyword}</TableCell>
                <TableCell className="text-right">{item.clicks.toLocaleString()}</TableCell>
                <TableCell className="text-right">{item.impressions.toLocaleString()}</TableCell>
                <TableCell className="text-right">{item.position.toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
