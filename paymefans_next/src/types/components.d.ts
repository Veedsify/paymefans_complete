// POST COMPONET PROPS
export interface PostData {
    id: number;
    post: string;
    post_id: string;
    post_audience: string;
    post_likes?: number;
    post_comments?: number;
    post_shares?: number;
    post_reposts?: number;
    time: string;
    media: UserMediaProps[];
    PostLike: {
        post_id: string;
        user_id: number;
    }[]
    user?: {
        id: number;
        name: string;
        username: string;
        user_id: string;
        profile_image: string;
        Subscribers: {
            subscriber_id: number;
        }[]
    }
    PostComment?: PostCompomentProps[];
}


export interface PostCompomentProps {
    id: number;
    comment: string;
    created_at: string;
    user: {
        id: number;
        user_id: string;
        name: string;
        username: string;
        profile_image: string;
    }
    PostCommentAttachments: {
        id: number;
        comment_id: number;
        path: string;
        type: string;
        created_at: string;
    }[]
}


export interface UserMediaProps {
    id: number;
    media_id: string;
    post_id: number;
    media_type: string;
    url: string;
    blur: string;
    poster: string;
    locked: boolean;
    accessible_to: string;
    created_at: string;
    updated_at: string;
    userId?: number;
}

interface PostComponentProps {
    user: {
        id: number;
        user_id: string;
        name: string;
        link: string;
        username: string;
        image: string;
    };
    data: PostData;
    isSubscriber: boolean;
}


interface VideoComponentProps {
    media: UserMediaProps;
    data: PostData;
    clickImageEvent: (media: UserMediaProps) => void;
    isSubscriber: boolean;
}


interface FileHolderProps {
    file: File;
    remove: (file: File) => void;
}

interface Comment {
    text: string;
    files: File[];
    author_username: string;
    time: Date
    name: string;
    profile_image: string;
}

export interface ReplyPostProps {
    options: {
        id: number;
        post_id: string;
        post_audience: string;
        author_username: string;
        reply_to?: string;
        setNewComment?: (comment: Comment) => void;
    };
}

export type UserPostProps = {
    id: number;
    content: string;
    post_id: string;
    post_audience: string;
    post_likes: number;
    post_comments: number;
    post_shares: number;
    post_reposts: number;
    UserMedia: UserMediaProps[];
    created_at: Date;
    PostLike: {
        post_id: string;
        user_id: number;
    }[]
}

type UserPostPropsOther = {
    id: number;
    content: string;
    post_id: string;
    post_audience: string;
    post_likes: number;
    post_comments: number;
    post_shares: number;
    post_reposts: number;
    UserMedia: UserMediaProps[];
    PostLike: {
        post_id: string;
        user_id: number;
    }[]
    user: {
        id: number;
        name: string;
        username: string;
        user_id: string;
        profile_image: string;
        Subscribers: {
            subscriber_id: number;
        }[]
    }
    created_at: Date;
}

// MESSAGE INPUT PROPS
export interface Attachment {
    type: string;
    extension: string;
    size: number;
    name: string;
    url: string;
}

export interface Message {
    message_id: number;
    message: string;
    sender_id: string;
    receiver_id?: string;
    attachment: Attachment[] | null;
    seen: boolean;
    conversationId?: string;
    created_at: string;
}
export interface MessageInputProps {
    sendMessage: ({ }: Message) => void;
    sendTyping: (value: string) => void;
    receiver: any;
}


// MESSAGE BUBBLE PROPS
type MessageBubbleProps = {
    message?: string | TrustedHTML;
    attachment: Attachment[] | null;
    sender: string;
    seen: boolean;
    date: string
}

// MESSAGE CONVERSATION PROPS
interface UserConversations {
    conversation: Conversation;
    conversation_id: string;
    lastMessage: LastMessage;
    receiver: {
        user_id: string;
        username: string;
        name: string;
        profile_image: string;
    }
}

// MESSAGE CONVERSATION CONTEXT PROPS
export interface MessagesConversationContextValue {
    count?: number;
    conversations: UserConversations[];
    lastMessage?: LastMessage;
    addConversations?: (conversations: Conversation) => void;
}

// POST AUDIENCE DATA PROPS
type postAudienceDataProps2 = {
    id?: number;
    name?: string;
    icon?: JSX.Element;
}

type postAudienceDataProps = {
    id: number;
    name: "Public" | "Subscribers" | "Private";
    icon: JSX.Element;
}

// COMMENT AND REPLY PROPS
interface Comment {
    text: string;
    files: File[];
    author_username: string;
    time: Date
    name: string;
    profile_image: string;
}

// FOLLOWERS DISPLAY PROPS
interface PaginateProps {
    min: number;
    max: number;
}

export interface Followers {
    user: {
        id: string;
        username: string;
        fullname: string;
        profile_image: string;
        name: string;
    },
    iAmFollowing: boolean;
}

// UPLOAD MEDIA PROPS
type UploadMediaCompProps = {
    open: boolean;
    close: () => void;
    sendNewMessage: (attachment: Attachment[]) => void;
    setMessage: (message: string) => void;
    message: string;
}

// MEDIA PANEL IMAGE CARD PROPS
type MediaType = { media: string; type: string } | null;
type MediaDataType = {
    id: number;
    url: string;
    blur: string;
    locked: boolean;
    media_type: string,
    poster?: string
};

// MEDIA PANEL IMAGE CARD OTHER PROPS
type MediaDataTypeOtherProps = {
    id: number;
    url: string;
    blur: string;
    locked: boolean;
    media_type: string,
    poster?: string
    media_id: string
    accessible_to: string
    post: {
        user: {
            Subscribers: {
                subscriber_id: number
                user_id: number
                id: number
                sub_id: string
            }[]
        }
    }
};
// UPLOAD MEDIA PREVIEW PROPS
interface MediaPreviewProps {
    files: FileList;
    setMessage: (message: string) => void;
    sendNewMessage: (attachment: Attachment[]) => void;
    close: () => void;
    message: string;
}
interface PreviewTypes {
    type: "image" | "video"
    src: string
    poster?: string
}

// USER FOLLOW COMP PROPS
interface UserFollowCompProps {
    follower: {
        user: {
            id: string;
            username: string;
            fullname: string;
            profile_image: string;
            name: string;
        },
        iAmFollowing: boolean;
    }
}

// Story Types
interface SelectMoreProps {
    openMore: boolean;
    handleOpenMore: () => void;
}

interface StoryMediaFetchProps {
    page: number
}

// Active Profile Tag Props
type ActiveProfileTagProps = {
    userid: string,
    scale?: number
    withText?: boolean
}

type handleActiveUsersProps = {
    userid: string;
}