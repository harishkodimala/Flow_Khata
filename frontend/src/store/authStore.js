import { create } from "zustand";

import { api } from "../api/axios";

export const useAuth = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,

    clearError: () => {set({error: null});},

    // LOGIN
    login: async (email, password) => {set({loading: true,error: null});
            try 
            {const response = await api.post("/auth/login",{email,password});
            set({user: response.data.user,isAuthenticated: true,loading: false});
            }
            catch (error) 
            {
              console.error(error);
              set({error:error.response?.data?.message|| "Login failed",user: null,isAuthenticated: false,loading: false});
            } 
            finally {set({loading: false});}
        },
    // LOGOUT
    logout: async () => {set({loading: true,error: null});
        try {await api.post("/auth/logout");
            set({user: null,isAuthenticated: false,loading: false});
            } 
            catch (error) {console.error(error);
                set({error:error.response?.data?.message|| "Logout failed",loading: false,user: null,isAuthenticated: false});

            } 
            finally {set({loading: false});

        }

    },
    // REGISTER
    register: async (name,email,password,phone) => {set({loading: true,error: null});
        try {await api.post("/auth/register", {name,email,password,phone});} 
        catch (error) {console.error(error);
        set({error:error.response?.data?.message|| "Registration failed"});} 
        finally {set({loading: false});}

    },

    clearError: () => {set({error: null});},
    //check authentication status on app load
     checkAuth: async () => {set({loading: true,error: null});
        try {const response = await api.get("/auth/me");
            set({user: response.data.user,isAuthenticated: true,loading: false});
            }
        catch (error) {console.error(error);
            set({user: null,isAuthenticated: false,error:error.response?.data?.message|| "Not authenticated",loading: false});
        }   
        finally {set({loading: false});}
    },
    //handle page refresh and fetch current user data
    checkAuth: async () => {set({loading: true,error: null});
        try {const response = await api.get("/auth/me");
            set({user: response.data.user,isAuthenticated: true,loading: false});
            }
        catch (error) {console.error(error);
            set({user: null,isAuthenticated: false,error:error.response?.data?.message|| "Not authenticated",loading: false});
        }   
        finally {set({loading: false});}    
    },



    // FETCH CURRENT USER
    fetchUser: async () => {set({loading: true,error: null});
        try {const response = await api.get("/dashboard/me");
            set({user: response.data.user,isAuthenticated: true});}
        catch (error)
        {
            console.error(error);
            set({user: null,isAuthenticated: false,error:error.response?.data?.message|| "Failed to fetch user data"});

        } finally {set({loading: false});}

    }

}));


