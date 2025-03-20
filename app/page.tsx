import { DesignAnalyzer } from "@/components/design-analyzer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#111111]">Figma Design Analyzer</h1>
        <p className="text-[#707070] mb-8">
          Upload your Figma file or paste a Figma file URL to extract and analyze all design elements and properties.
        </p>
        <DesignAnalyzer />
      </div>
    </main>
  )
}

