export const modelSignUp = async (data: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/models/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${document.cookie.split("token=")[1].split(";")[0]}`
            },
            body: JSON.stringify(data)
        });
        return response.ok ? await response.json() : null;
    } catch (err: any) {
        console.log(err.message || err.data.message);
    }
}
