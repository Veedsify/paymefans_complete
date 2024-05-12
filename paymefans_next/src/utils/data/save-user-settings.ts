export async function saveUserSettings(userData: any) {
    return fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/profile/settings/update`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${document.cookie.split("token=")[1].split(";")[0]}`,
        },
    })
}