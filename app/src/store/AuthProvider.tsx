// src/AuthContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: IUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const initialState: AuthContextType = {
  user: null,
  loading: true,
  signIn: async (email, password) => {},
  signOut: async () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

interface UserData {
  id: string;
  created_at: string;
  bunny_token: string;
  user_id: string;
}

export interface IUser extends User {
  userData: UserData;
  accessToken: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and set user
    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error.message);
        setLoading(false);
        return;
      }
      if (!data?.session?.user) {
        setLoading(false);
      }
      if (data.session) {
        await fetchUserData(data.session.user, data.session.access_token);
      }
      setLoading(false);
    })();

    // Listen for changes to auth state
    const { data } = supabase.auth.onAuthStateChange(
      async (event: any, session: any) => {
        if (session?.user) {
          let validEvents = ["SIGNED_IN", "USER_UPDATED", "TOKEN_REFRESHED"];
          if (validEvents.includes(event)) {
            setUser({ ...session.user, accessToken: session.access_token });
          } else if (event === "INITIAL_SESSION") {
          } else if (event === "SIGNED_OUT") {
            setUser(null);
          } else if (event === "PASSWORD_RECOVERY") {
          }
        }
      }
    );

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const fetchUserData = async (user: User, accessToken: string) => {
    const response = await supabase
      .from("user_data")
      .select("*")
      .eq("user_id", user.id)
      .single();
    let userData: UserData = response.data;
    setUser({
      ...user,
      userData,
      accessToken,
    });
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      await fetchUserData(data.user, data.session.access_token);
    } catch (error: any) {
      console.error("Error:", error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      console.error("Error:", error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    signIn,
    signOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
