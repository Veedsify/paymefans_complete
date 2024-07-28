import StoryComponent from "@/components/route_component/story-component";

const StoryPage = () => {
    return (
        <div className="relative p-2 md:p-5">
            <h1 className="md:text-lg max-w-[550px] mx-auto font-semibold mb-3">
                Add to your story
            </h1>
            <p className="mb-10 max-w-[550px] mx-auto">
                stories stay live for 24 hours
            </p>
            <StoryComponent />
        </div>
    );
}

export default StoryPage;