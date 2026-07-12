'use client'

import useConversation from "@/app/hooks/useConversation";
import {toast} from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/Modal";
import {useCallback, useState} from "react";
import {FiAlertTriangle} from "react-icons/fi"


interface ConfirmModalProps{
    isOpen?: boolean;
    onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose
}) =>{
    const router= useRouter();
    const {conversationId} = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete= useCallback(() =>{
        setIsLoading(true);

        axios.delete(`/api/conversations/${conversationId}`)
        .then(() => {
            onClose();
            router.push('/conversations');
            router.refresh();

        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false))
    },[conversationId, router, onClose]);

    return(
        <Modal
            isOpen={isOpen}
            onClose={onClose}  
        >
            <div className="sm:flex sm:items-start">
                <div 
                    className="
                        mx-auto
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-red-100
                        sm:mx-0
                        sm:h-10
                        sm:w-10
                    ">
                        <FiAlertTriangle className="text-red-600" size={24}/>
                    </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                        Delete conversation
                    </h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            This conversation will be permanently removed.
                        </p>
                    </div>
                    <div className="mt-4 flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onDelete}
                            disabled={isLoading}
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isLoading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>

        </Modal>
    );
}

export default ConfirmModal;