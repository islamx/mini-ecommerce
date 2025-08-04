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

    const validationError = validateProductForm(form);
    if (validationError) {
      toast.error(validationError);
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <InputField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <TextareaField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <InputField
        label="Price"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        required
      />
      <InputField
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
      />
      <InputField
        label="Image URL"
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        required
      />
      <Button type="submit">
        {type === "edit" ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
}
