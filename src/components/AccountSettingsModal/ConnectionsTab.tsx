"use client";

import { AuthorizedAccountFromAPI } from "@/db/schema";
import Box from "../Box/Box";
import { Dispatch, SetStateAction, useState } from "react";

const ConnectionsTab = (props: {
  account: AuthorizedAccountFromAPI
}) => {
  let [connections, setConnections] = useState(props.account.connections);

  let [error, setError] = useState("");

  return (
    <>
      <h1>Connections</h1>
    </>
  )
}

export default ConnectionsTab;
