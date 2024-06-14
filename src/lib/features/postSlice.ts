import { PostQueryResponse, PostResponse } from "../../interface/post.interface";
import { apiSlice } from "../api/apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: ({ start, perPage }) => `posts?_start=${start}&_limit=${perPage}`,
      transformResponse: (response: PostQueryResponse[], meta) => {
        const totalCountHeader = meta?.response?.headers.get('X-Total-Count');
        return {
          data: response,
          totalCount: totalCountHeader ? parseInt(totalCountHeader, 10) : 0,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: ["Posts"]
    }),

    deletPost: builder.mutation({
      query: (postId) => {
        return {
          url: `posts/${postId}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["Posts"]
    }),

    updatePost: builder.mutation({
      query: ({ postId, payload }: { postId: number; payload: PostResponse }) => {
        return {
          url: `posts/${postId}`,
          method: "PUT",
          body: payload
        };
      },
      invalidatesTags: ["Posts"]
    })
  })
});

export const { useGetPostsQuery, useDeletPostMutation, useUpdatePostMutation } = postApiSlice;
