import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type StoryType = {
    id: number;
    media_type: string;
    media_url: string;
    caption?: string;
}

type StoryState = {
    story: StoryType[];
    addToStory: (story: StoryType) => void;
    removeFromStory: (id: number) => void;
    addcCaptionToStory: (id: number, caption: string) => void;
    clearStory: () => void;
};

export const useStoryStore = create<StoryState>()(
    persist(
        (set) => ({
            story: [],
            addToStory: (story) => set((state) => ({ story: [...state.story, story] })),
            removeFromStory: (id) =>
                set((state) => ({ story: state.story.filter((storyId) => storyId.id !== id) })),
            addcCaptionToStory: (id, caption) => {
                return set((state) => {
                    const index = state.story.findIndex((story) => story.id === id);
                    state.story[index].caption = caption;
                    return { story: state.story };
                });
            },
            clearStory: () => set({ story: [] }),
        }),
        {
            name: 'story-storage',
            storage: createJSONStorage(() => localStorage),
        }
    ));