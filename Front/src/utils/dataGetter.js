

export const dataGetter = async () => {
    const data = await fetch("http://localhost:3000/travels/");

    console.log(data);
}