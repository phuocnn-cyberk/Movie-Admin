import { ReleasedHistory } from "./released-history";
import { SwapHistory } from "./swap-history";
import { Wallet } from "./wallet";

export const DashboardPage = () => {
  return (
    <div className="space-y-7">
      <div className="grid grid-cols-1 gap-y-6 xl:grid-cols-3 xl:gap-x-7 xl:gap-y-0">
        <Wallet />
      </div>
      <div className="grid grid-cols-1 gap-y-6 xl:grid-cols-2 xl:gap-x-7 xl:gap-y-0">
        <ReleasedHistory />
      </div>
      <div className="grid grid-cols-1">
        <SwapHistory />
      </div>
    </div>
  );
};
