import {create} from 'zustand';

interface useStoreModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

export const useStoreModal = create<useStoreModalStore>((set => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
})))

// Asynchronous version of the code. Needed we dont want the logic to be a hard stop
// interface useStoreModalStore {
//     isOpen: boolean;
//     onOpen: () => void;
//     onClose: () => void;

// }

// export const useStoreModal = create<useStoreModalStore>((set => ({
//     isOpen: false,
//     onOpen: async () => set({ isOpen: true }),
//     onClose: async () => set({ isOpen: false }),
// })))