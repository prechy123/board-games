"use client";

import AuthProvider from "./AuthProvider";
import ChakraProvider from "./ChakraProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import ThemeProvider from "./ThemeProvider";

export default function AllProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <ChakraProvider>
            {children}
          </ChakraProvider>
        </ThemeProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
