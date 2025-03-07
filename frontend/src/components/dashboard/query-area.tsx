"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { MusicItem, PaginatedResult } from "@/types/music"
import { searchMusic } from "@/lib/music-service"
import Image from "next/image"
import { Music, Search, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"

interface QueryAreaProps {
  onSubscribe: (music: MusicItem) => void
}

export default function QueryArea({ onSubscribe }: QueryAreaProps) {
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [album, setAlbum] = useState("")
  const [year, setYear] = useState("")
  const [searchResults, setSearchResults] = useState<PaginatedResult | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 2 // Number of results per page

  const handleSearch = async (page = 1) => {
    // Validate at least one field is filled
    if (!title && !artist && !album && !year) {
      alert("Please fill in at least one search field")
      return
    }

    setIsSearching(true)
    setHasSearched(true)
    setCurrentPage(page)

    try {
      const results = await searchMusic({ title, artist, album, year }, page, pageSize)

      setSearchResults(results)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handlePreviousPage = () => {
    if (searchResults && currentPage > 1) {
      handleSearch(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (searchResults && currentPage < searchResults.totalPages) {
      handleSearch(currentPage + 1)
    }
  }

  return (
    <Card className="h-[600px] overflow-auto">
      <CardHeader>
        <CardTitle>Search Music</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Song title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="artist">Artist</Label>
              <Input id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="album">Album</Label>
              <Input id="album" value={album} onChange={(e) => setAlbum(e.target.value)} placeholder="Album name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Release year" />
            </div>
          </div>

          <Button onClick={() => handleSearch(1)} disabled={isSearching} className="w-full">
            {isSearching ? "Searching..." : "Query"}
            <Search className="ml-2 h-4 w-4" />
          </Button>

          {hasSearched && (
            <div className="mt-6">
              <h3 className="font-medium mb-4">Search Results</h3>

              {!searchResults || searchResults.items.length === 0 ? (
                <div className="text-center p-8 border rounded-lg">
                  <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p>No result is retrieved. Please query again.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {searchResults.items.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4">
                        <div className="relative w-24 h-24 flex-shrink-0 mx-auto sm:mx-0">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl || "/placeholder.svg"}
                              alt={`${item.artist} image`}
                              fill
                              className="object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center rounded-md">
                              <Music className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="text-sm text-muted-foreground">
                            <p>Artist: {item.artist}</p>
                            <p>Album: {item.album}</p>
                            <p>Year: {item.year}</p>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => onSubscribe(item)}>
                            Subscribe
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination controls */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-muted-foreground">
                      Showing {searchResults.items.length} of {searchResults.totalItems} results
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage <= 1}>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      <div className="text-sm">
                        Page {currentPage} of {searchResults.totalPages}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage >= searchResults.totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

