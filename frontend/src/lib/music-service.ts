import type { MusicItem, SearchParams, PaginatedResult } from "@/types/music";

// Mock database of music - expanded with more entries to demonstrate pagination
const musicDatabase: MusicItem[] = [
  {
    id: "1",
    title: "Come Monday",
    artist: "Jimmy Buffett",
    album: "Living and Dying in 3/4 Time",
    year: "1974",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    title: "Pencil Thin Mustache",
    artist: "Jimmy Buffett",
    album: "Living and Dying in 3/4 Time",
    year: "1974",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    title: "Rivers of Babylon",
    artist: "Boney M.",
    album: "Nightflight to Venus",
    year: "1978",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    title: "Rivers of Babylon",
    artist: "Sublime",
    album: "Sublime",
    year: "1996",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    title: "Love Story",
    artist: "Taylor Swift",
    album: "Fearless",
    year: "2008",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    title: "You Belong With Me",
    artist: "Taylor Swift",
    album: "Fearless",
    year: "2008",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "7",
    title: "Dead Leaves and the Dirty Ground",
    artist: "The White Stripes",
    album: "White Blood Cells",
    year: "2001",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "8",
    title: "Hotel Yorba",
    artist: "The White Stripes",
    album: "White Blood Cells",
    year: "2001",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "9",
    title: "Fell in Love with a Girl",
    artist: "The White Stripes",
    album: "White Blood Cells",
    year: "2001",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "10",
    title: "We're Going to Be Friends",
    artist: "The White Stripes",
    album: "White Blood Cells",
    year: "2001",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "11",
    title: "Fearless",
    artist: "Taylor Swift",
    album: "Fearless",
    year: "2008",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "12",
    title: "Fifteen",
    artist: "Taylor Swift",
    album: "Fearless",
    year: "2008",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "13",
    title: "White Horse",
    artist: "Taylor Swift",
    album: "Fearless",
    year: "2008",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "14",
    title: "Hey Jude",
    artist: "The Beatles",
    album: "The Beatles Again",
    year: "1968",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "15",
    title: "Let It Be",
    artist: "The Beatles",
    album: "Let It Be",
    year: "1970",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
];

// Simulate a delay to mimic API call
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function searchMusic(
  params: SearchParams,
  page = 1,
  pageSize = 5
): Promise<PaginatedResult> {
  // Simulate network delay
  await delay(800);

  // Filter music based on search parameters
  const filteredResults = musicDatabase.filter((item) => {
    const matchTitle =
      !params.title ||
      item.title.toLowerCase().includes(params.title.toLowerCase());
    const matchArtist =
      !params.artist ||
      item.artist.toLowerCase().includes(params.artist.toLowerCase());
    const matchAlbum =
      !params.album ||
      item.album.toLowerCase().includes(params.album.toLowerCase());
    const matchYear = !params.year || item.year === params.year;

    // All conditions must match (AND operator)
    return matchTitle && matchArtist && matchAlbum && matchYear;
  });

  // Calculate pagination
  const totalItems = filteredResults.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  // Get the current page of results
  const paginatedItems = filteredResults.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    page,
    pageSize,
    totalItems,
    totalPages,
  };
}
