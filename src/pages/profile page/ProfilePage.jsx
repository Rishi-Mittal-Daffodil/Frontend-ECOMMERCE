import React from "react";
import { useAuth } from "../../userContext/UserAuthContext";

function ProfilePage() {
  const { user } = useAuth();
  return (
    <>
      <h1>ProfilePage</h1>
      <h2>hello {user.firstName}</h2>
    </>
  );
}

export default ProfilePage;
