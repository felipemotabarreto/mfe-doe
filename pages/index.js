import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Header from "../components/Header";

import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

const Profile = dynamic(() => import("profile/profile"), {
  ssr: false,
});

const Teams = dynamic(() => import("teams/teams"), {
  ssr: false,
});

const Poll = dynamic(() => import("poll/poll"), {
  ssr: false,
});

const Game = dynamic(() => import("game/game"), {
  ssr: false,
});

export default function Home() {
  const [user, setUser] = useState();
  const [game, setGame] = useState();
  const [showError, setShowError] = useState(null);
  const [startingGame, setStartingGame] = useState(null);

  const handleStartGame = async () => {
    setStartingGame(true);
    const _game = await fetch("api/game", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => result.json());
    setStartingGame(false);
    if (_game) {
      setGame(_game);
    } else {
      setShowError(true);
    }
  };

  const step = useMemo(() => {
    if (!user) {
      return <Profile onLogin={setUser} />;
    }

    if (!user?.teamId) {
      return <Teams userId={user.id} onTeamChoosed={setUser} />;
    }

    if (game) {
      return <Game />;
    }

    return (
      <>
        <Poll userId={user.id} />
        <br />
        <Button variant="primary" type="button" onClick={handleStartGame}>
          {startingGame ? "Starting game..." : "Start Game"}
        </Button>
      </>
    );
  }, [user, game, startingGame]);

  return (
    <>
      <ToastContainer
        style={{
          maxWidth: "calc(100% - 46px)",
          position: "fixed",
          top: "20px",
        }}
      >
        <Toast
          bg="danger"
          show={showError}
          autohide
          delay={1000}
          onClose={() => setShowError(false)}
        >
          <Toast.Body style={{ color: "white" }}>
            The game is not ready yet.
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <Header username={user?.name} team={user?.teamId} />
      <div className="stepContainer">{step}</div>
    </>
  );
}
