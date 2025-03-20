"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Square, Type, Image, Frame, Component, Group } from "lucide-react"
import { cn } from "@/lib/utils"

interface ElementTreeProps {
  selectedElement: string | null
  setSelectedElement: (id: string | null) => void
  filterText: string
}

export function ElementTree({ selectedElement, setSelectedElement, filterText }: ElementTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    "page-1": true,
    "frame-1": true,
  })

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getElementIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "frame":
        return <Frame className="w-4 h-4" />
      case "text":
        return <Type className="w-4 h-4" />
      case "rectangle":
      case "ellipse":
      case "polygon":
        return <Square className="w-4 h-4" />
      case "image":
        return <Image className="w-4 h-4" />
      case "component":
        return <Component className="w-4 h-4" />
      case "group":
        return <Group className="w-4 h-4" />
      default:
        return <Square className="w-4 h-4" />
    }
  }

  // Mock data for demonstration
  const mockElements = [
    {
      id: "page-1",
      name: "Mobile App",
      type: "PAGE",
      children: [
        {
          id: "frame-1",
          name: "District Selection Screen",
          type: "FRAME",
          children: [
            {
              id: "header-1",
              name: "Header",
              type: "GROUP",
              children: [
                { id: "back-button", name: "Back Button", type: "COMPONENT" },
                { id: "title-text", name: "Quận/Huyện", type: "TEXT" },
              ],
            },
            {
              id: "search-bar",
              name: "Search Bar",
              type: "GROUP",
              children: [
                { id: "search-input", name: "Search Input", type: "COMPONENT" },
                { id: "search-icon", name: "Search Icon", type: "VECTOR" },
                { id: "target-button", name: "Target Button", type: "COMPONENT" },
              ],
            },
            {
              id: "district-list",
              name: "District List",
              type: "GROUP",
              children: [
                {
                  id: "district-item-1",
                  name: "Quận 1",
                  type: "GROUP",
                  children: [
                    { id: "pin-icon-1", name: "Pin Icon", type: "VECTOR" },
                    { id: "district-text-1", name: "Quận 1 Text", type: "TEXT" },
                    { id: "check-icon-1", name: "Check Icon", type: "COMPONENT" },
                  ],
                },
                {
                  id: "district-item-2",
                  name: "Quận 4",
                  type: "GROUP",
                  children: [
                    { id: "pin-icon-2", name: "Pin Icon", type: "VECTOR" },
                    { id: "district-text-2", name: "Quận 4 Text", type: "TEXT" },
                    { id: "check-icon-2", name: "Check Icon", type: "COMPONENT" },
                  ],
                },
                {
                  id: "district-item-3",
                  name: "Thành phố Thủ Đức",
                  type: "GROUP",
                  children: [
                    { id: "pin-icon-3", name: "Pin Icon", type: "VECTOR" },
                    { id: "district-text-3", name: "Thành phố Thủ Đức Text", type: "TEXT" },
                  ],
                },
                // More district items...
              ],
            },
            {
              id: "confirm-button",
              name: "Confirm Button",
              type: "COMPONENT",
              children: [{ id: "confirm-text", name: "Xác nhận", type: "TEXT" }],
            },
          ],
        },
      ],
    },
  ]

  const renderTree = (elements: any[], level = 0) => {
    return elements
      .filter((el) => filterText === "" || el.name.toLowerCase().includes(filterText.toLowerCase()))
      .map((element) => {
        const hasChildren = element.children && element.children.length > 0
        const isExpanded = expandedNodes[element.id] || false

        return (
          <div key={element.id} className="select-none">
            <div
              className={cn(
                "flex items-center py-1 px-2 rounded-md text-sm cursor-pointer hover:bg-[#f5f6f7]",
                selectedElement === element.id && "bg-[#f5f6f7] text-[#1bb274]",
              )}
              style={{ paddingLeft: `${level * 12 + 8}px` }}
              onClick={() => setSelectedElement(element.id)}
            >
              {hasChildren ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleNode(element.id)
                  }}
                  className="mr-1 p-0.5"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#707070]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#707070]" />
                  )}
                </button>
              ) : (
                <div className="w-4 mr-1" />
              )}
              <span className="mr-1.5">{getElementIcon(element.type)}</span>
              <span className="truncate">{element.name}</span>
              <span className="ml-auto text-xs text-[#adadad]">{element.type}</span>
            </div>

            {hasChildren && isExpanded && renderTree(element.children, level + 1)}
          </div>
        )
      })
  }

  return <div className="overflow-auto max-h-[calc(100vh-240px)]">{renderTree(mockElements)}</div>
}

