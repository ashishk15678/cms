import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { sign } from "node:crypto";

export const authClient = createAuthClient({
  //you can pass client configuration here
});

export const signIn = async (
  email: string,
  password: string,
): Promise<string> => {
  if (!email || !password) return "Email or password is required";
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
    return "Invalid email format";
  if (password.length < 8) return "Password must be at least 8 characters long";

  try {
    await authClient.signIn.email({ email, password });
    return "OK";
  } catch (error) {
    return `Invalid email or password: ${error}`;
  }
};

export const signUp = async (
  email: string,
  password: string,
): Promise<string> => {
  if (!email || !password) return "Email or password is required";
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
    return "Invalid email format";
  if (password.length < 8) return "Password must be at least 8 characters long";

  try {
    const name = email.split("@")[0];
    await authClient.signUp.email({ email, password, name });
    return "OK";
  } catch (error) {
    return `Invalid email or password: ${error}`;
  }
};

export const signInOrSignUp = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    return await signIn(email, password);
  } catch (error) {
    return await signUp(email, password);
  }
};
