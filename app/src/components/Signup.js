import { Button, Container, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import API_BASE_URL from "../config";

/**
 * @author Noorullah Niamatullah
 * @returns sign up form 
 */
export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //hook for valid email
  const [emailValid, setEmailValid] = useState(true);
  //hook for a valid password
  const [passwordValid, setPasswordValid] = useState(true);
  
  /**
   * @param {event} event object to update the eamil state
   * also checks if the email value match a regular expression for a valid email
   */
  const emailChange = (event) => {
    setEmail(event.target.value)
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setEmailValid(emailRegex.test(event.target.value));
  };
  /**
   * @param {*event} event event object to update the password state
   * also checks if the password value matches a regualr expression for valid password being charecters long with a capital letter and a number 
   */
  const passwordChange = (event) => {
    setPassword(event.target.value);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    setPasswordValid(passwordRegex.test(event.target.value));
  };
  /**
   * prevent the default form submission if the email and password field are empty
   * if the email and password are valid send a fetch to api with the formdata for signup 
   * @returns an alret based on the respons result
   */
  const handleSignup = (event) => {

    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert('Please fill out all required fields');
      return;
    }
    if (!emailValid) {
      alert('Please enter a valid email address');
      return;
    }
    if (!passwordValid) {
      alert('Password must be at least 8 characters long and contain at least one uppercase letter and one number');
      return;
    }
    const formData = new FormData();
    formData.append("userName", email);
    formData.append("password", password);
    fetch(`${API_BASE_URL}adduser`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response) {
          console.log("no response");
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then((json) => {
        if (json.message ==="username already exist") {
          console.log(json);
          alert("username already exist");
        }
        if (json.message === "Success") {
          console.log(json);
          alert("you have signed up successfully");
          setEmail("");
          setPassword("");
          window.location.hash = "#/signin";
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <form action="" onSubmit={handleSignup}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 440,
          padding: 1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign up{" "}
        </Typography>
        <TextField
          required
          margin="normal"
          type="email"
          variant="outlined"
          placeholder="Email"
          label="Email"
          value={email}
          onChange={emailChange}
          helperText={!emailValid && "Please enter a valid email address"}
          fullWidth
        ></TextField>
        <TextField
          required
          margin="normal"
          type="password"
          variant="outlined"
          placeholder="Password"
          label="password"
          value={password}
          onChange={passwordChange}
          helperText={!passwordValid && "Password must be at least 8 characters long and contain at least one uppercase letter and one number"}
          onClick={() => setPassword("")}
          fullWidth
        ></TextField>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
          sx={{ marginTop: 1 }}
        >
          Sign up
        </Button>
        <Link href="#/signin">
            <li>Already hava an account?</li>
          </Link>
        <Typography sx={{ fontSize: 14,color:'green' }}>Note:In case of no response, kindly try again</Typography>
      </Container>
    </form>
  );
};
