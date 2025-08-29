"use client";

import { useState, useEffect } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { createMovie, getAllGenres } from "app/services/api";

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
    poster: "",   // ✅ bây giờ là nhập link
    trailerURL: "",
    videoURL: "",
    playbackId: "",
    accessLevel: "FREE",
  });

  const [genres, setGenres] = useState<GenreOption[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenreOption[]>([]);
  const [loading, setLoading] = useState(false);

  // Load genres từ BE
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await getAllGenres();
        const arr = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
        setGenres(
          arr.map((g: any) => ({
            value: g.genreID ?? g.GenreID ?? g.id ?? 0,
            label: g.name ?? g.Name ?? g.title ?? "",
          }))
        );
      } catch (err) {
        console.error("Failed to load genres:", err);
      }
    };
    fetchGenres();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        duration: parseInt(formData.duration, 10),
        year: parseInt(formData.year, 10),
        genreIds: selectedGenres.map((g) => g.value),
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
        <Input type="number" name="duration" placeholder="Duration (minutes)" value={formData.duration} onChange={handleChange} />
        <Input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} />

        {/* ✅ Poster link input */}
        <Input
          name="poster"
          placeholder="Poster Image URL"
          value={formData.poster}
          onChange={handleChange}
        />
        {formData.poster && (
          <img
            src={formData.poster}
            alt="Poster preview"
            className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
          />
        )}

        <Input name="trailerURL" placeholder="Trailer URL" value={formData.trailerURL} onChange={handleChange} />
        <Input name="videoURL" placeholder="Video URL" value={formData.videoURL} onChange={handleChange} />
        <Input
          name="playbackId"
          placeholder="Playback ID"
          value={formData.playbackId}
          onChange={handleChange}
        />

        {/* Genres */}
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

        {/* Access level */}
        <div>
          <label className="block text-sm font-medium mb-1">Access Level</label>
          <div className="flex gap-2">
            {["FREE", "PREMIUM"].map((level) => (
              <Button
                key={level}
                type="button"
                variant={formData.accessLevel === level ? "default" : "outline"}
                onClick={() => setFormData((p) => ({ ...p, accessLevel: level }))}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <DialogFooter className="mt-4">
        <Button variant="outline" onClick={close} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Movie"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
