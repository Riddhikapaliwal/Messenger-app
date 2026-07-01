import {useSession} from "next-auth/react";
import {useMemo} from "react";
import {User} from "@/app/generated/prisma";
import { FullConversationType } from "../types";

const useOtherUser= (conversation:FullConversationType | {
    users:User[]
}) =>{
    const session=useSession();
    const otherUser= useMemo(() =>{
        const currentUserEmail= session.data?.user?.email;

        return conversation.users.find((user) => user.email !== currentUserEmail) ?? conversation.users[0];
    },[session?.data?.user?.email, conversation.users]);

    return otherUser;
};

export default useOtherUser;