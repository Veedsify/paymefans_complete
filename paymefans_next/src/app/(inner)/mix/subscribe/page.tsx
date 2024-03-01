
// import required modules
const Subscribe = () => {
    return (
        <div className="min-h-screen p-5 md:p-7">
            <div className="max-w-screen-xl pt-12 mx-auto mb-24 md:mt-16">
                <h1 className="mt-auto mb-5 text-2xl font-bold text-center">Subscribe</h1>
                <p className="text-sm text-center font-medium max-w-sm mx-auto">
                    Subscribe to have access to all features as a model and start earning.
                    <span className="block mt-5">
                        Cancel Subscription at any time
                    </span>
                </p>
                <div className="mt-12 flex flex-col justify-center items-center">
                    <form action="">
                        <div>
                            <button className="block w-60 md:w-96 px-3 py-3 text-sm font-bold text-white rounded-lg bg-primary-dark-pink md:max-w-96 disabled:bg-gray-600">CONTINUE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Subscribe;