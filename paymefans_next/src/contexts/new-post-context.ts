import { create } from "zustand"
import { persist } from "zustand/middleware"

export type NewPostState = {
    postText: string
    visibility: "Public" | "Subscribers" | "Private"
    postMedia: File[]
    setVisibility: (visibility: "Public" | "Subscribers" | "Private") => void
    setPostText: (text: string) => void
    setPostMedia: (media: File[]) => void
    clearAll: () => void
}

export const useNewPostStore = create<NewPostState>()(persist(
    (set) => ({
        postText: "",
        visibility: "Public",
        postMedia: [],
        clearAll: () => set({ postText: "", visibility: "Public", postMedia: [] }),
        setPostText: (text: string) => set({ postText: text }),
        setVisibility: (visibility: "Public" | "Subscribers" | "Private") => set({ visibility }),
        setPostMedia: (media: File[]) => set({ postMedia: media }),
    }),
    {
        name: "new-post-storage",
    }
))