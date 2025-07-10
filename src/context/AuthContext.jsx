import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [themeController, setThemeController] = useState("");
  // Register User
  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   Login User
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Google Login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update Profile
  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // 🔄 Refetch latest user data from DB
  const refetchUser = async (email) => {
    if (!email) return;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/${email}`
      );
      setUser((prev) => ({ ...prev, ...data })); // merge auth user and DB data
    } catch (err) {
      console.error("Failed to refetch user info:", err);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("user in the auth state change", currentUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const userInfo = {
    loading,
    signUp,
    login,
    logOut,
    googleLogin,
    updateUser,
    setUser,
    user,
    themeController,
    setThemeController,
    refetchUser
  };
  console.log(user);

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
