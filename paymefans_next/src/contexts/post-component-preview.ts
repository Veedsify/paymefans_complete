import {create} from "zustand";

type PostComponentType = {
    url: string | null;
    open: boolean;
    type: string | null
    close: () => void;
    fullScreenPreview: ({url, open, type}: { url: string, type: string, open: boolean }) => void
};

const usePostComponent = create<PostComponentType>((set) => ({
    url: "",
    open: false,
    type: "",
    close: () => set({open: false}),
    fullScreenPreview: ({url, type, open}) => set({url, type, open})
}));

export default usePostComponent;