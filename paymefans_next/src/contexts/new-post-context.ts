import { create } from "zustand"
import { persist } from "zustand/middleware"

export type NewPostState = {
    postText: string
    visibility: "public" | "subscribers" | "private"
    postMedia: File[]
    setVisibility: (visibility: "public" | "subscribers" | "private") => void
    setPostText: (text: string) => void
    setPostMedia: (media: File[]) => void
}

export const useNewPostStore = create<NewPostState>()(persist(
    (set) => ({
        postText: "",
        visibility: "public",
        postMedia: [],
        setPostText: (text: string) => set({ postText: text }),
        setVisibility: (visibility: "public" | "subscribers" | "private") => set({ visibility }),
        setPostMedia: (media: File[]) => set({ postMedia: media }),
    }),
    {
        name: "new-post-storage",
    }
))