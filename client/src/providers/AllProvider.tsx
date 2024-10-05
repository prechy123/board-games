import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";

export default function AllProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
}
