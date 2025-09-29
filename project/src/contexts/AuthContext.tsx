// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, User as FirebaseUser } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from '../firebase'; // Assuming firebase.ts is in src/

// Define the User type for our application, matching the user's codebase
export interface AppUser {
  uid: string;
  name: string;
  email: string | null;
  role: 'farmer' | 'flw' | 'veterinarian' | 'admin';
  region: string;
  createdAt?: any;
}

interface AuthContextType {
  user: AppUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  register: (name: string, email: string, password: string, role: string, region: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const register = async (name: string, email: string, password: string, role: string, region: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    // Create a user document in Firestore
    const userData: AppUser = {
      uid: firebaseUser.uid,
      name,
      email,
      role: role as AppUser['role'],
      region,
      createdAt: serverTimestamp()
    };
    await setDoc(doc(db, "users", firebaseUser.uid), userData);
    setUser(userData);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;
    // Check if user exists in Firestore, if not create a new document
    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
       const newUser: AppUser = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'Google User',
        email: firebaseUser.email,
        role: 'farmer', // default role
        region: 'Not specified', // default region
        createdAt: serverTimestamp()
      };
      await setDoc(userDocRef, newUser);
      setUser(newUser);
    } else {
        setUser(userDoc.data() as AppUser);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // Fetch the user profile from Firestore
        const userDocRef = doc(db, "users", fbUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser(userDoc.data() as AppUser);
        } else {
            // This might happen if registration creates auth user but firestore doc fails.
            // Or for Google Sign-in for the first time.
            setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    firebaseUser,
    loading,
    register,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
