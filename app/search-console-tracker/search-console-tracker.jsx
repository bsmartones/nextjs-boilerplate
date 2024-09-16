'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Search } from "lucide-react"

export default function SearchConsoleTracker() {
  const [data, setData] = useState([])
  const [sortColumn, setSortColumn] = useState('clicks')
  const [sortDirection, setSortDirection] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/search-console-data')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const newData = await response.json()
      setData(newData)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
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
          <Button variant="outline" onClick={fetchData} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Refresh Data'}
          </Button>
        </div>
        {error && (
          <div className="text-red-500 mb-4">Error: {error}</div>
        )}
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
