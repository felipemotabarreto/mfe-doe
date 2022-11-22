import dynamic from "next/dynamic";

const Profile = dynamic(() => import("profile/profile"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <h1>HOST</h1>
      <Profile />
    </>
  );
}
