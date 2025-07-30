"use client";

import React, { useContext, useRef, useState } from "react";
import { contextData } from "@/components/context/Context";
import Toolbar from "@/components/main-page/Toolbar";
import { UserInfoTypes } from "@/types/service";
import { Toaster } from "react-hot-toast";

const Table = () => {
  const { users } = useContext(contextData);
  const [toolbarAccess, setToolbarAccess] = useState<boolean>(false);
  const [dataChangeUser, setDataChangeUser] = useState<UserInfoTypes | null>(
    null,
  );
  const [filter, setFilter] = useState<string>("");

  const filteredUsers = users?.filter((user) =>
    user.userLogin.toLowerCase().includes(filter.toLowerCase()),
  );

  const containerRef = useRef<HTMLTableSectionElement>(null);

  const handleRemove = () => {
    const checkboxes = containerRef.current?.querySelectorAll(
      'input[type="checkbox"]:checked',
    );
    checkboxes?.forEach((cb) => {
      (cb as HTMLInputElement).checked = false;
    });
  };

  return (
    <div className="w-full flex flex-col p-2">
      {users?.length === 0 ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <div className="flex gap-2 p-3 bg-gray-100 rounded-lg">
            <Toolbar
              dataChangeUser={dataChangeUser}
              setDataChangeUser={setDataChangeUser}
              toolbarAccess={toolbarAccess}
              setToolbarAccess={setToolbarAccess}
              handleRemove={handleRemove}
              setFilter={setFilter}
              filter={filter}
            />
          </div>
          <Toaster position="top-right" />
          <div className="p-4">
            <div className="overflow-x-auto rounded border border-gray-300">
              <table className="w-full text-sm">
                <thead className="border-b hidden lg:table-header-group">
                  <tr>
                    <th className="p-3 text-left"></th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Last seen</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody ref={containerRef} className="divide-y divide-gray-200">
                  {filteredUsers?.length === 0 ? (
                    <tr className="flex justify-center">
                      <td className="text-lg py-10">Empty...</td>
                    </tr>
                  ) : (
                    filteredUsers?.map((user, index) => (
                      <tr
                        key={index}
                        className={`block lg:table-row ${
                          user.blocked ? "text-gray-400" : ""
                        }`}
                      >
                        <td className="p-3 lg:table-cell">
                          <input
                            onChange={() => {
                              setToolbarAccess(!toolbarAccess);
                              setDataChangeUser(
                                dataChangeUser === null ? user : null,
                              );
                            }}
                            type="checkbox"
                            disabled={
                              dataChangeUser !== null && dataChangeUser !== user
                            }
                          />
                        </td>
                        <td className="flex items-center justify-between p-3 lg:table-cell">
                          <span className="block lg:hidden font-semibold">
                            Name
                          </span>
                          {user.userName}
                        </td>
                        <td className="flex items-center justify-between p-3 lg:table-cell">
                          <span className="block lg:hidden font-semibold">
                            Email
                          </span>
                          {user.userLogin}
                        </td>
                        <td className="flex items-center justify-between p-3 lg:table-cell">
                          <span className="block lg:hidden font-semibold">
                            Last seen
                          </span>
                          {user.lastActiveDate}
                        </td>
                        <td className="flex items-center justify-between p-3 lg:table-cell">
                          <span className="block lg:hidden font-semibold">
                            Status
                          </span>
                          {user.blocked ? "🔴" : "🟢"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
