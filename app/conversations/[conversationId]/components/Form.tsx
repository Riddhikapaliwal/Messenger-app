"use client";

import useConversation from '@/app/hooks/useConversation'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
    FieldValues,
    useForm,
    SubmitHandler
} from "react-hook-form";
import { HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { GoPaperAirplane } from "react-icons/go";
import {CldUploadButton, type CloudinaryUploadWidgetResults} from "next-cloudinary"



const Form = () => {

    const {conversationId} = useConversation();
    const router = useRouter();

    const{
        register,
        handleSubmit,
        setValue,
        formState: {
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues>= async(data)=>{
        setValue('message','',{shouldValidate: true});
        await axios.post('/api/messages', {
            ...data,
            conversationId
        })
        router.refresh();
    }

    const handleUpload= async(results: CloudinaryUploadWidgetResults) => {
        const secureUrl = typeof results.info === 'string' ? undefined : results.info?.secure_url;

        if (!secureUrl) {
            return;
        }

        await axios.post('/api/messages', {
            image: secureUrl,
            conversationId
        })
        router.refresh();
    }

  return (
    <div className="
        py-4
        px-4
        bg-white
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full

    ">
        <CldUploadButton
            options={{maxFiles: 1}}
            onSuccess={handleUpload}
            uploadPreset="tx35xwbv">
        <HiPhoto size={30} className="text-sky-500"/>
        </CldUploadButton>

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2 lg:gap-4 w-full"
        >
            <MessageInput 
                id="message"
                register={register}
                required
                placeholder="Write a message"
                />
                <button
                    type="submit"
                    className="
                        rounded-full
                        p-2
                        bg-sky-500
                        cursor-pointer
                        hover:bg-sky-600
                        transition">
                    <GoPaperAirplane 
                        size={18}
                        className="text-white"/>
                </button>
        </form>
    </div>
  )
}

export default Form;