import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
    }),
    tagTypes: ["Entities"],
    endpoints: (builder) => ({
        getList: builder.query({
            query: () => "/client/list",
            transformResponse: (res) => {
                return res;
            },
            providesTags: ["Entities"],
        }),
        addEntity: builder.mutation({
            query: (entity) => ({
                url: "/client/create",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: entity,
            }),
            invalidatesTags: ["Entities"],
        }),
        updateEntity: builder.mutation({
            query: (entity) => ({
                url: "/client/update",
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: entity,
            }),
            invalidatesTags: ["Entities"],
        }),
        deleteEntity: builder.mutation({
            query: (entity) => ({
                url: "/client/delete",
                method: "DELETE",
                body: entity,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }),
            invalidatesTags: ["Entities"],
        }),
    }),
});

export const {
    useGetListQuery,
    useAddEntityMutation,
    useDeleteEntityMutation,
    useUpdateEntityMutation,
} = apiSlice;
