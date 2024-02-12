import { useQuery } from "@tanstack/react-query";

export const useTravels = () => {
    const getTravelList = () => {
        const getData = async () => {
            const data = await fetch("http://localhost:3000/travels/").then((data) => data.json());
            return data.content;
        }
        
        const {data, isLoading} = useQuery({
            queryKey: ["travels"],
            queryFn: async () => await getData(),
        })

        return {data, isLoading};
    }

    const getTravel = (id) => {
        const getData = async () => {
            const data = await fetch(`http://localhost:3000/travels/${id}`).then((data) => data.json());
            return data.content;
        }

        const {data, isLoading} = useQuery({
            queryKey: ["travel"],
            queryFn: async () => await getData(),
        })

        return {data, isLoading};
    }

    return { getTravelList, getTravel };
}