import { ChakraProvider as Provider } from "@chakra-ui/react";


export default function ChakraProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}
