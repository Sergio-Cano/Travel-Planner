import { useQuery } from "@tanstack/react-query"

export const Travels = () => {
    const getData = async () => {
        const response = await fetch("http://localhost:3000/travels/");
        const data = await response.json();
        return data;
    }

    const {data, isLoading} = useQuery({
        queryKey: ["travels"],
        queryFn: () => getData()
    })

    console.log(data);

    isLoading && <h1>Loading...</h1>

    return (
        <p>{JSON.stringify(data?.content)}</p>
    )
}