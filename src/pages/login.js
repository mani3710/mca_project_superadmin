import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducer/admin';
import { useNavigate } from 'react-router-dom';
const emailREgex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const FormPage = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    //Store 
    const adminStore = useSelector(state => state.admin);
    const {
        dummyValue,
        loginStatus
    } = adminStore;
    useEffect(() => {
        if (adminStore.loginStatus == "Success") {
            console.log("Move to next");
            navigation("/home")
        } else if (adminStore.loginStatus == "Failed") {
            setLoginError("Incorrect user name/password");
        }

    }, [adminStore.loginStatus])
    const loginFunc = async () => {
        console.log("data", username, password)
        if (username && password) {
            setLoginError("");
            dispatch(login({ "username": username, "password": password }))


        } else {
            setLoginError("Empty field found!");
        }
    }
    return (
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card" style={{ marginTop: "15%" }}>
                    <div className="card-header" style={{ marginTop: 40 }}>
                        <h3>Login In</h3>
                        <div className="d-flex justify-content-end social_icon">
                            <span style={{ marginTop: -10 }}>
                                <label style={{ fontSize: 25, fontWeight: "bold" }}>ANNA UNIVERSITY</label>
                            </span>

                        </div>

                    </div>
                    <div className="card-body">
                        <form>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>

                                <input
                                    style={{ color: "#000" }}
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    type="text" className="form-control" placeholder="Enter your user name" />

                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    type="password" className="form-control" placeholder="Enter password" />
                            </div>
                            <center><label style={{ color: "red" }}>{loginError}</label></center>

                            <div className="form-group" style={{ cursor: "pointer" }}>
                                <input
                                    onClick={() => {
                                        loginFunc()
                                    }}
                                    type="button" value="Login" className="btn float-right login_btn" />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>


    );
};

export default FormPage;