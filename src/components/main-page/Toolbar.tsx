import React, { useContext } from "react";
import { Lock, LockOpen, Trash2 } from "lucide-react";
import { UserInfoTypes } from "@/types/service";
import { contextData } from "@/components/context/Context";

type ToolbarProps = {
  toolbarAccess: boolean;
  dataChangeUser: UserInfoTypes | null;
};

const Toolbar = ({ toolbarAccess, dataChangeUser }: ToolbarProps) => {
  const { currentUser } = useContext(contextData);
  const toolbarItems = [
    {
      icon: (
        <LockOpen
          color={"blue"}
          onClick={() => {
            if (!dataChangeUser?.blocked) {
              return;
            }
            console.log("USER unLOCKED");
          }}
        />
      ),
      type: "blue",
      title: "Unlock",
    },
    {
      icon: (
        <Lock
          color={"blue"}
          onClick={() => {
            if (dataChangeUser?.blocked) {
              return;
            }
            console.log("USER LOCKED");
          }}
        />
      ),
      type: "blue",
      title: "Block",
    },
    {
      icon: (
        <Trash2
          color={"red"}
          onClick={() => {
            console.log("USER DELETED");
          }}
        />
      ),
      type: "red",
      title: "Delete",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-2">
      <div className="flex gap-2">
        {toolbarItems.map((item, index) =>
          toolbarAccess ? (
            <div
              key={index}
              className={`cursor-pointer border p-2 duration-300 rounded-lg 
         ${item.type === "blue" ? "border-blue-600 hover:bg-blue-300" : "border-red-600 hover:bg-red-300"}`}
            >
              <div className="flex items-center gap-2">
                <p
                  className={`${dataChangeUser?.blocked === true && item.title === "Block" && "line-through"} 
            ${dataChangeUser?.blocked === false && item.title === "Unlock" && "line-through"}`}
                >
                  {item.title}
                </p>{" "}
                {item.icon}
              </div>
            </div>
          ) : (
            <div
              key={index}
              className={`border p-2 bg-gray-200 border-gray-200 cursor-not-allowed duration-300 rounded-lg opacity-70`}
            >
              <p className="flex items-center gap-2">
                {item.title} {item.icon}
              </p>
            </div>
          ),
        )}
      </div>
      <div className="flex gap-1">
        Account email: <p className="underline">{currentUser?.userLogin}</p>
      </div>
    </div>
  );
};

export default Toolbar;
