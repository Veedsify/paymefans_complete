import Image from "next/image";

const Loader = () => {
    return (
        <div className="bg-black min-h-screen w-full flex items-center justify-center">
            <div className="animate-pulse">
                <Image width={200} height={200} priority src="/site/logo.svg" alt="Loader" className="animate-bounce h-auto" />
            </div>
        </div>
    );
}

export default Loader;