import { UUID } from "crypto";

export interface IExpression {
  id: number;
  season: number;
  episode: number;
  en: string;
  ko: string;
  ex?: string;
}

export interface IUser {
  id: number;
  create_at: Date;
  user_id: UUID;
  nickname: string;
  bookmarks: number[];
}

export interface IEpisode {
  id: number;
  episode: number;
  title: string;
  description: string;
  image_url: string;
}
