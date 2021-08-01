import { createSlice} from "@reduxjs/toolkit";
interface OtherState {
    test: string
}

const initialState: OtherState = {
    test: 'test string'
}

export const userSlice = createSlice({
    name: 'other',
    initialState,
    reducers: {}
})

export default userSlice.reducer