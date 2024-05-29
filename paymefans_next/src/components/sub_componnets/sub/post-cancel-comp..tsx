"use client"
import { useRouter } from "next/navigation";
import swal from "sweetalert";

export const PostCancelComp = () => {
    const router = useRouter()
    const confirmCancel = () => {
        swal({
            title: "Are you sure?",
            text: "You want to cancel this post?",
            icon: "/icons/warning.gif",
            className: "mx-auto",
            buttons: {
                cancel: false,
                confirm: {
                    text: "Yes",
                    className: "bg-primary-dark-pink text-white p-2 px-8 rounded ml-auto ",
                    value: "yes"
                }
            }
        }).then((res) => {
            if (res) {
                router.push("/mix")
            }
        })
    }
    return (
        <button onClick={confirmCancel} >Cancel</button>
    );
}