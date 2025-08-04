export function validateProductForm(data: {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}) {
  if (!data.title.trim()) return "Title is required";
  if (!data.description.trim()) return "Description is required";
  if (!data.price || isNaN(Number(data.price))) return "Price must be a number";
  if (!data.imageUrl.trim()) return "Image URL is required";
  return null;
}
