"use client";

import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";

export default function AllProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <AuthProvider>
          <ThemeProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </ThemeProvider>
      </AuthProvider>
  );
}
