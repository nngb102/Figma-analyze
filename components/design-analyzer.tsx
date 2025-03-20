"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileUp, Link, Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ElementTree } from "@/components/element-tree"
import { ElementDetails } from "@/components/element-details"

export function DesignAnalyzer() {
  const [fileUrl, setFileUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [filterText, setFilterText] = useState("")

  const handleAnalyze = () => {
    if (!fileUrl) return

    setIsAnalyzing(true)

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      setIsAnalyzed(true)
    }, 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic
    if (e.target.files && e.target.files[0]) {
      // In a real implementation, we would process the file
      setFileUrl("uploaded-file.fig")
    }
  }

  const handleExport = () => {
    // In a real implementation, this would generate and download a JSON file
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mockAnalysisData))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "figma-analysis.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  return (
    <div className="grid gap-6">
      <Card className="bg-white border border-[#e6e6e6]">
        <CardContent className="p-6">
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="url" className="data-[state=active]:bg-[#1bb274] data-[state=active]:text-white">
                <Link className="w-4 h-4 mr-2" />
                Figma URL
              </TabsTrigger>
              <TabsTrigger value="upload" className="data-[state=active]:bg-[#1bb274] data-[state=active]:text-white">
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </TabsTrigger>
            </TabsList>
            <TabsContent value="url">
              <div className="flex gap-4">
                <Input
                  placeholder="Paste Figma file URL (e.g., https://www.figma.com/file/...)"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={!fileUrl || isAnalyzing}
                  className="bg-[#1bb274] hover:bg-[#048547] text-white"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Design"}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="upload">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Input
                    type="file"
                    accept=".fig"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="border border-dashed border-[#cccccc] rounded-md p-4 text-center h-full flex items-center justify-center">
                    <div>
                      <FileUp className="mx-auto h-8 w-8 text-[#707070] mb-2" />
                      <p className="text-sm text-[#707070]">Drag & drop your Figma file here or click to browse</p>
                      <p className="text-xs text-[#adadad] mt-1">Supports .fig files</p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={!fileUrl || isAnalyzing}
                  className="bg-[#1bb274] hover:bg-[#048547] text-white"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Design"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isAnalyzing && (
        <Card className="bg-white border border-[#e6e6e6]">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1bb274] mb-4"></div>
              <h3 className="text-lg font-medium text-[#111111]">Analyzing Figma Design</h3>
              <p className="text-[#707070] mt-2">
                This may take a few moments depending on the complexity of your design
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {isAnalyzed && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#111111]">Analysis Results</h2>
            <Button
              variant="outline"
              onClick={handleExport}
              className="border-[#1bb274] text-[#1bb274] hover:bg-[#f5f6f7]"
            >
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white border border-[#e6e6e6] lg:col-span-1">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-[#111111]">Element Tree</h3>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-[#707070]" />
                    <Input
                      placeholder="Filter elements..."
                      className="pl-8 h-8 text-sm"
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                    />
                  </div>
                </div>
                <ElementTree
                  selectedElement={selectedElement}
                  setSelectedElement={setSelectedElement}
                  filterText={filterText}
                />
              </CardContent>
            </Card>

            <Card className="bg-white border border-[#e6e6e6] lg:col-span-2">
              <CardContent className="p-4">
                {selectedElement ? (
                  <ElementDetails elementId={selectedElement} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Search className="w-12 h-12 text-[#cccccc] mb-4" />
                    <h3 className="text-lg font-medium text-[#111111]">Select an element to view details</h3>
                    <p className="text-[#707070] mt-2 max-w-md">
                      Click on any element in the tree view to see its complete properties and specifications
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

// Mock data for demonstration
const mockAnalysisData = {
  version: "1.0.0",
  fileName: "Design System.fig",
  lastModified: "2023-05-15T14:30:00Z",
  pages: [
    {
      id: "page-1",
      name: "Components",
      children: [
        {
          id: "frame-1",
          name: "Button",
          type: "FRAME",
        },
        {
          id: "frame-2",
          name: "Input",
          type: "FRAME",
        },
      ],
    },
  ],
}

