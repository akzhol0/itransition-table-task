import React, { useContext } from "react";
import { Lock, LockOpen, Trash2 } from "lucide-react";
import { UserInfoTypes } from "@/types/service";
import { contextData } from "@/components/context/Context";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "@/config/config";
import toast from "react-hot-toast";

type ToolbarProps = {
  toolbarAccess: boolean;
  dataChangeUser: UserInfoTypes | null;
  setDataChangeUser: (arg0: UserInfoTypes | null) => void;
  setToolbarAccess: (arg0: boolean) => void;
  handleRemove: () => void;
  setFilter: (arg0: string) => void;
  filter: string;
};

const Toolbar = ({
  toolbarAccess,
  dataChangeUser,
  setDataChangeUser,
  setToolbarAccess,
  handleRemove,
  setFilter,
  filter,
}: ToolbarProps) => {
  const { setUsers } = useContext(contextData);

  const toolbarItems = [
    {
      icon: (
        <LockOpen
          color={"blue"}
          onClick={async () => {
            if (!dataChangeUser?.blocked) {
              return;
            }
            console.log("USER UNLOCKED");
            toast.success("User unlocked");

            await updateDoc(doc(db, "users", `${dataChangeUser?.userLogin}`), {
              blocked: !dataChangeUser?.blocked,
            });
            setUsers((prev: any) =>
              prev.map((user: UserInfoTypes) =>
                user.userLogin === dataChangeUser?.userLogin
                  ? { ...user, blocked: !dataChangeUser?.blocked }
                  : user,
              ),
            );
            setDataChangeUser(null);
            setToolbarAccess(false);
            handleRemove();
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
          onClick={async () => {
            if (dataChangeUser?.blocked) {
              return;
            }
            console.log("USER LOCKED");
            toast.success("User locked");

            await updateDoc(doc(db, "users", `${dataChangeUser?.userLogin}`), {
              blocked: !dataChangeUser?.blocked,
            });
            setUsers((prev: any) =>
              prev.map((user: UserInfoTypes) =>
                user.userLogin === dataChangeUser?.userLogin
                  ? { ...user, blocked: !dataChangeUser?.blocked }
                  : user,
              ),
            );
            setDataChangeUser(null);
            setToolbarAccess(false);
            handleRemove();
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
          onClick={async () => {
            console.log("USER DELETED");
            toast.error("User deleted");

            await deleteDoc(doc(db, "users", `${dataChangeUser?.userLogin}`));
            setUsers((prev: any) =>
              prev.filter(
                (item: UserInfoTypes) =>
                  item.userLogin !== dataChangeUser?.userLogin,
              ),
            );
            setDataChangeUser(null);
            setToolbarAccess(false);
          }}
        />
      ),
      type: "red",
      title: "Delete",
    },
  ];

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2">
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
      <div className="flex">
        <input
          className="py-1 px-2 border rounded-lg"
          placeholder="Filtering by email..."
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>
    </div>
  );
};

export default Toolbar;
