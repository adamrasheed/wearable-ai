"use client";

import { FC } from "react";
import {
  Clothing,
  type ClothingRecommendation as ClothingRecommendationType,
} from "@/types";
import { cn, formatDate, getDayOfWeek, getWeatherIconUrl } from "@/lib/utils";
import { translations } from "@/lib/translations";

type RecommendationItemProps = {
  label: keyof Clothing;
  value: string;
};

const RecommendationItem: FC<RecommendationItemProps> = ({ label, value }) => {
  return (
    <div>
      <p className="font-semibold text-xs text-gray-400  dark:text-gray-200 all-small-caps leading-none mb-2">
        {label}
      </p>
      <div className="text-sm">{value}</div>
    </div>
  );
};

type ClothingRecommendationProps = ClothingRecommendationType & {
  className?: string;
};

const ClothingRecommendation: FC<ClothingRecommendationProps> = ({
  clothing,
  rationale,
  weatherIconId,
  temperature,
  date,
  className,
}) => {
  return (
    <div className={cn("space-y-2 px-4 md:px-0", className)}>
      <div className="flex justify-start items-end gap-1 leading-none mb-0">
        <div className="pb-0.5 mr-2">
          <p className="text-sm leading-none all-small-caps text-gray-500">
            {formatDate(date)}
          </p>
          <p className="text-xl">{getDayOfWeek(date)}</p>
        </div>

        <img
          className="size-8"
          src={getWeatherIconUrl(weatherIconId)}
          alt={weatherIconId}
        />
        {temperature && (
          <p className="text-lg pb-0.5">
            {translations.degrees(Number(temperature.toFixed(0)))}
          </p>
        )}
      </div>
      <p className="text-sm text-gray-500">{rationale}</p>
      <div className="flex items-center gap-2"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
