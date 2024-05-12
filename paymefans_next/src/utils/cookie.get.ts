"use client"
export const getToken = () => {
    const tokenCookie = document.cookie.split("token=")[1];
    return tokenCookie ? tokenCookie.split(";")[0] : "";
};