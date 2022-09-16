import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { GetServerSideProps } from "next";
import axios from "axios";

type GetUsersResponse = {
  data: User[];
};

type User = {
  id: number;
  first_name: string;
};

type Props = {
  users?: User[];
};

const ServerPage: NextPage = ({ users }: Props) => {
  return (
    <>
      <h1>
        <Link href={"/"}>Static Side</Link>
      </h1>
      {users?.map((user) => (
        <p key={user.id}>{user.first_name}</p>
      ))}
    </>
  );
};

export default ServerPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get<GetUsersResponse>(
    "https://reqres.in/api/users"
  );

  return {
    props: {
      users: response.data.data,
    },
  };
};
