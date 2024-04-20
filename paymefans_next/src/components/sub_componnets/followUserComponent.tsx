import { AuthUserProps } from "@/types/user";
import { checkUserIsFollowing } from '@/utils/data/check-user-is-following';
import React from 'react';
import FollowButton from "./sub/button";

type FollowUserProps = {
    thisuser: AuthUserProps;
    user: AuthUserProps;
}

const FollowUserComponent: React.FC<FollowUserProps> = async ({ user, thisuser }) => {
    const data = await checkUserIsFollowing(user, thisuser)
    return (
        <FollowButton status={data.status} />
    );
}

export default FollowUserComponent;