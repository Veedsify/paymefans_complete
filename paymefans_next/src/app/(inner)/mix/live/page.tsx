import Image from "next/image";

const Live = () => {
    return (
        <div className="relative w-full h-dvh">
            <div className="absolute inset-0 p-0 m-0 bg-black left-0 bg-opacity-60 -z-10">
            </div>
            <Image src="/images/_cbea538c-470c-47a4-940b-bd00104953ca.jpeg" alt="live background"
                width={1200} height={1200} priority className="absolute object-cover w-full h-full p-0 m-0 -z-20" />
            <div className="absolute text-2xl text-white -translate-x-1/2 left-1/2 bottom-32 lg:bottom-12">
                <form action="/mix/live/stream/1">
                    <input type="text" className="block px-3 py-3 mb-4 text-sm bg-gray-300 outline-none bg-opacity-20 rounded-xl w-[320px] md:w-[450px]" placeholder="Title for your live session..." />
                    <input type="submit" value="GO LIVE" className="block p-2 mx-auto text-sm font-bold text-black bg-white rounded-lg cursor-pointer w-52 mb-5" />
                </form>
                <p className="text-center text-gray-500 select-none text-xs font-bold">We will send a notification to your followers so they can join</p>
            </div>
        </div>
    );
}

export default Live;