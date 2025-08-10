import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AddMovieDialog from "./add-movie-dialog";
import { MovieListTable } from "./movie-list-table";
import { Plus } from "lucide-react";

const MovieMockData = [
  {
    id: 1,
    image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQUaC5rYx10mwq3gKEGDHZBdnVCO5rh1Z979Dm_mTL9-FJDx4k1aGX7esyP350m85mkFQfvzHeKPtOu9u4_hgpXc_KzKxxbMabBBMhQlvqy9w",
    title: "The Last of Us",
    year: "2023",
    genre: "Action",
  },
];

const MovieManagement = () => {
  const [openAddMovieDialog, setOpenAddMovieDialog] = useState(false);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Movie List ({MovieMockData.length})
        </h2>
        <Dialog open={openAddMovieDialog} onOpenChange={setOpenAddMovieDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#E50000] text-white rounded-lg px-4 py-2 text-sm font-semibold">
              <Plus className="h-4 w-4" />
              Add Movie
            </Button>
          </DialogTrigger>
          <AddMovieDialog close={() => setOpenAddMovieDialog(false)} />
        </Dialog>
      </div>
      <MovieListTable>
        <div className="overflow-x-auto">
          <MovieListTable.DataTable data={MovieMockData} />
        </div>
      </MovieListTable>
    </div>
  );
};

export default MovieManagement;
