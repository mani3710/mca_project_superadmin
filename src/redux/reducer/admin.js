import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../config/api';
export const login = createAsyncThunk(
    'admin/login',
    async (body) => {
        try {
            console.log(body)
            const result = await API.post("/superadmin/sigin/", body)
            console.log(result.data);
            return { result: result.data };

        } catch (error) {
            alert(error);
        }
    });

const adminSclice = createSlice({
    name: "admin",
    initialState: {
        adminLoader: false,
        dummyValue: "manikandan",
        loginStatus: "",
        adminData: {
            uuid: "",
            username: "",
            password: ""
        }
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.adminLoader = true;
            state.loginStatus = "";
        });
        builder.addCase(login.fulfilled, (state, action) => {
            console.log(action.payload.result.message)
            state.adminLoader = false;
            if (action.payload.result.message == "Successfully signin") {
                state.loginStatus = "Success";
                state.adminData = action.payload.result.data;
            } else {
                state.loginStatus = "Failed"
            }
        });
        builder.addCase(login.rejected, (state) => {
            state.adminLoader = false;
            state.loginStatus = "failed"
        });



    }
});

export default adminSclice.reducer;