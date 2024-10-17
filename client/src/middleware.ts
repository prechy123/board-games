import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("id")?.value || "";
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }
}

export const config = {
  matcher: ["/profile", "/tic-tac-toe"]
}