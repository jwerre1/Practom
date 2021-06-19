import { supabase } from "@/lib/supabase";

const genReturnObj = (error, msg) => {
  let result = {
    error,
  };
  result[error ? "errorMsg" : "msg"] = msg;
  return result;
};

const getSession = async () => {
  const result = await supabase.auth.session();
  return result;
};

const handleSignup = async (email, password) => {
  if (!email || !password) {
    return genReturnObj(true, "Please provide both your email and password.");
  }
  try {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error, error.message);
      genReturnObj(true, error.message);
    }
    return genReturnObj(
      false,
      "Signup successful, confirmation email will be sent soon."
    );
  } catch (err) {
    console.error("signup error", err);
    genReturnObj(true, "Fatal error signing up");
  }
};

const handleLogin = async (email, password) => {
  try {
    const { error, user } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      console.error(error.message);
      return genReturnObj(true, "Error logging in: " + error.message);
    }
    // No error throw, but no user detected so send magic link
    if (!error && !user) {
      return genReturnObj(false, "Check your email for the login link!");
    }
    return genReturnObj(false, "Logged in");
  } catch (error) {
    console.error("Error thrown:", error.message);
    return genReturnObj(true, error.error_description || error);
  }
};

const handlePasswordReset = async (email) => {
  if (!email) {
    return genReturnObj(true, "Email address is required.");
  }
  const { error } = await supabase.auth.api.resetPasswordForEmail(email);
  if (error) {
    return genReturnObj(true, error.message);
  }
  return genReturnObj(false, "Password recovery email has been sent.");
};

const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return genReturnObj(true, error.message);
    }
    return genReturnObj(false, "Signed out");
  } catch (err) {
    return genReturnObj(true, err);
  }
};

export {
  getSession,
  handleSignup,
  handleLogin,
  handlePasswordReset,
  handleSignOut,
};
