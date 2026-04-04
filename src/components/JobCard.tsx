import { Heart, Eye, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Job } from "@/lib/mock-data";

export default function JobCard({ job }: { job: Job }) {
  const [isFav, setIsFav] = useState(job.isFavorite ?? false);

  return (
    <Link
      to={`/job/${job.id}`}
      className="block w-full min-w-0 bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-all hover:border-primary/20 group animate-fade-in overflow-hidden"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-base text-muted-foreground">{job.company}</span>
            <span className="inline-flex items-center gap-1 text-xs text-primary bg-primary-light px-2 py-0.5 rounded-full ">
              <MapPin size={10} />
              {job.city}
            </span>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{job.date}</span>

      </div>

      {job.salary && (
        <p className="mt-3 text-base font-bold text-foreground">
          {job.salary}
          {job.salaryPeriod && (
            <span className="text-base font-normal text-muted-foreground ml-1">
              {job.salaryPeriod}
            </span>
          )}
        </p>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 ">

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye size={13} /> {job.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart size={13} /> {job.likes}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFav(!isFav);
          }}
          className=" rounded-lg hover:bg-muted transition-colors flex-shrink-0"
        >
          <Heart
            size={20}
            className={isFav ? "fill-red-500 text-red-500" : "text-muted-foreground"}
          />
        </button>
      </div>

    </Link>
  );
}
