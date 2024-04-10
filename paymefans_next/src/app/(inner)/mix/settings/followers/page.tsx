import UserFollowComp from "@/components/sub_componnets/userfollowcomp";

function page() {
    return (
        <div className="p-2 md:p-4 md:pt-6">
            <UserFollowComp />
            <UserFollowComp />
            <UserFollowComp />
        </div>
    );
}

export default page;