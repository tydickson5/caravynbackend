// types/trip.ts
export type Post = {
  id: string;
  user_id: string;
  group_id: string;
  caption: string;
  media_url: string | null;
  media_type: string;
  latitude: number;
  longitude: number;
  created_at: string;
  post_likes: number;
  state: string;
  thread_id: string | null;
  head: boolean;
};

export type Trip = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  created_at: string;
  ended_at: string | null;
  posts: Post[];
};