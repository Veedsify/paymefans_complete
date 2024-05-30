import { create } from "zustand"
import { persist } from "zustand/middleware"

export type NewPostState = {
    postText: string
    visibility: "Public" | "Subscribers" | "Private"
    postMedia: FileList | null
    setVisibility: (visibility: "Public" | "Subscribers" | "Private") => void
    setPostText: (text: string) => void
    setPostMedia: (media: FileList) => void
    clearAll: () => void
}

export const useNewPostStore = create<NewPostState>()(persist(
    (set) => ({
        postText: "",
        visibility: "Public",
        postMedia: null,
        clearAll: () => set({ postText: "", visibility: "Public", postMedia: null }),
        setPostText: (text: string) => set({ postText: text }),
        setVisibility: (visibility: "Public" | "Subscribers" | "Private") => set({ visibility }),
        setPostMedia: (media: FileList) => set({ postMedia: media }),
    }),
    {
        name: "new-post-storage",
    }
))