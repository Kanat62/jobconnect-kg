import AppLayout from "@/components/AppLayout";
import JobCard from "@/components/JobCard";
import { mockJobs } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Favorites() {
  // Mock: first 2 jobs are "favorited"
  const favorites = mockJobs.slice(0, 2).map(j => ({ ...j, isFavorite: true }));

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-4 lg:py-6">
        <h1 className="text-xl font-bold text-foreground mb-4">Избранное</h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {favorites.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="font-semibold text-foreground">Сохраняйте вакансии</p>
            <p className="text-sm text-muted-foreground mt-1">чтобы вернуться к ним позже</p>
            <Button asChild className="mt-6 rounded-xl">
              <Link to="/">Найти вакансии</Link>
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
