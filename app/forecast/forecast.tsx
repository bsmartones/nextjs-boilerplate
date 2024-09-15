'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon, Download } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

type Difficulty = 'Super Easy' | 'Low' | 'Below Website DR' | 'Custom'

type ForecastData = {
  id: number
  pageTitle: string
  searchVolume: number
  ctr: number
  potentialTraffic: number
  selected: boolean
  difficulty: Difficulty
}

type ProjectInfo = {
  companyName: string
  website: string
  domainRating: number
  currentTraffic: number
  language: string
  projectName: string
}

export default function SEOForecastPage() {
  const [forecastData, setForecastData] = useState<ForecastData[]>([])
  const projectInfo: ProjectInfo = {
    companyName: 'Acme Inc.',
    website: 'https://www.acme.com',
    domainRating: 65,
    currentTraffic: 50000,
    language: 'English',
    projectName: 'Acme SEO Growth'
  }
  const [globalCTR, setGlobalCTR] = useState(0.05)
  const [globalDifficulty, setGlobalDifficulty] = useState<Difficulty>('Below Website DR')

  useEffect(() => {
    const initialData: ForecastData[] = [
      { id: 1, pageTitle: "Best Ahrefs Experts in New York", searchVolume: 1000, ctr: 0.1, potentialTraffic: 100, selected: false, difficulty: 'Below Website DR' },
      { id: 2, pageTitle: "Best Hubspot Experts in London", searchVolume: 800, ctr: 0.08, potentialTraffic: 64, selected: false, difficulty: 'Below Website DR' },
      { id: 3, pageTitle: "Best SEMrush Experts in Tokyo", searchVolume: 600, ctr: 0.12, potentialTraffic: 72, selected: false, difficulty: 'Below Website DR' },
    ]
    setForecastData(initialData)
  }, [])

  const handleCTRChange = (id: number, newCTR: number) => {
    setForecastData(prevData => 
      prevData.map(item => 
        item.id === id 
          ? { ...item, ctr: newCTR, potentialTraffic: item.searchVolume * newCTR }
          : item
      )
    )
  }

  const handleGlobalCTRChange = (newCTR: number) => {
    setGlobalCTR(newCTR)
    setForecastData(prevData => 
      prevData.map(item => ({
        ...item,
        ctr: newCTR,
        potentialTraffic: item.searchVolume * newCTR
      }))
    )
  }

  const handleBulkCTRAssign = () => {
    setForecastData(prevData => 
      prevData.map(item => 
        item.selected
          ? { ...item, ctr: globalCTR, potentialTraffic: item.searchVolume * globalCTR }
          : item
      )
    )
  }

  const toggleSelection = (id: number) => {
    setForecastData(prevData => 
      prevData.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    )
  }

  const handleDifficultyChange = (id: number, newDifficulty: Difficulty) => {
    setForecastData(prevData => 
      prevData.map(item => 
        item.id === id 
          ? { ...item, difficulty: newDifficulty }
          : item
      )
    )
  }

  const handleGlobalDifficultyChange = (newDifficulty: Difficulty) => {
    setGlobalDifficulty(newDifficulty)
    setForecastData(prevData => 
      prevData.map(item => ({
        ...item,
        difficulty: newDifficulty
      }))
    )
  }

  const handleBulkDifficultyAssign = () => {
    setForecastData(prevData => 
      prevData.map(item => 
        item.selected
          ? { ...item, difficulty: globalDifficulty }
          : item
      )
    )
  }

  const totalPages = forecastData.length
  const totalSearchVolume = forecastData.reduce((sum, item) => sum + item.searchVolume, 0)
  const totalPotentialTraffic = forecastData.reduce((sum, item) => sum + item.potentialTraffic, 0)

  const growthData = [
    { month: 'Current', traffic: projectInfo.currentTraffic },
    { month: 'Month 3', traffic: Math.round(projectInfo.currentTraffic * 1.2) },
    { month: 'Month 6', traffic: Math.round(projectInfo.currentTraffic * 1.5) },
    { month: 'Month 9', traffic: Math.round(projectInfo.currentTraffic * 1.8) },
    { month: 'Month 12', traffic: Math.round(projectInfo.currentTraffic * 2.2) },
  ]

  const exportToPDF = () => {
    const doc = new jsPDF()

    // Add project info
    doc.setFontSize(18)
    doc.text(projectInfo.projectName, 14, 22)
    doc.setFontSize(12)
    doc.text(`Company: ${projectInfo.companyName}`, 14, 32)
    doc.text(`Website: ${projectInfo.website}`, 14, 40)
    doc.text(`Domain Rating: ${projectInfo.domainRating}`, 14, 48)
    doc.text(`Current Traffic: ${projectInfo.currentTraffic.toLocaleString()}`, 14, 56)
    doc.text(`Language: ${projectInfo.language}`, 14, 64)

    // Add summary
    doc.setFontSize(16)
    doc.text('Summary', 14, 80)
    doc.setFontSize(12)
    doc.text(`Total Pages: ${totalPages}`, 14, 90)
    doc.text(`Total Search Volume: ${totalSearchVolume.toLocaleString()}`, 14, 98)
    doc.text(`Total Potential Traffic: ${totalPotentialTraffic.toLocaleString()}`, 14, 106)

    // Add forecast table
    doc.setFontSize(16)
    doc.text('Page-level Forecast', 14, 124)
    doc.autoTable({
      startY: 130,
      head: [['Page Title', 'Search Volume', 'CTR', 'Difficulty', 'Potential Traffic']],
      body: forecastData.map(item => [
        item.pageTitle,
        item.searchVolume.toLocaleString(),
        item.ctr.toFixed(2),
        item.difficulty,
        item.potentialTraffic.toLocaleString()
      ]),
    })

    doc.save(`${projectInfo.projectName}_SEO_Forecast.pdf`)
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{projectInfo.projectName} - SEO Forecast</CardTitle>
          <CardDescription>Overview of potential traffic based on current data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label>Company Name</Label>
              <p className="font-medium">{projectInfo.companyName}</p>
            </div>
            <div>
              <Label>Website</Label>
              <p className="font-medium">{projectInfo.website}</p>
            </div>
            <div>
              <Label>Domain Rating</Label>
              <p className="font-medium">{projectInfo.domainRating}</p>
            </div>
            <div>
              <Label>Current Traffic</Label>
              <p className="font-medium">{projectInfo.currentTraffic.toLocaleString()}</p>
            </div>
            <div>
              <Label>Language</Label>
              <p className="font-medium">{projectInfo.language}</p>
            </div>
            <div>
              <Label>Global CTR</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={globalCTR}
                  onChange={(e) => handleGlobalCTRChange(parseFloat(e.target.value))}
                  step="0.01"
                  min="0"
                  max="1"
                  className="w-20"
                />
                <Button onClick={handleBulkCTRAssign}>Apply CTR to Selected</Button>
              </div>
            </div>
            <div>
              <Label>Global Difficulty</Label>
              <div className="flex items-center space-x-2">
                <Select onValueChange={(value) => handleGlobalDifficultyChange(value as Difficulty)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Super Easy">Super Easy (DR &lt; 1)</SelectItem>
                    <SelectItem value="Low">Low (DR &lt; 20)</SelectItem>
                    <SelectItem value="Below Website DR">Below Website DR</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleBulkDifficultyAssign}>Apply Difficulty to Selected</Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">Total Pages</p>
              <p className="text-2xl font-bold">{totalPages}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Search Volume</p>
              <p className="text-2xl font-bold">{totalSearchVolume.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Potential Traffic</p>
              <p className="text-2xl font-bold">{totalPotentialTraffic.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={exportToPDF}>
              <Download className="mr-2 h-4 w-4" /> Export to PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Potential SEO Growth (6-12 months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Line type="monotone" dataKey="traffic" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Page-level Forecast</CardTitle>
          <CardDescription>Adjust CTR and difficulty to see changes in potential traffic</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Page Title</TableHead>
                <TableHead>Search Volume</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Potential Traffic</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forecastData.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={item.selected}
                      onCheckedChange={() => toggleSelection(item.id)}
                    />
                  </TableCell>
                  <TableCell>{item.pageTitle}</TableCell>
                  <TableCell>{item.searchVolume.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={item.ctr}
                        onChange={(e) => handleCTRChange(item.id, parseFloat(e.target.value))}
                        step="0.01"
                        min="0"
                        max="1"
                        className="w-20"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Average CTR:</p>
                            <p>Position 1: 31.7%</p>
                            <p>Top 3: 18.5%</p>
                            <p>Top 5: 10.1%</p>
                            <p>Top 10: 2.4%</p>
                            <p>Lower than Top 10: 0.8%</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select onValueChange={(value) => handleDifficultyChange(item.id, value as Difficulty)} defaultValue={item.difficulty}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Super Easy">Super Easy (DR &lt; 1)</SelectItem>
                        <SelectItem value="Low">Low (DR &lt; 20)</SelectItem>
                        <SelectItem value="Below Website DR">Below Website DR</SelectItem>
                        <SelectItem value="Custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{item.potentialTraffic.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
