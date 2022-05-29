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

export const getAdminList = createAsyncThunk(
    'admin/getAdminList',
    async () => {
        try {

            const result = await API.get("/superadmin/getadmin")
            console.log(result.data);
            return { result: result.data };
        } catch (error) {
            alert(error);
        }
    });

export const createNewAdmin = createAsyncThunk(
    'admin/createNewAdmin',
    async (body) => {
        try {
            console.log(body)
            const result = await API.post("/superadmin/create/admin", body)
            console.log(result.data);
            return { result: result.data };

        } catch (error) {
            alert(error);
        }
    });
export const deleteAdmin = createAsyncThunk(
    'admin/deleteAdmin',
    async (body) => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(body);

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:5000/superadmin/delete/admin", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

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
        },
        adminList: [],
        adminCreationStatus: ""

    },
    reducers: {
        setPasswordVisible: (state, action) => {
            console.log("46", action.payload);
            state.adminList[action.payload].isSee = !state.adminList[action.payload].isSee;
        }
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

        builder.addCase(getAdminList.pending, (state) => {
            state.adminLoader = true;

        });
        builder.addCase(getAdminList.fulfilled, (state, action) => {
            console.log(action.payload.result)
            state.adminLoader = false;
            for (let obj of action.payload.result.data) {
                obj.isSee = false;
            }
            state.adminList = action.payload.result.data;
        });
        builder.addCase(getAdminList.rejected, (state) => {
            state.adminLoader = false;

        });

        builder.addCase(createNewAdmin.pending, (state) => {
            state.adminLoader = true;
            state.adminCreationStatus = "";
        });
        builder.addCase(createNewAdmin.fulfilled, (state, action) => {
            //console.log(action.payload.result)
            state.adminLoader = false;
            state.adminCreationStatus = action.payload.result.message;
            // for (let obj of action.payload.result.data) {
            //     obj.isSee = false;
            // }
            // state.adminList = action.payload.result.data;
        });
        builder.addCase(createNewAdmin.rejected, (state) => {
            state.adminLoader = false;

        });
        builder.addCase(deleteAdmin.pending, (state) => {
            state.adminLoader = true;
        });
        builder.addCase(deleteAdmin.fulfilled, (state, action) => {
            state.adminLoader = false;
        });
        builder.addCase(deleteAdmin.rejected, (state) => {
            state.adminLoader = false;

        });



    }
});
export const {
    setPasswordVisible
} = adminSclice.actions;

export default adminSclice.reducer;