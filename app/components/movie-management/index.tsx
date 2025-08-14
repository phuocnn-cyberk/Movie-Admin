"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddMovieDialog from "./add-movie-dialog";
import MovieListTable from "./movie-list-table";
import { getAllMovies } from "app/services/api";

export type Movie = {
  movieID: number;
  title: string;
  description: string;
  year: string;
  poster: string;
  genres: string[]; // ✅ Thêm field này
  accessLevel: "FREE" | "PREMIUM";
};

export default function MovieManagement() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [openAddMovieDialog, setOpenAddMovieDialog] = useState(false);

  const loadMovies = async () => {
    try {
      const res = await getAllMovies();
      let moviesArray: any[] = [];

      if (Array.isArray(res)) {
        moviesArray = res;
      } else if (res?.data && Array.isArray(res.data)) {
        moviesArray = res.data;
      }

      const formattedMovies: Movie[] = moviesArray.map((m) => ({
        movieID: m.movieID ?? m.MovieID ?? 0,
        title: m.title ?? m.Title ?? "",
        description: m.description ?? m.Description ?? "",
        year: m.year?.toString() ?? m.Year?.toString() ?? "",
        poster: m.poster ?? m.Poster ?? "",
        genres: m.genres ?? m.Genres ?? [], // ✅ Đảm bảo có genres
        accessLevel: m.accessLevel ?? m.AccessLevel ?? "FREE",
      }));

      setMovies(formattedMovies);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setMovies([]);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Movie List ({movies.length})
        </h2>
        <Dialog open={openAddMovieDialog} onOpenChange={setOpenAddMovieDialog}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 text-white">
              <Plus className="h-4 w-4" /> Add Movie
            </Button>
          </DialogTrigger>
          <AddMovieDialog
            close={() => {
              setOpenAddMovieDialog(false);
              loadMovies();
            }}
          />
        </Dialog>
      </div>
      <MovieListTable data={movies} />
    </div>
  );
}
