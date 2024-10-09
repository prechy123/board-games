"use client";

import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";
import UserAuthProvider from "./UserAuthProvider";

export default function AllProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <AuthProvider>
        <UserAuthProvider>
          <ThemeProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </ThemeProvider>
        </UserAuthProvider>
      </AuthProvider>
  );
}
