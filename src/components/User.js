import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleUser from "./SingleUser";
import { useNavigate } from "react-router-dom";
import "../styles/user.css";

const User = ({ isEdit, data }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    isEdit === true
      ? {
          userName: data?.userName,
          email: data?.email,
          phoneNumber: data?.phoneNumber,
        }
      : {
          userName: "",
          email: "",
          phoneNumber: "",
        }
  );

  const [isNameBlank, setIsNameBlank] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [users, setUser] = useState([]);

  const onChangeHandler = (event) => {
    let obj = { ...formData };
    obj[event.target.name] = event.target.value;
    setFormData(obj);
  };

  //userName validator

  const validateName = () => {
    let val = formData?.userName === "";
    setIsNameBlank(val);
  };
  //email validator
  const validateEmail = () => {
    console.log("called");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let val = emailRegex.test(formData.email);
    setIsEmailValid(val);
  };

  //phone number validator

  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^\d{10}$/;
    let val = phoneNumberRegex.test(formData.phoneNumber);
    setIsValidPhoneNumber(val);
  };

  //submithandler

  const handleSubmit = () => {
    if (isEdit) {
      users.splice(data?.index, 1, formData);

      localStorage.setItem("users", JSON.stringify(users));
      setUser(users);
      navigate("/");
    } else {
      let newUsers = [...users, formData];

      localStorage.setItem("users", JSON.stringify(newUsers));
      setUser(newUsers);
    }

    reset();
  };

  //reset

  const reset = () => {
    setFormData({
      userName: "",
      email: "",
      phoneNumber: "",
    });
  };

  //delete handler

  const onDeleteHandler = (id) => {
    const restUsers = users.filter((user, index) => index !== id);
    localStorage.setItem("users", JSON.stringify(restUsers));
    setUser(restUsers);
  };

  useEffect(() => {
    const userArray = JSON.parse(localStorage.getItem("users"));

    if (userArray !== null) {
      setUser(userArray ?? []);
    }
  }, []);

  return (
    <div className="container">
      <Box className="form">
        <h2>{isEdit ? "Edit User" : "Create User"}</h2>
        <TextField
          name="userName"
          value={formData?.userName}
          label="Enter user name"
          sx={{ m: 3, width: "80%" }}
          onChange={onChangeHandler}
          onBlur={validateName}
          error={isNameBlank}
          helperText={isNameBlank ? "Name can't be empty" : ""}
        />
        <TextField
          name="email"
          label="Enter Email"
          sx={{ m: 3, width: "80%" }}
          onChange={onChangeHandler}
          onBlur={validateEmail}
          value={formData.email}
          error={!isEmailValid}
          helperText={!isEmailValid ? "Invalid email format" : ""}
        />
        <TextField
          type="number"
          name="phoneNumber"
          value={formData?.phoneNumber}
          label="Enter Phone Number"
          sx={{ m: 3, width: "80%" }}
          onChange={onChangeHandler}
          onBlur={validatePhoneNumber}
          error={!isValidPhoneNumber}
          helperText={!isValidPhoneNumber ? "Invalid phone number format" : ""}
        />

        <Button
          disabled={
            formData?.userName === "" ||
            formData?.email === "" ||
            formData?.phoneNumber === ""
          }
          onClick={handleSubmit}
          variant="contained"
        >
          {isEdit ? "Edit user" : "Create user"}
        </Button>
      </Box>

      {users.length > 0 && (
        <div
         className="user-list"
        >
          {users.map((user, index) => (
            <SingleUser
              key={index}
              userName={user.userName}
              email={user.email}
              phoneNumber={user.phoneNumber}
              index={index}
              onDeleteHandler={onDeleteHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default User;
