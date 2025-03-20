"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyPanel } from "@/components/property-panel"
import { Badge } from "@/components/ui/badge"
import { Copy, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ElementDetailsProps {
  elementId: string
}

export function ElementDetails({ elementId }: ElementDetailsProps) {
  // In a real implementation, we would fetch the element details based on the ID
  // For now, we'll use mock data

  // Find mock element data based on ID
  const mockElementData = getMockElementData(elementId)

  if (!mockElementData) {
    return <div>Element not found</div>
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Show a toast or notification
        console.log("Copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-[#111111]">{mockElementData.name}</h3>
          <Badge variant="outline" className="text-xs bg-[#f5f6f7] text-[#707070] border-[#e6e6e6]">
            {mockElementData.type}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(JSON.stringify(mockElementData, null, 2))}
            className="text-xs h-8"
          >
            <Copy className="w-3.5 h-3.5 mr-1.5" />
            Copy JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              copyToClipboard(
                `width: ${mockElementData.dimensions?.width}px; height: ${mockElementData.dimensions?.height}px;`,
              )
            }
            className="text-xs h-8"
          >
            <Code className="w-3.5 h-3.5 mr-1.5" />
            Copy CSS
          </Button>
        </div>
      </div>

      <Tabs defaultValue="properties">
        <TabsList className="mb-4">
          <TabsTrigger value="properties" className="data-[state=active]:bg-[#1bb274] data-[state=active]:text-white">
            Properties
          </TabsTrigger>
          <TabsTrigger value="styles" className="data-[state=active]:bg-[#1bb274] data-[state=active]:text-white">
            Styles
          </TabsTrigger>
          <TabsTrigger value="layout" className="data-[state=active]:bg-[#1bb274] data-[state=active]:text-white">
            Layout
          </TabsTrigger>
          {mockElementData.type === "TEXT" && (
            <TabsTrigger value="text" className="data-[state=active]:bg-[#1bb274] data-[state=active]:text-white">
              Text
            </TabsTrigger>
          )}
          {mockElementData.type === "COMPONENT" && (
            <TabsTrigger value="component" className="data-[state=active]:bg-[#1bb274] data-[state=active]:text-white">
              Component
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="properties" className="space-y-4">
          <PropertyPanel title="Dimensions" properties={mockElementData.dimensions} />
          <PropertyPanel title="Position" properties={mockElementData.position} />
          <PropertyPanel title="Constraints" properties={mockElementData.constraints} />
          {mockElementData.autoLayout && <PropertyPanel title="Auto Layout" properties={mockElementData.autoLayout} />}
        </TabsContent>

        <TabsContent value="styles" className="space-y-4">
          {mockElementData.fill && <PropertyPanel title="Fill" properties={mockElementData.fill} />}
          {mockElementData.stroke && <PropertyPanel title="Stroke" properties={mockElementData.stroke} />}
          {mockElementData.effects && <PropertyPanel title="Effects" properties={mockElementData.effects} />}
          <PropertyPanel
            title="Opacity & Blending"
            properties={{
              opacity: mockElementData.opacity,
              blendMode: mockElementData.blendMode,
            }}
          />
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <PropertyPanel title="Padding" properties={mockElementData.padding} />
          {mockElementData.border && <PropertyPanel title="Border" properties={mockElementData.border} />}
          {mockElementData.radius && <PropertyPanel title="Border Radius" properties={mockElementData.radius} />}
        </TabsContent>

        {mockElementData.type === "TEXT" && (
          <TabsContent value="text" className="space-y-4">
            <PropertyPanel title="Font" properties={mockElementData.font} />
            <PropertyPanel title="Paragraph" properties={mockElementData.paragraph} />
          </TabsContent>
        )}

        {mockElementData.type === "COMPONENT" && (
          <TabsContent value="component" className="space-y-4">
            <PropertyPanel title="Component Properties" properties={mockElementData.componentProperties} />
            {mockElementData.variants && <PropertyPanel title="Variants" properties={mockElementData.variants} />}
            {mockElementData.overrides && <PropertyPanel title="Overrides" properties={mockElementData.overrides} />}
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

function getMockElementData(elementId: string) {
  // Mock data for demonstration
  const mockData: Record<string, any> = {
    "district-item-1": {
      id: "district-item-1",
      name: "Quận 1",
      type: "GROUP",
      dimensions: {
        width: "100%",
        height: "56px",
      },
      position: {
        x: "0px",
        y: "0px",
        rotation: "0°",
      },
      constraints: {
        horizontal: "SCALE",
        vertical: "TOP",
      },
      opacity: "100%",
      blendMode: "NORMAL",
      padding: {
        top: "16px",
        right: "16px",
        bottom: "16px",
        left: "16px",
      },
      autoLayout: {
        direction: "HORIZONTAL",
        alignment: "CENTER",
        spacing: "12px",
        padding: "0px",
      },
    },
    "search-bar": {
      id: "search-bar",
      name: "Search Bar",
      type: "GROUP",
      dimensions: {
        width: "100%",
        height: "48px",
      },
      position: {
        x: "0px",
        y: "72px",
        rotation: "0°",
      },
      constraints: {
        horizontal: "SCALE",
        vertical: "TOP",
      },
      fill: {
        type: "SOLID",
        color: "#FFFFFF",
        opacity: "100%",
      },
      stroke: {
        color: "#CCCCCC",
        weight: "1px",
        align: "INSIDE",
        dashPattern: "SOLID",
      },
      radius: {
        topLeft: "8px",
        topRight: "8px",
        bottomRight: "8px",
        bottomLeft: "8px",
      },
      effects: [
        {
          type: "DROP_SHADOW",
          color: "rgba(0, 0, 0, 0.05)",
          offset: { x: "0px", y: "1px" },
          radius: "2px",
          spread: "0px",
        },
      ],
      opacity: "100%",
      blendMode: "NORMAL",
      padding: {
        top: "12px",
        right: "16px",
        bottom: "12px",
        left: "16px",
      },
      autoLayout: {
        direction: "HORIZONTAL",
        alignment: "CENTER",
        spacing: "8px",
        padding: "0px",
      },
    },
    "title-text": {
      id: "title-text",
      name: "Quận/Huyện",
      type: "TEXT",
      dimensions: {
        width: "AUTO",
        height: "AUTO",
      },
      position: {
        x: "50%",
        y: "24px",
        rotation: "0°",
      },
      constraints: {
        horizontal: "CENTER",
        vertical: "TOP",
      },
      fill: {
        type: "SOLID",
        color: "#111111",
        opacity: "100%",
      },
      opacity: "100%",
      blendMode: "NORMAL",
      font: {
        family: "SF Pro Display",
        style: "Medium",
        size: "18px",
        weight: "500",
        letterSpacing: "0px",
        lineHeight: "24px",
      },
      paragraph: {
        alignment: "CENTER",
        spacing: "0px",
        indentation: "0px",
      },
    },
    "confirm-button": {
      id: "confirm-button",
      name: "Confirm Button",
      type: "COMPONENT",
      dimensions: {
        width: "100%",
        height: "56px",
      },
      position: {
        x: "0px",
        y: "BOTTOM",
        rotation: "0°",
      },
      constraints: {
        horizontal: "SCALE",
        vertical: "BOTTOM",
      },
      fill: {
        type: "SOLID",
        color: "#1BB274",
        opacity: "100%",
      },
      radius: {
        topLeft: "4px",
        topRight: "4px",
        bottomRight: "4px",
        bottomLeft: "4px",
      },
      effects: [],
      opacity: "100%",
      blendMode: "NORMAL",
      componentProperties: {
        variant: {
          type: "VARIANT",
          value: "primary",
        },
        size: {
          type: "VARIANT",
          value: "large",
        },
        disabled: {
          type: "BOOLEAN",
          value: false,
        },
      },
      variants: [
        {
          name: "primary",
          properties: {
            fill: "#1BB274",
            textColor: "#FFFFFF",
          },
        },
        {
          name: "secondary",
          properties: {
            fill: "#FFFFFF",
            stroke: "#1BB274",
            textColor: "#1BB274",
          },
        },
      ],
    },
    "pin-icon-1": {
      id: "pin-icon-1",
      name: "Pin Icon",
      type: "VECTOR",
      dimensions: {
        width: "24px",
        height: "24px",
      },
      position: {
        x: "16px",
        y: "CENTER",
        rotation: "0°",
      },
      constraints: {
        horizontal: "LEFT",
        vertical: "CENTER",
      },
      fill: {
        type: "SOLID",
        color: "#707070",
        opacity: "100%",
      },
      stroke: {
        color: "NONE",
        weight: "0px",
        align: "CENTER",
        dashPattern: "SOLID",
      },
      opacity: "100%",
      blendMode: "NORMAL",
    },
    "check-icon-1": {
      id: "check-icon-1",
      name: "Check Icon",
      type: "COMPONENT",
      dimensions: {
        width: "24px",
        height: "24px",
      },
      position: {
        x: "RIGHT",
        y: "CENTER",
        rotation: "0°",
      },
      constraints: {
        horizontal: "RIGHT",
        vertical: "CENTER",
      },
      fill: {
        type: "SOLID",
        color: "#1BB274",
        opacity: "100%",
      },
      stroke: {
        color: "#FFFFFF",
        weight: "2px",
        align: "CENTER",
        dashPattern: "SOLID",
      },
      radius: {
        topLeft: "4px",
        topRight: "4px",
        bottomRight: "4px",
        bottomLeft: "4px",
      },
      opacity: "100%",
      blendMode: "NORMAL",
      componentProperties: {
        state: {
          type: "VARIANT",
          value: "selected",
        },
      },
    },
  }

  return mockData[elementId] || null
}

