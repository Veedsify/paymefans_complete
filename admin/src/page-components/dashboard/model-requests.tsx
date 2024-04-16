import ModelRequestCard from "./model-request-card";

const ModelRequests = () => {
    return (
        <div className="my-8">
            <div className="grid grid-cols-3 gap-6">
                <ModelRequestCard />
                <ModelRequestCard />
            </div >
        </div >
    );
}

export default ModelRequests;