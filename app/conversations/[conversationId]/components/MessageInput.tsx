'use client';
import { UseFormRegister, FieldValues } from "react-hook-form";

interface MessageInputProps{
    placeholder?:string;
    id:string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>

}

const MessageInput: React.FC<MessageInputProps> = ({
    placeholder,
    id,
    type,
    required,
    register,
}) => {
  return (
    <div className="relative w-full">
        <input
            id={id}
            type={type}
            autoComplete={id}
            {...register(id, {required})}
            placeholder={placeholder}
            className="
                text-black
                font-light
                py-2
                px-4
                bg-neutral-100
                w-full
                rounded-full
                focus:outline-none
                border-gray-100
"
            />
    </div>
  )
}

export default MessageInput