"use client";

import { Pencil, Trash2 } from "lucide-react";

type Movie = {
  movieID: number;
  title: string;
  description: string;
  year: string;
  poster: string;
  genres: string[];
  accessLevel: "FREE" | "PREMIUM";
};

type Props = {
  data: Movie[];
  onEdit?: (movie: Movie) => void;
  onDelete?: (movieID: number) => void;
};

export default function MovieListTable({ data, onEdit, onDelete }: Props) {
  if (data.length === 0) return <p>No movies available.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left text-sm font-medium border-b">Image</th>
            <th className="p-2 text-left text-sm font-medium border-b">Title</th>
            <th className="p-2 text-left text-sm font-medium border-b">Year</th>
            <th className="p-2 text-left text-sm font-medium border-b">Genre</th>
            <th className="p-2 text-center text-sm font-medium border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m.movieID} className="hover:bg-gray-50">
              <td className="p-2 border-b">
                {m.poster && (
                  <img
                    src={m.poster}
                    alt={m.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="p-2 border-b font-semibold">{m.title}</td>
              <td className="p-2 border-b">{m.year}</td>
              <td className="p-2 border-b">{m.genres.join(", ")}</td>
              <td className="p-2 border-b">
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => onEdit?.(m)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => onDelete?.(m.movieID)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
