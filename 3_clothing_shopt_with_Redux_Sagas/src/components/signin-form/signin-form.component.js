import { useState, useContext } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

// We need to import the context
// import { UserContext } from "../../contexts/user.context";

import { SignInContainer, ButtonsContainer } from "./signin-form.style.js";

import { useDispatch } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

const defaultformFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  // console.log("hit sign-in");

  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultformFields);
  const { email, password } = formFields;

  // We use the user context and we get back an object
  // const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultformFields);
  };

  const signInWithGoogle = async () => {
    // const response = await signInWithGooglePopup();
    // console.log(response);
    // We can now move it into the user context
    // setCurrentUser(response.user);
    // createUserDocumentFromAuth(response.user);
    //With Saga:

    dispatch(googleSignInStart());
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("submit");

    try {
      // const response = await signInAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );

      //With Saga:
      dispatch(emailSignInStart(email, password));

      // console.log(response);
      // setCurrentUser(response.user);
      resetFormFields();
    } catch (error) {
      // switch (error.code) {
      //   case "auth/wrong-password":
      //     alert("Incorrect password for email");
      //     break;
      //   case "auth/user-not-found":
      //     alert("No user associated with this email");
      //     break;
      //   default:
      //     console.log(error);
      // }
      console.log("user sign in failed", error);
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
