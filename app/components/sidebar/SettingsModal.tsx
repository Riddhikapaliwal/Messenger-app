'use client'

import { User } from "@/app/generated/prisma";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps{
    isOpen?: boolean;
    onClose: () =>void;
    currentUser: User;
}

const SettingsModal:React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    currentUser
}) =>{
    const router= useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const{
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        }
    }= useForm<FieldValues>({
        defaultValues:{
            name: currentUser?.name,
            image: currentUser?.image
        }
    });
    register("image");

    const image = watch("image");
    console.log("WATCH IMAGE =", image);

// const handleUpload = (result: any) => {
//   setValue("image", result?.info?.secure_url, {
//     shouldValidate: true,
//   });
// };
  const handleUpload = (result: any) => {
  console.log("FULL RESULT", result);
  console.log("INFO", result.info);
  console.log("SECURE URL", result.info?.secure_url);

  setValue("image", result.info?.secure_url, {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
  });

  console.log("AFTER SETVALUE", result.info?.secure_url);
};

const onSubmit = (data: FieldValues) => {
  setIsLoading(true);
    console.log("FORM DATA", data);


  axios.post("/api/settings", data)
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error("Something went wrong!"))
    .finally(() => setIsLoading(false));
};

            return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="botder-b border-gray-900/10 pb-12">
                    <h2 className="
                        text-base
                        font-semibold
                        leading-7
                        text-gray-900
                    ">
                        Profile
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Edit your public information.
                    </p>

                    <div className="
                        mt-10
                        flex
                        flex-col
                        gap-y-8
                    ">
                        <Input
                           disabled={isLoading}
                           label="Name"
                           id="name"
                           errors={errors}
                           required
                           register={register} />
                           <div>
                            <label className="
                                block
                                text-sm
                                font-medium
                                leading-6
                                text-gray-900
                            ">
                                Photo
                            </label>
                            <div className="
                                mt-2
                                flex
                                items-center
                                gap-x-3
                            ">
                                <Image
                                    width="48"
                                    height="48"
                                    className="rounded-full"
                                    src={image || currentUser?.image || '/images/placeholder.png'}
                                    alt="Avatar"

                                />
                                <CldUploadButton
                                    options={{ maxFiles: 1 }}
                                    uploadPreset="tx35xwbv"
                                    onSuccess={(result) => {
                                    console.log("SUCCESS", result);
                                    handleUpload(result);
                                }}
                                    className="
                                        rounded-md
                                        bg-sky-500
                                        px-3
                                        py-2
                                        text-white
                                        hover:bg-sky-600
                                    "
                                    >
                                    Change
                                    </CldUploadButton>
                            </div>
                           </div>
                    </div>
                    </div>
                        <div className="
                            mt-6
                            flex
                            items-center
                            justify-end
                            gap-x-6
                        ">
                        <Button 
                            disabled={isLoading}
                            secondary
                            onClick={onClose}>
                                Cancel
                        </Button>
                        <Button 
                            disabled={isLoading}
                            type="submit">
                                Save
                        </Button>
                        </div>
                </div>
            </form>
        </Modal>
    );
}

export default SettingsModal;