export type Link = {
  id: number;
  url: string;
  platform: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  tags: string[];
  saved_at: string;
};