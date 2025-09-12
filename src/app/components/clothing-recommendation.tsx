"use client";

import { FC } from "react";
import { type ClothingRecommendation as ClothingRecommendationType } from "@/types";
import { cn, formatDate, getDayOfWeek } from "@/lib/utils";

const RecommendationItem: FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <div className="p-2 rounded-md bg-slate-900">
      <p className="text-sm text-gray-500 all-small-caps leading-none mb-2">
        {label}
      </p>
      {value}
    </div>
  );
};

const ClothingRecommendation: FC<
  ClothingRecommendationType & { className?: string }
> = ({ clothing, date, className }) => {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm text-gray-500 all-small-caps font-bold">
        {getDayOfWeek(date)}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {clothing.casual && (
          <RecommendationItem label="Casual" value={clothing.casual} />
        )}
        {clothing.work && (
          <RecommendationItem label="Work" value={clothing.work} />
        )}
        {clothing.formal && (
          <RecommendationItem label="Formal" value={clothing.formal} />
        )}
      </div>
    </div>
  );
};

export default ClothingRecommendation;
