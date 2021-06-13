import { supabase } from "@/lib/supabase";

const genReturnObj = (error, msg) => {
  let result = {
    error,
  };
  result[error ? "errorMsg" : "msg"] = msg;
  return result;
};

const handleSignup = async (email, password) => {
  if (!email || !password) {
    return genReturnObj(true, "Please provide both your email and password.");
  }
  try {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.log(error, error.message);
      genReturnObj(true, error.message);
    }
    return genReturnObj(
      false,
      "Signup successful, confirmation email will be sent soon."
    );
  } catch (err) {
    console.log("signup error", err);
    genReturnObj(true, "Fatal error signing up");
  }
};

export { handleSignup };
