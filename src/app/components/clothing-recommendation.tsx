"use client";

import { FC } from "react";
import {
  Clothing,
  type ClothingRecommendation as ClothingRecommendationType,
} from "@/types";
import { cn, formatDate, getDayOfWeek } from "@/lib/utils";

type RecommendationItemProps = {
  label: keyof Clothing;
  value: string;
};

const RecommendationItem: FC<RecommendationItemProps> = ({ label, value }) => {
  return (
    <div>
      <p className="rounded-md w-fit bg-slate-100 dark:bg-slate-800 pt-1 pb-1.5 px-2 text-sm text-gray-600  dark:text-gray-300 all-small-caps leading-none mb-2">
        {label}
      </p>
      <div className="px-2">{value}</div>
    </div>
  );
};

const ClothingRecommendation: FC<
  ClothingRecommendationType & { className?: string }
> = ({ clothing, date, className }) => {
  return (
    <div className={cn("space-y-2 px-4 md:px-0", className)}>
      <p className="text-sm text-gray-500 all-small-caps font-bold">
        {`${getDayOfWeek(date)} ${formatDate(date)}`}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2">
        {clothing.casual && (
          <RecommendationItem label="casual" value={clothing.casual} />
        )}
        {clothing.work && (
          <RecommendationItem label="work" value={clothing.work} />
        )}
        {clothing.formal && (
          <RecommendationItem label="formal" value={clothing.formal} />
        )}
      </div>
    </div>
  );
};

export default ClothingRecommendation;
