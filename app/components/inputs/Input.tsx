'use client'

import clsx from 'clsx';
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form'

interface InputProps{
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const Input: React.FC<InputProps> =({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}) => {
    const hasError = Boolean(errors[id]);

    return(
        <div>
            <label
                className="
                    block,
                    text-sm,
                    font-medium,
                    leading-6,
                    text-gray-900
                "
                htmlFor= {id}
            >
                {label}
            </label>
            <div className=" mt-2 ">
                <input 
                    id={id}
                    type={type || 'text'}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id,{required})}
                    className={clsx(`
                        form-input
                        block
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        px-3
                        text-gray-900
                        shadow-sm
                        ring-1
                        ring-inset
                        placeholder:text-gray-400
                        focus:ring-2
                        focus:ring-inset
                        focus:outline-none
                        sm:text-sm
                        sm:leading-6`,
                    hasError ? 'ring-rose-300 focus:ring-rose-500' : 'ring-gray-300 focus:ring-sky-600',
                    disabled && 'opacity-50 cursor-default'
                    )}
                    />
            </div>
        </div>
    );
}

export default Input;