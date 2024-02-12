import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";


const Register = () => {
    const { signup } = useAuth();
    const { mutate: register } = signup();
    const { getUser } = useAuth();
    const { data } = getUser();
    const navigate = useNavigate();

    data?.success && navigate("/");

    return (
        <>
            <h1>Register</h1>

            <form onSubmit={handleSubmit((data) => (data))}>
                <label htmlFor="email">Correo:</label>
                <input type="email" {...register("email")} />
                <br /><br />
                <label htmlFor="password">Contraseña:</label>
                <input type="password" {...register("password")} />
                <input type="submit" />
            </form>
            <br />
            <Link to={"/register"}>¿Aún no tienes cuenta? Regístrate</Link>
        </>
    )
}

export default Register;