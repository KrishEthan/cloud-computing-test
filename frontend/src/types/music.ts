export interface MusicItem {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  imageUrl: string;
}

export interface SearchParams {
  title?: string;
  artist?: string;
  album?: string;
  year?: string;
}

export interface PaginatedResult {
  items: MusicItem[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
