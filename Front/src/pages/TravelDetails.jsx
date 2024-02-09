import { useParams } from "react-router";
import { useTravels } from "../hooks/useTravels";

const TravelDetails = () => {
    const { id } = useParams();
    const { getTravel } = useTravels();

    const {data: travel, isLoading} = getTravel(id);

    isLoading && <h1>Loading...</h1>

    return (
        <>
            <h1>{travel?.title}</h1>
            <h2>Usuarios:</h2>
            <ul>
                {travel?.users.map((user, index) => {
                    return <li key={index}>{user.name}</li>
                })}
            </ul>
            <h2>Servicios:</h2>
            {travel?.services.map((service) => {
                return (
                    <>
                        <h3>{`Título: ${service.title}`}</h3>
                        <h3>{`Tipo: ${service.type.toLowerCase()}`}</h3>
                        <h3>{`Precio: ${service.cost} €`}</h3>
                        <h3>Enlaces:</h3>
                        {service.links.map((link, index) => {
                            return <><a key={index}>{link}</a><br /></>
                        })}
                        <h3>{`Valoración: ${service.rating}`}</h3>
                    </>
                )
            })}
                
        </>
    )
}

export default TravelDetails;