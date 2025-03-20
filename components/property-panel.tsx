"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Copy } from "lucide-react"

interface PropertyPanelProps {
  title: string
  properties: Record<string, any> | null | undefined
}

export function PropertyPanel({ title, properties }: PropertyPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  if (!properties) return null

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

  const renderPropertyValue = (value: any) => {
    if (value === null || value === undefined) return "None"

    if (typeof value === "object") {
      if (Array.isArray(value)) {
        return (
          <div className="pl-4 border-l border-[#e6e6e6]">
            {value.map((item, index) => (
              <div key={index} className="mt-2">
                {typeof item === "object" ? (
                  Object.entries(item).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between py-1">
                      <span className="text-[#707070] text-xs">{k}</span>
                      <span className="text-xs font-mono">{renderPropertyValue(v)}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs font-mono">{String(item)}</span>
                )}
              </div>
            ))}
          </div>
        )
      }

      return (
        <div className="pl-4 border-l border-[#e6e6e6]">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-1">
              <span className="text-[#707070] text-xs">{k}</span>
              <span className="text-xs font-mono">{renderPropertyValue(v)}</span>
            </div>
          ))}
        </div>
      )
    }

    // Handle color values
    if (typeof value === "string" && value.startsWith("#")) {
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full border border-[#e6e6e6]" style={{ backgroundColor: value }} />
          <span className="text-xs font-mono">{value}</span>
        </div>
      )
    }

    return String(value)
  }

  return (
    <div className="border border-[#e6e6e6] rounded-md overflow-hidden">
      <div
        className="flex items-center justify-between p-3 bg-[#f5f6f7] cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 mr-2 text-[#707070]" />
          ) : (
            <ChevronRight className="w-4 h-4 mr-2 text-[#707070]" />
          )}
          <h4 className="font-medium text-sm">{title}</h4>
        </div>
        <button
          className="p-1 hover:bg-[#e6e6e6] rounded-md"
          onClick={(e) => {
            e.stopPropagation()
            copyToClipboard(JSON.stringify(properties, null, 2))
          }}
        >
          <Copy className="w-3.5 h-3.5 text-[#707070]" />
        </button>
      </div>

      {isExpanded && (
        <div className="p-3 bg-white">
          {Object.entries(properties).map(([key, value]) => (
            <div key={key} className="py-1.5 border-b border-[#f5f6f7] last:border-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#111111]">{key}</span>
                {typeof value !== "object" || value === null ? (
                  <span className="text-xs font-mono">{renderPropertyValue(value)}</span>
                ) : null}
              </div>
              {typeof value === "object" && value !== null && <div className="mt-1">{renderPropertyValue(value)}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

