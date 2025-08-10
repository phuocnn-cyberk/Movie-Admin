import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteMovieDialog } from "./delete-movie-dialog";

const MovieListTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-[#E9E9E9] bg-white">
      {children}
    </div>
  );
};

interface TableProps {
  data: {
    id: number;
    image: string;
    title: string;
    year: string;
    genre: string;
  }[];
}

const DataTable: React.FC<TableProps> = ({ data }) => {
  const [isEditQuestOpen, setIsEditQuestOpen] = useState(false);
  const [isDeleteQuestOpen, setIsDeleteQuestOpen] = useState(false);

  const handleDeleteMovie = () => {
    console.log("delete movie");
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white">
      <Table className="border-collapse divide-y divide-[#E9E9E9] rounded-lg">
        <TableHeader>
          <TableRow className="text-left text-sm font-medium text-[#8A8A8A]">
            <TableHead className="px-4 py-3 first:rounded-tl-lg">
              Image
            </TableHead>
            <TableHead className="px-4 py-3">Title</TableHead>
            <TableHead className="px-4 py-3">Year</TableHead>
            <TableHead className="px-4 py-3">Genre</TableHead>
            <TableHead className="px-4 py-3">Action</TableHead>
            <TableHead className="w-12 rounded-tr-lg px-4 py-3" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id} className="border-b last:border-b-0">
              <TableCell className="px-4 py-3 text-sm font-semibold">
                <img
                  src={user.image}
                  alt={user.title}
                  className="h-10 w-10 rounded-lg"
                />
              </TableCell>
              <TableCell className="px-4 py-3 text-sm font-semibold">
                {user.title}
              </TableCell>
              <TableCell className="px-4 py-3 text-sm font-semibold">
                {user.year}
              </TableCell>
              <TableCell className="px-4 py-3 text-sm font-semibold">
                {user.genre}
              </TableCell>
              <TableCell className="px-4 py-3 text-sm font-semibold">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsEditQuestOpen(true)}
                    className="flex cursor-pointer items-center text-[#01A8AB]"
                  >
                    <Edit className="h-6 w-6 md:h-7 md:w-7" />
                  </button>
                  <div className="h-7 w-px bg-[#E7E7E7]" />
                  <button
                    onClick={() => setIsDeleteQuestOpen(true)}
                    className="flex cursor-pointer items-center text-[#01A8AB]"
                  >
                    <Trash2 className="h-6 w-6 md:h-7 md:w-7" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteMovieDialog.Root
        isOpen={isDeleteQuestOpen}
        onClose={() => setIsDeleteQuestOpen(false)}
        onDelete={handleDeleteMovie}
      >
        <DeleteMovieDialog.Header />
        <DeleteMovieDialog.Description />
        <DeleteMovieDialog.MoviePreview
          image={data[0].image}
          title={data[0].title}
        />
        <DeleteMovieDialog.Actions />
      </DeleteMovieDialog.Root>
    </div>
  );
};

MovieListTable.DataTable = DataTable;

export { MovieListTable };
