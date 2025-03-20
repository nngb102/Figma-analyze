"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, Target, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function DistrictSelectionPage() {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentTime, setCurrentTime] = useState("9:41")

  useEffect(() => {
    // Khởi tạo giá trị mặc định sau khi mount
    setSelectedDistricts(["Quận 1", "Quận 4"])

    // Cập nhật thời gian
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Cập nhật mỗi phút

    return () => clearInterval(interval)
  }, [])

  const districts = [
    "Quận 1",
    "Quận 4",
    "Thành phố Thủ Đức",
    "Quận 3",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
  ]

  const filteredDistricts = districts.filter((district) => district.toLowerCase().includes(searchQuery.toLowerCase()))

  const toggleDistrict = (district: string) => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter((d) => d !== district))
    } else {
      setSelectedDistricts([...selectedDistricts, district])
    }
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen max-w-md mx-auto">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-time">{currentTime}</div>
        <div className="status-dots">
          <div className="status-dot"></div>
          <div className="status-dot"></div>
          <div className="status-dot"></div>
          <div className="status-dot"></div>
          <div className="status-dot"></div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-6 w-6 text-[#111111]" />
        </Button>
        <h1 className="text-xl font-semibold text-center flex-1 mr-8">Quận/Huyện</h1>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="bg-white rounded-lg p-2 flex items-center border border-[#e6e6e6] mb-4">
          <Search className="h-5 w-5 text-[#adadad] ml-2 mr-2" />
          <Input
            placeholder="Tìm tỉnh, thành phố"
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-[#111111] placeholder:text-[#adadad]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="ghost" size="icon" className="text-[#1bb274]">
            <Target className="h-5 w-5" />
          </Button>
        </div>

        {/* District List */}
        <div className="bg-white rounded-lg overflow-hidden">
          {filteredDistricts.map((district, index) => (
            <div key={district}>
              <div
                className="px-4 py-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleDistrict(district)}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 mr-4 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z"
                        fill="#707070"
                      />
                      <path
                        d="M12 21C16.5 17 20 13.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 13.4183 7.5 17 12 21Z"
                        stroke="#707070"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[#111111]">{district}</span>
                </div>
                {selectedDistricts.includes(district) && (
                  <div className="w-6 h-6 bg-[#1bb274] rounded flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              {index < filteredDistricts.length - 1 && <Separator className="bg-[#e6e6e6]" />}
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="fixed bottom-8 left-0 right-0 px-4 max-w-md mx-auto">
        <Button className="w-full bg-[#1bb274] hover:bg-[#048547] text-white py-4 h-14 text-lg">Xác nhận</Button>
      </div>
    </div>
  )
}

