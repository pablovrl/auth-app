import { verify } from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";
import Cookies from "js-cookie";
import Router from "next/router";

export function logout() {
  Cookies.remove("token");
  Router.push("/login");
}

export function getCookie(context: GetServerSidePropsContext) {
  const token = context.req.cookies.token;
  return token?.split(" ")[1];
}

export function verifyToken(token: string | undefined) {
  try {
    const decoded = verify(token!, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    return false;
  }
}
