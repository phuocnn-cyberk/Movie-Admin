import { Plus } from "lucide-react";
import * as React from "react";
import { CreateQuestDialog } from "./quest-management-dialog";

interface Quest {
  id: number;
  title: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
  tasks: any[];
}

export const QuestManagementStatsSection: React.FC = () => {
  const [isCreateQuestOpen, setIsCreateQuestOpen] = React.useState(false);
  const [stats, setStats] = React.useState({
    totalQuests: 0,
    activeQuests: 0,
    inactiveQuests: 0,
  });

  const handleOpenCreateQuest = () => {
    setIsCreateQuestOpen(true);
  };

  const handleCloseCreateQuest = () => {
    setIsCreateQuestOpen(false);
  };

  return (
    <>
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="flex flex-col justify-center gap-2 rounded-[8px] border border-[#E9E9E9] bg-white p-2 shadow-[0px_0px_4px_0px_rgba(204,204,204,0.25)] md:p-4">
          <span className="text-xs font-normal text-[#8A8A8A] md:text-sm">
            Quests Created
          </span>
          <div className="flex items-center gap-2">
            <>
              <span className="text-base font-semibold text-[#193049] md:text-lg">
                {stats.totalQuests}
              </span>
              <span className="text-base font-semibold text-[#193049] md:text-lg">
                quests
              </span>
            </>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2 rounded-[8px] border border-[#E9E9E9] bg-white p-2 shadow-[0px_0px_4px_0px_rgba(204,204,204,0.25)] md:p-4">
          <span className="text-xs font-normal text-[#8A8A8A] md:text-sm">
            Active Quests
          </span>
          <div className="flex items-center gap-2">
            <>
              <span className="text-base font-semibold text-[#01A8AB] md:text-lg">
                {stats.activeQuests}
              </span>
              <span className="text-base font-semibold text-[#01A8AB] md:text-lg">
                tasks
              </span>
            </>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2 rounded-[8px] border border-[#E9E9E9] bg-white p-2 shadow-[0px_0px_4px_0px_rgba(204,204,204,0.25)] md:p-4">
          <span className="text-xs font-normal text-[#8A8A8A] md:text-sm">
            Inactive Quests
          </span>
          <div className="flex items-center gap-2">
            <>
              <span className="text-base font-semibold text-[#193049] md:text-lg">
                {stats.inactiveQuests}
              </span>
              <span className="text-base font-semibold text-[#193049] md:text-lg">
                tasks
              </span>
            </>
          </div>
        </div>

        <div
          className="flex cursor-pointer items-center gap-2 rounded-[8px] border border-[#E9E9E9] bg-white p-2 shadow-[0px_0px_4px_0px_rgba(204,204,204,0.25)] md:p-4"
          onClick={handleOpenCreateQuest}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#E6F7F7] p-0 transition-colors hover:bg-[#D1F2F2] md:h-9 md:w-9">
            <Plus className="h-5 w-5 text-[#01A8AB] md:h-6 md:w-6" />
          </div>
          <span className="text-xs font-semibold text-[#315780] md:text-sm">
            Create New Quest
          </span>
        </div>
      </section>

      <CreateQuestDialog.Root
        isOpen={isCreateQuestOpen}
        onClose={handleCloseCreateQuest}
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
    </>
  );
};
