import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { User, UserInitialState, UserRegister } from "../../types/User";
import {
  Authentication,
  AuthenticationToken,
} from "../../types/Authentication";
import { QueryOptions } from "../../types/QueryOptions";

const initialState: UserInitialState = {
  //the currently logged-in user
  user: null,
  //all aray of users
  users: [],
  loading: false,
  error: null,
};

//Fetch data
const API_BASE_URL = process.env.REACT_APP_API_URL;
const URL = `${API_BASE_URL}/users`;
const profileUrl = `${API_BASE_URL}/auth/authenticate`;
const loginUrl = `${API_BASE_URL}/auth/login`;

//Queries
const createQueryString = (options: QueryOptions) => {
  const params = new URLSearchParams();
  params.append("page", options.page.toString());
  params.append("pageSize", options.pageSize.toString());
  params.append("sortBy", options.sortBy);
  params.append("sortOrder", options.sortOrder);
  return params.toString();
};

//Define thunk for fetching all users
export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (options: QueryOptions, { rejectWithValue }) => {
    try {
      const queryString = createQueryString(options);
      const response = await fetch(`${URL}?${queryString}`);
      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }
      const data: User[] = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

//Define thunk for fetching single user
export const fetchUserById = createAsyncThunk(
  "fetchUserById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/${id}`);
      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }
      const data: User = await response.json();
      return { data, id };
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

// Define thunk for update user
export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ id, ...updatedProps }: User, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProps),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }

      const updatedUser: User = await response.json();
      dispatch(saveUserInformation(updatedUser));
      return updatedUser;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

//Define thunk for register new user
export const registerUser = createAsyncThunk(
  "registerUser",
  async (newUser: UserRegister, { rejectWithValue }) => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }
      const data: User = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

//Define thunk for user with session
export const getAuthentication = createAsyncThunk(
  "getAuthentication",
  async (_, { rejectWithValue }) => {
    try {
      const access_token = localStorage.getItem("token");
      if (!access_token) {
        throw new Error("No token found");
      }
      const response = await fetch(profileUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const responseData = await response.json();
      console.log("API Response: ", responseData); // Log the API response
      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }
      return responseData as User;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

//Define thunk for login user
export const loginUser = createAsyncThunk(
  "loginUser",
  async (credentials: Authentication, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message);
        return rejectWithValue(errorResponse);
      }
      const data: AuthenticationToken = await response.json();
      console.log("Token received: ", data.access_token);
      localStorage.setItem("token", data.access_token);
      const authentication = await dispatch(getAuthentication());
      return authentication.payload as User;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

//Define slice for users
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      return state;
    },
    saveUserInformation: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Fetch all users
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    });
    builder.addCase(getAllUsers.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    //Fetch user by id
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      const id = action.payload.data.id;
      return {
        ...state,
        users: state.users.filter((user) => user.id !== id),
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchUserById.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    //Update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const user = action.payload;
      return {
        ...state,
        loading: false,
        users: state.users.map((item) => (item.id === user?.id ? user : item)),
        error: null,
      };
    });
    builder.addCase(updateUser.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    //Register user
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        users: state.users.concat(action.payload),
        user: action.payload,
        loading: false,
        error: null,
      };
    });
    builder.addCase(registerUser.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    //Get authentication
    builder.addCase(getAuthentication.fulfilled, (state, action) => {
      console.log("User state updated with: ", action.payload); // Log the user state update
      state.user = action.payload; // Directly set the user
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getAuthentication.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(getAuthentication.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    //Login user
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload; // Directly set the user
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "An error occurred",
      };
    });
  },
});

const userReducer = usersSlice.reducer;
export const { logout, saveUserInformation } = usersSlice.actions;
export default userReducer;
