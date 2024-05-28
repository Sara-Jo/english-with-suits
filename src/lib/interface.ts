import { UUID } from "crypto";

export interface Expression {
  id: number;
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
