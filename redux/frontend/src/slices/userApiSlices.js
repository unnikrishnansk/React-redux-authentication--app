import { apiSlices } from "./ApiSlices";
const USER_URL = 'api/users';

export const userApiSlices = apiSlices.injectEndpoints({
    endpoints : (builder) => ({
        login : builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        register : builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: 'POST',
                body: data
            })
        }),
        updateUser : builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        deleteUser : builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/delete`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url:`${USER_URL}/logout`,
                method: 'POST'
            })
        })
    })
})


export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = userApiSlices;