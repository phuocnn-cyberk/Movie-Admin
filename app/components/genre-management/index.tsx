"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddGenreDialog from "./add-genre-dialog";
import GenreListTable from "./genre-list-table";
import type { Genre } from "./genre-list-table";
import { getAllGenres, deleteGenre, updateGenre } from "app/services/api";

export default function GenreManagement() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [openAddGenreDialog, setOpenAddGenreDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadGenres = async () => {
    try {
      setLoading(true);
      const res = await getAllGenres();
      setGenres(res);
    } catch (err) {
      setGenres([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGenres();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this genre?")) return;
    try {
      await deleteGenre(id);
      loadGenres();
    } catch (err) {
      alert("Delete failed.");
    }
  };

  const handleEdit = async (genre: Genre) => {
    const newName = prompt("Enter new genre name:", genre.name);
    if (!newName || !newName.trim()) return;
    try {
      await updateGenre(genre.genreID, newName.trim());
      loadGenres();
    } catch (err) {
      alert("Update failed.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Genre List {loading ? "" : `(${genres.length})`}
        </h2>

        <Dialog open={openAddGenreDialog} onOpenChange={setOpenAddGenreDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#E50000] text-white">
              <Plus className="h-4 w-4" /> Add Genre
            </Button>
          </DialogTrigger>
          <AddGenreDialog
            close={() => {
              setOpenAddGenreDialog(false);
              loadGenres();
            }}
          />
        </Dialog>
      </div>

      <GenreListTable
        data={genres}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
