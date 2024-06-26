import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

interface UserContextProviderProps {
    children: React.ReactNode;
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
            const getUser = async () => {
                try {
                    const res = await axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/auth/verify`
                    );
                    if (res.data) {
                        setUser(res.data);
                        setLoading(false);
                    }
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            };
            getUser();
        
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;

export const useUser = () => useContext(UserContext);
