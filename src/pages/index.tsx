import type { GetServerSideProps, NextPage } from "next";
import { getCookie, verifyToken } from "../../utils/auth";
import { logout } from "../../utils/auth";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookie(context);
  const payload = verifyToken(token);
  if (!payload) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: payload,
    },
  };
};

type HomeProps = {
  user: {
    _id: string;
    email: string;
    type: string;
  };
};

const Home: NextPage<HomeProps> = ({ user }) => {
  return (
    <div>
      <h1>Home</h1>
      <p>{user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
export default Home;
