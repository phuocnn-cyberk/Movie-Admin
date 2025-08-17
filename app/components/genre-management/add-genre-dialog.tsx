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
import { addGenre } from "app/services/api";

type Props = {
  close?: () => void;
};

export default function AddGenreDialog({ close }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Please enter a genre name");
      return;
    }

    try {
      setLoading(true);
      await addGenre(name.trim());
      alert("Genre added successfully!");
      close?.();
    } catch (err) {
      console.error("Failed to add genre:", err);
      alert("Error adding genre");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="bg-white rounded-lg shadow-lg">
      <DialogHeader>
        <DialogTitle>Add New Genre</DialogTitle>
      </DialogHeader>

      <div className="space-y-3">
        <Input
          placeholder="Genre name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <DialogFooter className="mt-4">
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Genre"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
