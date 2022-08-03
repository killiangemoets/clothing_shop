import { useState, useContext, FormEvent, ChangeEvent } from "react";

import { useDispatch } from "react-redux";

// import {
//   createAuthUserWithEmailAndPassword,
//   createUserDocumentFromAuth,
// } from "../../utils/firebase/firebase.utils";

import { AuthError, AuthErrorCodes } from "firebase/auth";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer } from "./signup-form.style";
import { signUpStart } from "../../store/user/user.action";

// import { UserContext } from "../../contexts/user.context";

const defaultformFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  // console.log("hit sign-up");
  const [formFields, setFormFields] = useState(defaultformFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const dispatch = useDispatch();

  //   const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultformFields);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");

    if (password !== confirmPassword) {
      alert("passwords do no match");
      return;
    }

    try {
      // const response = await createAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      // //   console.log(response);

      // //   setCurrentUser(response.user);

      // // We still need to do it here bc we need the display name
      // const userDocRef = await createUserDocumentFromAuth(response.user, {
      //   displayName,
      // });
      // //   console.log(userDocRef);

      //With Saga:
      dispatch(signUpStart(email, password, displayName));

      resetFormFields();
    } catch (error) {
      // if ((error as AuthError).code === "auth/email-already-in-use") {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creattion encountered an error", error);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm Passorw"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
