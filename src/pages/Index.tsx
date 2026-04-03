import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import CategoryChips from "@/components/CategoryChips";
import FeaturedCompanies from "@/components/FeaturedCompanies";
import JobCard from "@/components/JobCard";
import { mockJobs } from "@/lib/mock-data";

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredJobs =
    activeCategory === "all"
      ? mockJobs
      : mockJobs.filter((j) => j.category === activeCategory);

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-4 lg:py-6 space-y-6">
        {/* Categories */}
        <CategoryChips active={activeCategory} onChange={setActiveCategory} />

        {/* Featured Companies */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">
            Работа в известных компаниях
          </h2>
          <FeaturedCompanies />
        </section>

        {/* Job Feed */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">
            Рекомендуемые
          </h2>
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-semibold text-foreground">Ничего не найдено</p>
              <p className="text-sm text-muted-foreground mt-1">
                Попробуйте выбрать другую категорию
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-4 text-sm font-medium text-primary hover:underline"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}
