import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from '../../store'
import { Tauth } from "../../../types/program.type";


const initialState: Tauth = {
    user: null,
    token: null
}

export const authSlicer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Tauth>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        }
    }
})

export const { setUser, logout } = authSlicer.actions
export const useCurrentToken = (state: RootState) => state.auth.token

export default authSlicer.reducer