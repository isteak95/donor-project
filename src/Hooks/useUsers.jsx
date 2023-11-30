// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user , loading } = useContext (AuthContext);
    console.log(user);
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !loading,
        queryFn: async() => {
            const res = await axiosSecure.get(`/user?email=${user.email}`);
            return res.data;
        }
    })

    return [users, refetch]
};

export default useUsers;