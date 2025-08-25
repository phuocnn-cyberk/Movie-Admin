"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import SeriesListTable from "./series-list-table";
import AddSeriesDialog from "./add-series-dialog";
import { getAllSeries, deleteSeries, updateSeries } from "app/services/api";

export interface Series {
  seriesID: number;
  title: string;
  year: number;
  poster?: string | null;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export default function SeriesManagement() {
  const [series, setSeries] = useState<Series[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [seriesToEdit, setSeriesToEdit] = useState<Series | null>(null);

  const loadSeries = async () => {
    try {
      const res = await getAllSeries();
      setSeries(Array.isArray(res) ? res : res?.data ?? []);
    } catch (err) {
      console.error("Failed to fetch series:", err);
      setSeries([]);
    }
  };

  useEffect(() => {
    loadSeries();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa series này?")) return;
    try {
      await deleteSeries(id);
      alert("Xóa thành công!");
      loadSeries();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Có lỗi xảy ra");
    }
  };

  const handleEdit = async (updatedData: any) => {
    if (!seriesToEdit) return;
    try {
      await updateSeries(seriesToEdit.seriesID, updatedData);
      alert("Cập nhật thành công!");
      setOpenEditDialog(false);
      setSeriesToEdit(null);
      loadSeries();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Có lỗi xảy ra");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Series List ({series.length})
        </h2>
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 text-white">
              <Plus className="h-4 w-4" /> Add Series
            </Button>
          </DialogTrigger>
          <AddSeriesDialog
            close={() => {
              setOpenAddDialog(false);
              loadSeries();
            }}
          />
        </Dialog>
      </div>

      {/* Table */}
      <SeriesListTable
        data={series}
        onDelete={handleDelete}
        onEdit={(s) => {
          setSeriesToEdit(s);
          setOpenEditDialog(true);
        }}
      />
    </div>
  );
}
