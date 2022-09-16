import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { GetStaticProps } from "next";
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

const StaticPage: NextPage = ({ users }: Props) => {
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

export default StaticPage;

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get<GetUsersResponse>(
    "https://reqres.in/api/users"
  );

  return {
    props: {
      users: response.data.data,
    },
  };
};
