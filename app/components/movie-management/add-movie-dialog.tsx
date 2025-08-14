"use client";

import { useState, useEffect } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { createMovie, getAllGenres } from "app/services/api"; // Thay tên API nếu khác

type GenreOption = {
  value: number;
  label: string;
};

type Props = {
  close?: () => void;
};

export default function AddMovieDialog({ close }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    year: "",
    poster: "",
    trailerURL: "",
    videoURL: "",
    accessLevel: "FREE",
  });

  const [genres, setGenres] = useState<GenreOption[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenreOption[]>([]);
  const [loading, setLoading] = useState(false);

  // Load genres from BE
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await getAllGenres();
        const arr = Array.isArray(res?.data) ? res.data : res;
        setGenres(
          arr.map((g: any) => ({
            value: g.genreID,
            label: g.name,
          }))
        );
      } catch (err) {
        console.error("Failed to load genres:", err);
      }
    };
    fetchGenres();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert("Please enter title");
      return;
    }
    if (selectedGenres.length === 0) {
      alert("Please select at least one genre");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        duration: parseInt(formData.duration),
        year: parseInt(formData.year),
        genres: selectedGenres.map((g) => g.value), // gửi mảng ID
      };

      await createMovie(payload);
      alert("Movie added successfully!");
      close?.();
    } catch (err) {
      console.error("Failed to add movie:", err);
      alert("Error adding movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <DialogHeader>
        <DialogTitle>Add New Movie</DialogTitle>
        <p className="text-sm text-gray-500">
          Fill all movie info and assign genres (multiple).
        </p>
      </DialogHeader>

      <div className="space-y-3">
        <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <Input name="duration" placeholder="Duration (minutes)" value={formData.duration} onChange={handleChange} />
        <Input name="year" placeholder="Year" value={formData.year} onChange={handleChange} />
        <Input name="poster" placeholder="Poster URL" value={formData.poster} onChange={handleChange} />
        <Input name="trailerURL" placeholder="Trailer URL" value={formData.trailerURL} onChange={handleChange} />
        <Input name="videoURL" placeholder="Video URL" value={formData.videoURL} onChange={handleChange} />

        <div>
          <label className="block text-sm font-medium mb-1">Select Genres</label>
          <Select
            isMulti
            options={genres}
            value={selectedGenres}
            onChange={(options) => setSelectedGenres(options as GenreOption[])}
            className="text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Access Level</label>
          <div className="flex gap-2">
            {["FREE", "PREMIUM"].map((level) => (
              <Button
                key={level}
                type="button"
                variant={formData.accessLevel === level ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, accessLevel: level })}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <DialogFooter className="mt-4">
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Movie"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
