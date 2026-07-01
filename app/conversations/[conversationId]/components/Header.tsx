'use client';
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@/app/generated/prisma";
import {useMemo} from "react";
import Link from "next/link";

import {HiChevronLeft, HiEllipsisHorizontal} from "react-icons/hi2";
import Avatar from "@/app/components/Avatar";

interface HeaderProps{
  conversation: Conversation & {
    users: User[]
  }
};

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const statusText= useMemo(() => {
    if(conversation.isGroup){
      return `${conversation.users.length} members`;
    }
    return 'Active';
  }, [conversation]);

  return (
    <div className="
      bg-white
      w-full
      flex
      border-b
      sm:px-4
      py-3
      px-4
      lg:px-6
      justify-between
      items-center
      shadow-sm
    ">
      <div className="flex gap-3 items-center">
        {/* <div className="font-medium text-neutral-800">
          {conversation.name || otherUser?.name || 'Unknown user'}
        </div> */}
        <Link 
          className="
            lg:hidden
            block
            text-sky-500
            hover:text-sky-600
            transition
            cursor-pointer
          "
          href="/convesations">
            <HiChevronLeft size={32}/>
          </Link>
          <Avatar user={otherUser}/>
          <div className="flex flex-col">
            <div>
            {conversation.name || otherUser.name}
            </div>
            <div
              className="
                text-sm
                font-light
                text-neutral-500
                ">
                {statusText}
            </div>
          </div>
      </div>
      <HiEllipsisHorizontal 
        size={32}
        onClick={() => {}}  
        className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition"
      />
    </div>
  )
}

export default Header;

