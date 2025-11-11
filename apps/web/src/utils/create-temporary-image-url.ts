export const createTemporaryImageUrl = (image: File) => {
  const imageUrl = URL.createObjectURL(image);
  return imageUrl;
};
