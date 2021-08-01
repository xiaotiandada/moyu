import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./index";

interface UserState {
    user: Object,
    mode: string
}

const factoryState = (): UserState => ({
  user: Object.create(null), // 用户信息
  mode: 'defaultMode', // 主题 defaultMode darkMode
})

const initialState: UserState = factoryState()

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Object>) => {
            console.log('action', action)
            state.user = action.payload
        },
        setMode: (state, action: PayloadAction<{ mode: string }>) => {
          console.log('action', action)
          state.mode = action.payload.mode
      }
    }
})

export const { setUser, setMode } = userSlice.actions

// 初始化用户信息
export const initUser = (): AppThunk => dispatch => {

  const getUser = async () => {
    // const result: any = await getUserProfile()
    const result: any = {
      code: 0,
      data: {
        id: 0,
        username: 'username',
        time: Date.now()
      }
    }
    console.log('result', result)
    console.log('setUser', setUser)
    if (result.code === 0) {
      let { username, id, time } = result.data
      dispatch(setUser({ username, id, time }))
    }
  }
  getUser()

}

export const selectUser = (state: RootState) => state.user.user
export const selectMode = (state: RootState) => state.user.mode

export default userSlice.reducer