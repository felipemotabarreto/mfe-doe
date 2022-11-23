import S from "../styles/Header.module.css";

export default function Header({ username, team }) {
  const teams = {
    1: S.headerGreen,
    2: S.headerRed,
    3: S.headerBlue,
  };

  return (
    <header className={[S.header, teams[team] || ""].join(" ")}>
      <h1>OSF DOE</h1>
      <h2>{username?.substring(0, 14)}</h2>
    </header>
  );
}
