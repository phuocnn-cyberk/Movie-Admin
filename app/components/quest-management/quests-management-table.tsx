import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, UserIcon } from "lucide-react";
import React from "react";
import { ManualIcon } from "../icons/manual-icon";
import { USHDIcon } from "../icons/ushd-icon";
import { USHDsIcon } from "../icons/ushds-icon";
import { DeleteQuestDialog } from "./delete-quest-dialog";
import { CreateQuestDialog } from "./quest-management-dialog";

interface QuestsManagementTableProps {
  children: React.ReactNode;
}

const QuestsManagementTable = ({ children }: QuestsManagementTableProps) => {
  return <div className="mt-3 rounded-md bg-white md:mt-6">{children}</div>;
};

interface DataTableProps {
  currentPage: number;
  onTotalPagesChange: (totalPages: number) => void;
}

interface QuestTask {
  id: number;
  title: string | null;
  description: string | null;
  taskType: string;
  questId: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
  stepOrder: number;
  isOptional: boolean;
  targetCount: number;
  quest: {
    id: number;
    title: string;
    categories: string[];
  };
}

interface Quest {
  id: number;
  title: string;
  description: string | null;
  isActive: boolean;
  startTime: string;
  endTime: string;
  categories: string[];
  tasks: QuestTask[];
  createdAt: string;
  updatedAt: string;
}

const getTaskIcon = (task: QuestTask) => {
  if (task.title?.includes("USHDs")) {
    return <USHDsIcon />;
  }
  if (task.title?.includes("USHD") && task.taskType === "ONCHAIN") {
    return <USHDIcon />;
  }
  return <ManualIcon />;
};

const getTaskStatus = (task: QuestTask) => {
  const now = new Date();
  const startTime = new Date(task.startTime);
  const endTime = new Date(task.endTime);

  if (!task.isActive) {
    return { status: "Inactive", color: "#8A8A8A" };
  }

  if (now < startTime) {
    return { status: "Upcoming", color: "#8A8A8A" };
  }

  if (now > endTime) {
    return { status: "Ended", color: "#E2281E" };
  }

  return { status: "Live", color: "#36B17A" };
};

const getActionType = (task: QuestTask) => {
  // Combine quest name with action type
  return `${task.quest.title}`;
};

const getCampaignName = () => {
  // Default campaign name - could be enhanced with actual campaign data
  return "HELIX Testnet: Ignition";
};

const DataTable: React.FC<DataTableProps> = ({
  currentPage,
  onTotalPagesChange,
}) => {
  const [isEditQuestOpen, setIsEditQuestOpen] = React.useState(false);
  const [isDeleteQuestOpen, setIsDeleteQuestOpen] = React.useState(false);
  const [allTasks, setAllTasks] = React.useState<QuestTask[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = allTasks.slice(startIndex, endIndex);

  const truncateText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleDeleteQuest = () => {
    // TODO: Implement delete logic
    console.log("Delete quest");
    setIsDeleteQuestOpen(false);
  };

  const getTextColor = (status: string) => {
    return status === "Live" ? "text-[#193049]" : "text-[#8A8A8A]";
  };

  return (
    <>
      <Table className="w-full border-white outline-0">
        <TableHeader>
          <TableRow className="text-left text-sm font-semibold text-[#8A8A8A]">
            <TableHead className="whitespace-nowrap px-4 py-3 text-xs text-[#8A8A8A] md:text-sm">
              Task ID
            </TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-xs text-[#8A8A8A] md:text-sm">
              Task Title
            </TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-xs text-[#8A8A8A] md:text-sm">
              Created by
            </TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-xs text-[#8A8A8A] md:text-sm">
              Campaign
            </TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-xs text-[#8A8A8A] md:text-sm">
              Action Type
            </TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-xs text-[#8A8A8A] md:text-sm">
              Status
            </TableHead>
            <TableHead className="px-4 py-3 text-xs text-[#8A8A8A] md:text-sm">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={7} className="p-5 text-center text-red-500">
              {error}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7} className="p-5 text-center">
              No tasks found
            </TableCell>
          </TableRow>

          {paginatedTasks.map((task) => {
            const taskStatus = getTaskStatus(task);
            const taskIcon = getTaskIcon(task);
            const actionType = getActionType(task);
            const campaignName = getCampaignName();

            return (
              <TableRow key={task.id} className="border-b border-[#E9E9E9]">
                <TableCell className="p-5">
                  <span
                    className={`text-xs font-semibold md:text-sm ${getTextColor(
                      taskStatus.status
                    )}`}
                  >
                    #{task.id}
                  </span>
                </TableCell>
                <TableCell className="p-5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center">
                      {taskIcon}
                    </div>
                    <span
                      className={`text-xs font-semibold md:text-sm ${getTextColor(
                        taskStatus.status
                      )}`}
                      title={task.title || "Untitled Task"}
                    >
                      {truncateText(task.title || "Untitled Task")}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="flex items-center gap-2 p-5">
                  <div className="flex h-6 w-6 items-center justify-center text-xs">
                    <UserIcon />
                  </div>
                  <span
                    className={`text-xs font-semibold md:text-sm ${getTextColor(
                      taskStatus.status
                    )}`}
                  >
                    Admin
                  </span>
                </TableCell>
                <TableCell className="p-5">
                  <span
                    className={`text-xs font-semibold md:text-sm ${getTextColor(
                      taskStatus.status
                    )}`}
                  >
                    {campaignName}
                  </span>
                </TableCell>
                <TableCell className="p-5">
                  <span
                    className={`text-xs font-semibold md:text-sm ${getTextColor(
                      taskStatus.status
                    )}`}
                    title={actionType}
                  >
                    {truncateText(actionType, 40)}
                  </span>
                </TableCell>
                <TableCell className="p-5">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: taskStatus.color }}
                    />
                    <span
                      className="text-xs font-semibold md:text-sm"
                      style={{ color: taskStatus.color }}
                    >
                      {taskStatus.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="p-5">
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
            );
          })}
        </TableBody>
      </Table>

      <CreateQuestDialog.Root
        isOpen={isEditQuestOpen}
        onClose={() => setIsEditQuestOpen(false)}
        mode="edit"
      >
        <CreateQuestDialog.Header />
        <CreateQuestDialog.Description />
        <CreateQuestDialog.ImageUpload />
        <CreateQuestDialog.CampaignSelect />
        <CreateQuestDialog.ActionType />
        <CreateQuestDialog.QuestTitle />
        <CreateQuestDialog.QuestLink />
        <CreateQuestDialog.Actions />
      </CreateQuestDialog.Root>

      <DeleteQuestDialog.Root
        isOpen={isDeleteQuestOpen}
        onClose={() => setIsDeleteQuestOpen(false)}
        onDelete={handleDeleteQuest}
      >
        <DeleteQuestDialog.Header />
        <DeleteQuestDialog.Description />
        <DeleteQuestDialog.QuestPreview />
        <DeleteQuestDialog.Actions />
      </DeleteQuestDialog.Root>
    </>
  );
};

QuestsManagementTable.DataTable = DataTable;

export { QuestsManagementTable };
