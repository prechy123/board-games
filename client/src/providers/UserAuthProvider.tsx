import useMyAuth from "@/hooks/useMyAuth";

export default function UserAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useMyAuth();
  return <>{children}</>;
}
