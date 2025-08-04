"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import InputField from "@/components/forms/InputField";
import TextareaField from "@/components/forms/TextareaField";
import Button from "@/components/forms/Button";
import { Product } from "@/types/Product";
import { validateProductForm } from "./validation";


interface ProductFormProps {
  type: "add" | "edit";
  initialValues?: Product;
}

export default function ProductForm({ type, initialValues }: ProductFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill in case of edit
  useEffect(() => {
    if (type === "edit" && initialValues) {
      setForm({
        title: initialValues.title,
        description: initialValues.description,
        price: initialValues.price.toString(),
        category: initialValues.category || "",
        imageUrl: initialValues.imageUrl,
      });
    }
  }, [type, initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationError = validateProductForm(form);
    if (validationError) {
      toast.error(validationError);
      setIsSubmitting(false);
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
    };

    const endpoint =
      type === "edit"
        ? `/api/products/${initialValues?.id}`
        : `/api/products`;

    const method = type === "edit" ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(`Product ${type === "edit" ? "updated" : "added"} successfully!`);
        router.push("/admin");
      } else {
        toast.error(`Failed to ${type === "edit" ? "update" : "add"} product`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <InputField
            label="Product Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter product title..."
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <TextareaField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter product description..."
            required
          />
        </div>
        
        <InputField
          label="Price (E£)"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="0.00"
          required
        />
        
        <InputField
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="e.g., Electronics, Clothing..."
        />
        
        <div className="md:col-span-2">
          <InputField
            label="Image URL"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
        <Button 
          type="submit" 
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? (type === "edit" ? "Updating..." : "Adding...") 
            : (type === "edit" ? "Update Product" : "Add Product")
          }
        </Button>
        
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
