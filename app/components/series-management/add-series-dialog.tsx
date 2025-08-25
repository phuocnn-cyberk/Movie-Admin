"use client";

import { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSeries } from "app/services/api";

type Props = {
  close?: () => void;
};

export default function AddSeriesDialog({ close }: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    year: "",
    poster: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      alert("Please enter title");
      return;
    }
    try {
      setLoading(true);
      await createSeries(form);
      alert("Series added!");
      close?.();
    } catch (err) {
      console.error("Failed:", err);
      alert("Error adding series");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto bg-white text-black">
      <DialogHeader>
        <DialogTitle>Add New Series</DialogTitle>
      </DialogHeader>

      <div className="space-y-3">
        <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <Input type="number" name="year" placeholder="Year" value={form.year} onChange={handleChange} />
        <Input name="poster" placeholder="Poster URL" value={form.poster} onChange={handleChange} />
      </div>

      <DialogFooter className="mt-4">
        <Button variant="outline" onClick={close} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Series"}
        </Button>
      </DialogFooter>
    </DialogContent>

  );
}
