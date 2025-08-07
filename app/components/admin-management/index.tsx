import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AddAdminDialog from "./add-admin.dialog";
import { AdminTable } from "./admin-table";

const AdminMockData = [
  {
    id: 1,
    name: "Jymmy Joe",
    wallet: "0xcE52a0F1550aB529aba1093855ae0D1B99Fd3036",
    type: "Admin",
    hub: "Helix-Prime",
    status: "active",
  },
  {
    id: 2,
    name: "Jymmy Joe",
    wallet: "0xcE52a0F1550aB529aba1093855ae0D1B99Fd3036",
    type: "Main Admin",
    hub: "Helix-Pub",
    status: "active",
  },
  {
    id: 3,
    name: "Jymmy Joe",
    wallet: "0xcE52a0F1550aB529aba1093855ae0D1B99Fd3036",
    type: "Admin",
    hub: "Helix-Pub",
    status: "inactive",
  },
  {
    id: 4,
    name: "Jymmy Joe",
    wallet: "0xcE52a0F1550aB529aba1093855ae0D1B99Fd3036",
    type: "Admin",
    hub: "Helix-Prime",
    status: "active",
  },
  {
    id: 5,
    name: "Jymmy Joe",
    wallet: "0xcE52a0F1550aB529aba1093855ae0D1B99Fd3036",
    type: "Admin",
    hub: "Helix-Prime",
    status: "active",
  },
  {
    id: 6,
    name: "Jymmy Joe",
    wallet: "0xcE52a0F1550aB529aba1093855ae0D1B99Fd3036",
    type: "Admin",
    hub: "Helix-Prime",
    status: "active",
  },
  {
    id: 7,
    name: "Jymmy Joe",
    wallet: "0xcE52a0F1550aB529aba1093855ae0D1B99Fd3036",
    type: "Admin",
    hub: "Helix-Prime",
    status: "active",
  },
  {
    id: 8,
    name: "Jymmy Joe",
    wallet: "0xcE52a0F1550aB529aba1093855ae0D1B99Fd3036",
    type: "Admin",
    hub: "Helix-Prime",
    status: "active",
  },
];

const AdminManagement = () => {
  const [openAddAdminDialog, setOpenAddAdminDialog] = useState(false);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Admin List ({AdminMockData.length})
        </h2>
        <Dialog open={openAddAdminDialog} onOpenChange={setOpenAddAdminDialog}>
          <DialogTrigger asChild>
            <Button className="bg-highlight rounded-[8px] !px-4 !py-2 text-sm font-semibold">
              Add Admin
            </Button>
          </DialogTrigger>
          <AddAdminDialog close={() => setOpenAddAdminDialog(false)} />
        </Dialog>
      </div>
      <AdminTable>
        <div className="overflow-x-auto">
          <AdminTable.DataTable data={AdminMockData} />
        </div>
      </AdminTable>
    </div>
  );
};

export default AdminManagement;
