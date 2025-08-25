"use client";

import { Pencil, Trash2 } from "lucide-react";

type Series = {
  seriesID: number;
  title: string;
  year: number;
  poster?: string | null;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type Props = {
  data: Series[];
  onEdit?: (s: Series) => void;
  onDelete?: (id: number) => void;
};

export default function SeriesListTable({ data, onEdit, onDelete }: Props) {
  if (data.length === 0) return <p>No series available.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left text-sm font-medium border-b">ID</th>
            <th className="p-2 text-left text-sm font-medium border-b">Title</th>
            <th className="p-2 text-left text-sm font-medium border-b">Year</th>
            <th className="p-2 text-left text-sm font-medium border-b">Poster</th>
            <th className="p-2 text-center text-sm font-medium border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s) => (
            <tr key={s.seriesID} className="hover:bg-gray-50">
              <td className="p-2 border-b">{s.seriesID}</td>
              <td className="p-2 border-b font-semibold">{s.title}</td>
              <td className="p-2 border-b">{s.year}</td>
              <td className="p-2 border-b">
                {s.poster && (
                  <img
                    src={s.poster}
                    alt={s.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                )}
              </td>
              <td className="p-2 border-b">
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => onEdit?.(s)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => onDelete?.(s.seriesID)}
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
