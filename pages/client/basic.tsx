import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import axios from "axios";

type GetUsersResponse = {
  data: User[];
};

type User = {
  id: number;
  first_name: string;
};

const ClientPage: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<GetUsersResponse>(
        "https://reqres.in/api/users"
      );
      setUsers(response.data.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>
        <Link href={"/"}>Client Side - useEffect</Link>
      </h1>
      {users.map((user) => (
        <p key={user.id}>{user.first_name}</p>
      ))}
    </>
  );
};

export default ClientPage;
