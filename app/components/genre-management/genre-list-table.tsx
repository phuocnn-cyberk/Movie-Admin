"use client";

import { Pencil, Trash2 } from "lucide-react";

export type Genre = {
  genreID: number;
  name: string;
};

type Props = {
  data: Genre[];
  onEdit?: (genre: Genre) => void;
  onDelete?: (genreID: number) => void;
};

export default function GenreListTable({ data, onEdit, onDelete }: Props) {
  if (data.length === 0) return <p>No genres available.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left text-sm font-medium border-b">ID</th>
            <th className="p-2 text-left text-sm font-medium border-b">Name</th>
            <th className="p-2 text-center text-sm font-medium border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((g) => (
            <tr key={g.genreID} className="hover:bg-gray-50">
              <td className="p-2 border-b">{g.genreID}</td>
              <td className="p-2 border-b font-semibold">{g.name}</td>
              <td className="p-2 border-b">
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => onEdit?.(g)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => onDelete?.(g.genreID)}
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
