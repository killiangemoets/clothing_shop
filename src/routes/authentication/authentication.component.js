// import { useEffect } from "react";
// import {
//   auth,
//   signInWithGooglePopup,
//   signInWithGoogleRedirect,
//   createUserDocumentFromAuth,
// } from "../../utils/firebase/firebase.utils";
// import { getRedirectResult } from "firebase/auth";

import SignUpForm from "../../components/signup-form/signup-form.component";
import SignInForm from "../../components/signin-form/signin-form.component";

import { AuthenticationContainer } from "./authentication.style.js";

const Authentication = () => {
  // const logGoogleRedirectUser = async () => {
  //   const response = await getRedirectResult(auth);
  //   console.log(response);
  //   if (response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //   }
  // };

  // useEffect(() => {
  //   logGoogleRedirectUser();
  // }, []);

  // const logGoogleUser = async () => {
  //   const response = await signInWithGooglePopup();
  //   console.log(response);
  //   const userDocRef = await createUserDocumentFromAuth(response.user);
  // };

  // const logGoogleRedirectUser = async () => {
  //   const response = await signInWithGoogleRedirect();
  //   console.log(response.user);
  // };

  return (
    <AuthenticationContainer>
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;

// FIRESTORE:
// - collection (Shoes)
// - document (NikeAirMax, AdidasNMD, etc.)
// - data (name, brand, imageURL, cost, etc.)
