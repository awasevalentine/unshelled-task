export interface PostResponse {
    userId: number;
    id: number;
    title: string;
    body: string
}

export interface PostQueryResponse {
    data: PostResponse[];
    totalCount: number;
  }
  