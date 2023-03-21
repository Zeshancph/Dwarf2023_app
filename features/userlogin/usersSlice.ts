import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserEntity } from './userEntity'
import { UsersAPI } from './usersAPI'

// First, create the thunk
// export const fetchAllProblems = createAsyncThunk(
//   'problems/fetchAllProblems', // This is a name for the thunk (must be unique) not the endpoint
//   async (thunkAPI) => {
//     const response = ProblemsAPI.fetchAllProblems()
    
//     return response
//   }
// )
export const createUser = createAsyncThunk(
    'user/create', // This is a name for the thunk (must be unique) not the endpoint
    async (user: UserEntity, thunkAPI) => {
      console.log("user before thunk", user);
      const response = await UsersAPI.create(user);
      console.log("thunk response" , response)
      return response
    }

  )
  export const login = createAsyncThunk(
    'auth/login', // This is a name for the thunk (must be unique) not the endpoint
    async (user: UserEntity, thunkAPI) => {
      const response = UsersAPI.login(user)
      console.log(response);
      return response
    }
  )


interface UsersState {
  entities: UserEntity[]
  error: string | undefined
  token: string | undefined


}

const initialState = {
  token: undefined,
  entities: [],
  error: undefined

} as UsersState

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  
  extraReducers: (builder) => {


    builder.addCase(createUser.fulfilled, (state, action) => {
      console.log("running signup fulfilled");
      state.error = undefined;
      if (action.payload.id != undefined) {
        state.error = "Signup success";
      }
      })
      builder.addCase(login.fulfilled, (state, action) => {
        console.log("running login fulfilled");
        state.error = undefined;
        state.token = action.payload?.access_token
    })
    builder.addCase(login.rejected, (state, action) => {
        if (action.error.message === 'Request failed with status code 401') {
            state.error = 'Invalid login'
            state.token = undefined
        }
        
        console.log("error in slice", action.error);
    })
   
  },
})

// Action creators are generated for each case reducer function

export default usersSlice.reducer

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))