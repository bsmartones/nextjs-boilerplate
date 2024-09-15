export const dynamic = 'force-dynamic'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronUp, Users, FileText, KeyRound, TrendingUp, Award } from "lucide-react"
import { MegaMenu } from "@/components/MegaMenu"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export default function SEOPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <MegaMenu />
        </div>
      </header>
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[{ label: "SEO", href: "/seo" }]} />
          <h1 className="text-3xl font-bold mt-4 mb-8">SEO Campaign Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Personal Injury Law SEO Campaign</CardTitle>
                  <CardDescription>Programmatic SEO strategy for a Personal Injury Law firm</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="datasets">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="datasets">Datasets</TabsTrigger>
                      <TabsTrigger value="keywords">Keywords</TabsTrigger>
                      <TabsTrigger value="pages">Pages</TabsTrigger>
                    </TabsList>
                    <TabsContent value="datasets">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Dataset Name</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Last Updated</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>US Cities</TableCell>
                            <TableCell>US Census Bureau</TableCell>
                            <TableCell>2023-06-15</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Injury Types</TableCell>
                            <TableCell>Medical Encyclopedia</TableCell>
                            <TableCell>2023-05-20</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Legal Terms</TableCell>
                            <TableCell>Law Dictionary</TableCell>
                            <TableCell>2023-07-01</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="keywords">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Keyword</TableHead>
                            <TableHead>Search Volume</TableHead>
                            <TableHead>Difficulty</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>personal injury lawyer [city]</TableCell>
                            <TableCell>5,400</TableCell>
                            <TableCell>
                              <Badge>Medium</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>[injury type] attorney near me</TableCell>
                            <TableCell>3,600</TableCell>
                            <TableCell>
                              <Badge>High</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>best [city] car accident lawyer</TableCell>
                            <TableCell>2,900</TableCell>
                            <TableCell>
                              <Badge>Medium</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="pages">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Page Title</TableHead>
                            <TableHead>URL Structure</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Personal Injury Lawyer in [City]</TableCell>
                            <TableCell>/[city]/personal-injury-lawyer</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                Live
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>[Injury Type] Attorney in [City]</TableCell>
                            <TableCell>/[city]/[injury-type]-attorney</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                                Draft
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>[City] Car Accident Lawyer</TableCell>
                            <TableCell>/[city]/car-accident-lawyer</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                                In Progress
                              </Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">SEO Forecast</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Estimated Traffic</span>
                      <span className="text-sm font-medium">15,000 / month</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Keyword Rankings</span>
                      <span className="text-sm font-medium">Top 10</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Domain Authority</span>
                      <span className="text-sm font-medium">45 / 100</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">50+ Cities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">200+ Pages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4" />
                      <span className="text-sm">500+ Keywords</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">30% Growth</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Campaign Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ChevronUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Increased organic traffic by 150%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Improved conversion rate by 25%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Ranked #1 for &quot;best personal injury lawyer&quot;</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
