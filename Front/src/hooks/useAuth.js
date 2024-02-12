import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useAuth = () => {
    const queryClient = useQueryClient();

    const getUser = () => {
        const getData = async () => {
            const data = await fetch("http://localhost:3000/auth/user", {
                credentials: "include"
            }).then((res) => res.json())
            
            return data;
        } 

        const {data, isLoading} = useQuery({
            queryKey: ["user"],
            queryFn: async () => await getData()
        })

        return {data, isLoading}
    }

    const signup = () => {
        const register = async (body) => {
            await fetch("http://localhost:3000/auth/signup", {
                method: "POST",
                credentials: "include",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            }).then((res) => res.json());
        }

        const {mutate, data} = useMutation({
            mutationFn: async (payload) => await register(payload),
            onSuccess: (response) => {
                if(response.success){
                    queryClient.invalidateQueries({queryKey: ["user"]})
                }
            }
        });

        return {mutate, data}
    }

    const signin = () => {
        const login = async (body) => {
            await fetch("http://localhost:3000/auth/signin", {
                method: "POST",
                credentials: "include",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            }).then((res) => res.json());
        }

        const {mutate, data} = useMutation({
            mutationFn: async (payload) => await login(payload),
            onSuccess: (response) => {
                if(response.success){
                    queryClient.invalidateQueries({queryKey: ["user"]})
                }
            }
        });

        return {mutate, data}
    }

    const signout = () => {
        const logout = async () => {
            await fetch("http://localhost:3000/auth/signout", {
                method: "POST"
            }).then((res) => res.json());
        }

        const {mutate, data} = useMutation({
            mutationFn: async () => await logout()
        });

        return {mutate, data}
    }

    return {getUser, signup, signin, signout}
}