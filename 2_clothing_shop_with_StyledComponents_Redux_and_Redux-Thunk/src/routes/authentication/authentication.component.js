import SignUpForm from "../../components/signup-form/signup-form.component";
import SignInForm from "../../components/signin-form/signin-form.component";

import { AuthenticationContainer } from "./authentication.style.js";

const Authentication = () => {
  return (
    <AuthenticationContainer>
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
