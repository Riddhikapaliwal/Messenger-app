"use client";

import useConversation from '@/app/hooks/useConversation'
import axios from 'axios';
import {
    FieldValues,
    useForm,
    SubmitHandler
} from "react-hook-form";

const Form = () => {

    const {conversationId} = useConversation();

    const{
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            messages: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues>= (data)=>{
        setValue('message','',{shouldValidate: true});
        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    }

  return (
    <div>Form</div>
  )
}

export default Form