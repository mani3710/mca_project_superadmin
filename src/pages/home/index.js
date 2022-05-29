import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { getAdminList, setPasswordVisible, createNewAdmin, deleteAdmin } from '../../redux/reducer/admin';
import { Button, ButtonGroup, Container, ButtonToolbar, Jumbotron, Card } from 'react-bootstrap';
import Drawer from 'react-drag-drawer';
import { v4 as uuidv4 } from 'uuid';
const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAdminList());
    }, []);

    //Store 
    const adminStore = useSelector(state => state.admin);
    const {
        dummyValue,
        loginStatus,
        adminData,
        adminList,
        adminCreationStatus
    } = adminStore;
    useEffect(() => {
        if (adminCreationStatus == "User name already found") {
            setAdminCreationError(adminCreationStatus);
        } else if (adminCreationStatus == "Created successfully") {
            setShowAdminCreatedSuccessDialog(true);
            setIsShowAddForm(false);
            setNewUserName("");
            setNewUserPassword("");
            setSuccessMessage("Admin created")
        }
    }, [adminCreationStatus])
    const setPasswordVisibleFunc = (index) => {
        console.log(index)
        dispatch(setPasswordVisible(index));
    }
    const creatNewAdminFunc = (index) => {
        if (newUserName && newUserPassword) {
            setAdminCreationError("")
            dispatch(createNewAdmin({
                uuid: uuidv4(),
                name: newUserName,
                password: newUserPassword
            }));
        } else {
            setAdminCreationError("Empty field found!")
        }
    }
    const [isShowAddForm, setIsShowAddForm] = useState(false);
    const [newUserName, setNewUserName] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [adminCreationError, setAdminCreationError] = useState("");
    const [showAdminCreatedSuccessDialog, setShowAdminCreatedSuccessDialog] = useState(false)
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedAdmin, setSelectedAdmin] = useState({ username: "" });
    const [showAdminDeleteWarning, setShowAdminDeleteWarning] = useState(false);
    return (
        <div style={{ width: "100vw", height: "100vh", backgroundColor: "white" }}>
            <center>
                <div style={{ width: "80vw", backgroundColor: "white", overflow: "auto" }}>
                    <h1 style={{ marginTop: 20 }}>REVIEW SYSTEM</h1>
                    <div class="d-flex flex-row-reverse bd-highlight">


                        <div class="p-2 bd-highlight">
                            <button
                                onClick={() => {
                                    setIsShowAddForm(true)
                                }}
                                type="button" class="btn btn-warning">CREATE ADMIN NEW</button>
                        </div>
                        <div class="p-2 bd-highlight">
                            <label style={{ fontWeight: "bold", marginTop: 5 }}>{adminData.username}</label>
                        </div>
                        <div class="p-2 bd-highlight">
                            <label style={{ marginTop: 5 }}>User :</label>
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Sno</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Password</th>
                                <th scope="col">Security</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminList.map((item, i) => {
                                return (
                                    <tr>
                                        <th scope="col">{i + 1}</th>
                                        <th scope="col">{item.username}</th>
                                        <th scope="col" >{item.isSee ? item.password : "*******************"}</th>
                                        <th scope="col"
                                            onClick={() => { setPasswordVisibleFunc(i) }}
                                        >{item.isSee ? <i class="fa-solid fa-eye" style={{ marginLeft: 15 }}></i> : <i class="fa-solid fa-eye-slash" style={{ marginLeft: 15 }}></i>}</th>
                                        <th scope="col" >
                                            <button
                                                style={{ width: 100, height: 40 }}
                                                onClick={() => {
                                                    setSelectedAdmin(item);
                                                    setShowAdminDeleteWarning(true)
                                                    // setIsShowAddForm(false)
                                                }}

                                                type="button" class="btn btn-info">DELETE</button>
                                        </th>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                </div>
            </center>

            <Drawer

                open={isShowAddForm}
                // onRequestClose={this.toggle}
                direction='left'

            >

                <Card style={{ backgroundColor: "white", height: 280 }}>


                    <Card.Body className="pl-3 " style={{ backgroundColor: "white" }}>
                        <center>
                            <label style={{ fontWeight: "bold" }}>ADD NEW ADMIN</label>
                            <form >
                                <div style={{ marginTop: 18 }}>
                                    <label for="fname">User Name : </label>
                                    <input
                                        value={newUserName}
                                        onChange={(e) => {
                                            setNewUserName(e.target.value);
                                        }}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray" }}
                                        type="text" id="fname" name="fname" />
                                </div>
                                <div style={{ marginTop: 18 }}>
                                    <label for="lname">Password    : </label>
                                    <input
                                        onChange={(e) => {
                                            setNewUserPassword(e.target.value);
                                        }}
                                        value={newUserPassword}
                                        style={{ marginLeft: 10, borderColor: "transparent", borderBottomColor: "gray" }}
                                        type="text" id="lname" name="lname" />
                                </div>


                            </form>
                            <center><label style={{ color: "red" }}>{adminCreationError}</label></center>
                            <div style={{ marginTop: 24 }}>
                                <button
                                    style={{ width: 100, height: 40 }}
                                    onClick={() => {
                                        setIsShowAddForm(false)
                                    }}

                                    type="button" class="btn btn-info">CANCEL</button>
                                <button
                                    style={{ marginLeft: 15, width: 100, height: 40 }}
                                    onClick={() => {
                                        creatNewAdminFunc()
                                    }}

                                    type="button" class="btn btn-warning">CREATE</button>
                            </div>

                        </center>




                    </Card.Body>
                </Card>

            </Drawer>


            <Drawer

                open={showAdminCreatedSuccessDialog}
                // onRequestClose={this.toggle}
                direction='left'

            >

                <Card style={{ backgroundColor: "white", height: 150 }}>


                    <Card.Body className="pl-3 " style={{ backgroundColor: "white" }}>
                        <center>
                            <label style={{ fontWeight: "bold" }}>{successMessage} successfully</label>
                            <div style={{ marginTop: 24 }}>

                                <button
                                    style={{ marginLeft: 15, width: 100, height: 40 }}
                                    onClick={() => {
                                        setShowAdminCreatedSuccessDialog(false);
                                        dispatch(getAdminList());
                                    }}

                                    type="button" class="btn btn-warning">CLOSE</button>
                            </div>

                        </center>




                    </Card.Body>
                </Card>

            </Drawer>
            <Drawer

                open={showAdminDeleteWarning}
                // onRequestClose={this.toggle}
                direction='left'

            >

                <Card style={{ backgroundColor: "white", height: 170 }}>


                    <Card.Body className="pl-3 " style={{ backgroundColor: "white" }}>
                        <center>
                            <label style={{ fontWeight: "bold" }}>DELETE</label>

                            <center><label style={{ color: "red" }}>{selectedAdmin.username}</label></center>
                            <div style={{ marginTop: 24 }}>
                                <button
                                    style={{ width: 100, height: 40 }}
                                    onClick={() => {
                                        setShowAdminDeleteWarning(false)
                                    }}

                                    type="button" class="btn btn-info">CANCEL</button>
                                <button
                                    style={{ marginLeft: 15, width: 100, height: 40 }}
                                    onClick={() => {
                                        dispatch(deleteAdmin({ uuid: selectedAdmin.uuid }));
                                        setSuccessMessage("Deleted");
                                        setShowAdminDeleteWarning(false)
                                        setShowAdminCreatedSuccessDialog(true);

                                    }}

                                    type="button" class="btn btn-danger">REMOVE</button>
                            </div>

                        </center>




                    </Card.Body>
                </Card>

            </Drawer>
        </div >
    );
}
export default Home;
