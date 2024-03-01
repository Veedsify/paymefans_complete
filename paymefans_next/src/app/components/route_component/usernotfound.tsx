import Image from "next/image";

const UserNotFound = ({ userid }: { userid: string }) => {
    return (
        <div className="flex items-center justify-center flex-col min-h-screen">
            <Image src="/site/404user.svg" alt="404" width={300} height={300} className="block mb-5 h-auto w-[300px]" />
            <h1 className="text-3xl font-bold mb-5">User Not Found</h1>
            <p>User with username <b>{userid.replace(/%40/g, "@")}</b> not found</p>
        </div>
    );
}

export default UserNotFound;