"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddMovieDialog from "./add-movie-dialog";
import EditMovieDialog from "./edit-movie-dialog";
import MovieListTable from "./movie-list-table";
import { getAllMovies, deleteMovie, updateMovie } from "app/services/api";
import { DeleteMovieDialog } from "./delete-movie-dialog";

export type Movie = {
  movieID: number;
  title: string;
  description: string;
  year: string;
  poster: string;
  genres: string[];
  accessLevel: "FREE" | "PREMIUM";
  playbackId?: string; // ✅ thêm PlaybackID
};

export default function MovieManagement() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [openAddMovieDialog, setOpenAddMovieDialog] = useState(false);

  // Delete
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  // Edit
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

  // Load movies
  const loadMovies = async () => {
    try {
      const res = await getAllMovies();
      let moviesArray: any[] = [];

      if (Array.isArray(res)) {
        moviesArray = res;
      } else if (res?.data && Array.isArray(res.data)) {
        moviesArray = res.data;
      }

      const formattedMovies: Movie[] = moviesArray.map((m) => {
        let genreNames: string[] = [];

        if (Array.isArray(m.genres)) {
          if (typeof m.genres[0] === "string") {
            genreNames = m.genres;
          } else if (typeof m.genres[0] === "object") {
            genreNames = m.genres.map((g: any) => g.name ?? "");
          }
        } else if (Array.isArray(m.Genres)) {
          if (typeof m.Genres[0] === "string") {
            genreNames = m.Genres;
          } else if (typeof m.Genres[0] === "object") {
            genreNames = m.Genres.map((g: any) => g.name ?? "");
          }
        }

        return {
          movieID: m.movieID ?? m.MovieID ?? 0,
          title: m.title ?? m.Title ?? "",
          description: m.description ?? m.Description ?? "",
          year: m.year?.toString() ?? m.Year?.toString() ?? "",
          poster: m.poster ?? m.Poster ?? "",
          genres: genreNames,
          accessLevel: m.accessLevel ?? m.AccessLevel ?? "FREE",
          playbackId: m.playbackId ?? m.PlaybackId ?? "", // ✅ thêm PlaybackID
        };
      });

      setMovies(formattedMovies);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setMovies([]);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  // Delete
  const handleDeleteMovie = async () => {
    if (!movieToDelete) return;
    try {
      await deleteMovie(movieToDelete.movieID);
      alert("Movie deleted successfully!");
      setOpenDeleteDialog(false);
      setMovieToDelete(null);
      loadMovies();
    } catch (err) {
      console.error("Failed to delete movie:", err);
      alert("Error deleting movie");
    }
  };

  // Edit
  const handleEditMovie = async (updatedData: any) => {
    if (!movieToEdit) return;
    try {
      await updateMovie(movieToEdit.movieID, updatedData);
      alert("Movie updated successfully!");
      setOpenEditDialog(false);
      setMovieToEdit(null);
      loadMovies();
    } catch (err) {
      console.error("Failed to update movie:", err);
      alert("Error updating movie");
    }
  };

  return (
    <div>
      {/* Header */}
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

      {/* Table */}
      <MovieListTable
        data={movies}
        onEdit={(movie) => {
          setMovieToEdit(movie);
          setOpenEditDialog(true);
        }}
        onDelete={(id) => {
          const movie = movies.find((m) => m.movieID === id);
          if (movie) {
            setMovieToDelete(movie);
            setOpenDeleteDialog(true);
          }
        }}
      />

      {/* Delete Dialog */}
      {movieToDelete && (
        <DeleteMovieDialog.Root
          isOpen={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onDelete={handleDeleteMovie}
        >
          <DeleteMovieDialog.Header />
          <DeleteMovieDialog.Description />
          <DeleteMovieDialog.MoviePreview
            image={movieToDelete.poster}
            title={movieToDelete.title}
          />
          <DeleteMovieDialog.Actions />
        </DeleteMovieDialog.Root>
      )}

      {/* Edit Dialog */}
      {movieToEdit && (
        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <EditMovieDialog
            movie={movieToEdit}
            close={() => setOpenEditDialog(false)}
            onSubmit={handleEditMovie}
          />
        </Dialog>
      )}
    </div>
  );
}
