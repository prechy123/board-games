const imageToDataUrlConverter = (
  file: File
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      resolve(reader.result as string | null);
    };

    reader.onerror = () => {
      reject(new Error("Failed to upload image"));
    };
  });
};

export default imageToDataUrlConverter;
