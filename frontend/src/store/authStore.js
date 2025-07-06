import {create} from 'zustand'
import axios from 'axios'

axios.defaults.withCredentials = true


export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: false,

    signup: async(username, email, password) => {
        set({ isLoading: true, message: null })
        try {
            const response = await axios.post('http://localhost:5000/api/users/signup', {
                username, email, password
            })

            set({
                user: response.data.user, 
                isLoading: false
            })
            const user = response.data.user
            

        } catch (error) {
            set({
                isLoading: false, 
                error: error.response.data.message || 'error signing up'
            })

            throw error

        }
    },

    signin: async(username, password) =>{
        set({isLoading: true, message: null})
        try{
            const response = await axios.post('http://localhost:5000/api/users/signin', {
                username, password
            })
            const {user, message} = response.data
            set({
                user,
                message,
                isLoading: false
            })

            return {user, message}

        } catch(error){
            console.log(error.response.data)
            set({
                isLoading: false, 
                error: error.response.data.message || 'error signing in'
            })

            throw error
        }
    },

    fetchUser: async() =>{
        set({fetchingUser : true, error: null})
        try {
            const response = await axios.get('http://localhost:5000/api/users/fetch-user')
            set({
                user: response.data,
                fetchingUser: false
            })
            
        } catch (error) {
            console.log(error)
            set({
                fetchingUser: false, 
                user: null,
                error: error.response.data.message || 'error getting user'
            })


            throw error
        }
    },

    logout: async() => {
        set({message: null, error: null, isLoading: true})
        try {
            const response = await axios.post('http://localhost:5000/api/users/logout')
            const message = response.data.message
            set({isLoading : false, message: message, user: null})

            return message

        } catch (error) {
            console.log(error)
            set({
                fetchingUser: false, 
                error: error.response.data.message || 'error logging out'
            })

            throw error
        }
    }

}))