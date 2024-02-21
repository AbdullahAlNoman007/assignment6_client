import { baseApi } from "../../api/baseApi";

export const authenticationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (info) => ({
                url: '/user/login',
                method: "POST",
                body: info
            })
        }),
        registration: builder.mutation({
            query: (info) => ({
                url: '/user/create-user',
                method: 'POST',
                body: info
            })
        })
    })
})

export const { useLoginMutation, useRegistrationMutation } = authenticationApi