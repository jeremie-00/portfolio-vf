import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export default async function middleware(req: NextApiRequest) {
  const token = await getToken({ req, secret });
  // Si aucun token, redirigez vers la page de connexion
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Appliquez ce middleware uniquement à certaines routes
};
