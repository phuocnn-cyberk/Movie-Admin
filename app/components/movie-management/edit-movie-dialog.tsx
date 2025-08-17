"use client";

import { useState, useEffect } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Movie } from "./index";

type EditMovieDialogProps = {
  movie: Movie;
  close: () => void;
  onSubmit: (data: any) => void;
};

export default function EditMovieDialog({
  movie,
  close,
  onSubmit,
}: EditMovieDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  const [genres, setGenres] = useState("");
  const [accessLevel, setAccessLevel] = useState<"FREE" | "PREMIUM">("FREE");

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDescription(movie.description);
      setYear(movie.year);
      setPoster(movie.poster);
      setGenres(movie.genres.join(", "));
      setAccessLevel(movie.accessLevel);
    }
  }, [movie]);

  const handleSubmit = () => {
    const updatedMovie = {
      title,
      description,
      year,
      poster,
      genres: genres.split(",").map((g) => g.trim()),
      accessLevel,
    };
    onSubmit(updatedMovie);
  };

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
      <DialogHeader>
        <DialogTitle>Edit Movie</DialogTitle>
      </DialogHeader>

      <div className="space-y-3">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <Input
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />
        <Input
          placeholder="Genres (comma separated)"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
        />

        <select
          value={accessLevel}
          onChange={(e) => setAccessLevel(e.target.value as "FREE" | "PREMIUM")}
          className="w-full border rounded px-2 py-1"
        >
          <option value="FREE">Free</option>
          <option value="PREMIUM">Premium</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="bg-blue-600 text-white">
          Save Changes
        </Button>
      </div>
    </DialogContent>
  );
}
