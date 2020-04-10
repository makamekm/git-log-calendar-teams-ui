import React from "react";

export const GithubMenuItem = ({
  user,
}: {
  user: {
    avatar_url: string;
    login: string;
  };
}) => (
  <div>
    <img
      alt={user.login}
      src={user.avatar_url}
      style={{
        height: "24px",
        marginRight: "10px",
        width: "24px",
      }}
    />
    <span>{user.login}</span>
  </div>
);
