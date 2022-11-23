import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Header from "../components/Header";

const Profile = dynamic(() => import("profile/profile"), {
  ssr: false,
});

const Teams = dynamic(() => import("teams/teams"), {
  ssr: false,
});

const Poll = dynamic(() => import("poll/poll"), {
  ssr: false,
});

export default function Home() {
  const [user, setUser] = useState();

  const step = useMemo(() => {
    if (!user) {
      return <Profile onLogin={setUser} />;
    }

    if (!user?.teamId) {
      return <Teams userId={user.id} onTeamChoosed={setUser} />;
    }

    return <Poll userId={user.id} />;
  }, [user]);

  return (
    <>
      <Header username={user?.name} team={user?.teamId} />
      <div className="stepContainer">{step}</div>
    </>
  );
}
