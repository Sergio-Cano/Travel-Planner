import { useTravels } from "../hooks/useTravels";
import { Link } from "react-router-dom"

export const TravelList = () => {
    const { getTravelList } = useTravels();
    const { data: travels, isLoading } = getTravelList();

    isLoading && <h1>Loading...</h1>

    return (
        <ul>
            {travels?.map((travel, index) => {
                return (
                    <li key={index}>
                        <Link to={`/travels/${travel.id}`}>{travel.title}</Link> 
                    </li>
                )
            })}
        </ul>
    )
}