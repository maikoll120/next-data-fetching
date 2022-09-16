import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios.get<GetUsersResponse>(url).then((res) => res.data);

type GetUsersResponse = {
  data: User[];
};

type User = {
  id: number;
  first_name: string;
};

const ClientPage: NextPage = () => {
  const { data, error } = useSWR("https://reqres.in/api/users", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const users = data.data;

  return (
    <>
      <h1>
        <Link href={"/"}>Client Side - SWR</Link>
      </h1>
      {users.map((user) => (
        <p key={user.id}>{user.first_name}</p>
      ))}
    </>
  );
};

export default ClientPage;
