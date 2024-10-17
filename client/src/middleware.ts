import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("id")?.value || "";
  const redirectResponse = NextResponse.redirect('https://board-games-two.vercel.app/');
  redirectResponse.headers.set('x-middleware-cache', 'no-cache');
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }
}

export const config = {
  matcher: ["/profile", "/tic-tac-toe"]
}