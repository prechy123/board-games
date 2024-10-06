import { ToastPosition, useToast } from "@chakra-ui/react";

const defaultToastOptions = {
  position: "bottom-left" as ToastPosition,
  duration: 9000,
  isClosable: true,
};

type ToastStatus = "success" | "error" | "info" | "warning" | "loading";

type ToastContent = {
  title: string;
  description: string;
  status: ToastStatus;
};

export const ShowToast = (content: ToastContent) => {
  const toast = useToast();
  const optionsToApply = { ...defaultToastOptions, ...content };

  return toast(optionsToApply);
};
