import showToast from "./showToast";

export default async function clipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("info", "Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
