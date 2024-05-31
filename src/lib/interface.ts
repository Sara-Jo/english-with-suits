import { UUID } from "crypto";

export interface Expression {
  id: number;
  season: number;
  episode: number;
  en: string;
  ko: string;
  ex?: string;
}

export interface User {
  id: number;
  create_at: Date;
  user_id: UUID;
  nickname: string;
  bookmarks: number[];
}

export interface Episode {
  id: number;
  episode: number;
  title: string;
  description: string;
  image_url: string;
}
