import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { signin, getUser } = useAuth();
    const { mutate: login } = signin();
    const { data } = getUser();
    const navigate = useNavigate();

    data?.success && navigate("/");

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit((data) => login(data))}>
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

export default Login;