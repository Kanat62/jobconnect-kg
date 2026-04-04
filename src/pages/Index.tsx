import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import CategoryChips from "@/components/CategoryChips";
import FeaturedCompanies from "@/components/FeaturedCompanies";
import JobCard from "@/components/JobCard";
import { mockJobs } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const filteredJobs =
    activeCategory === "all"
      ? mockJobs
      : mockJobs.filter((j) => j.category === activeCategory);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AppLayout>
      <div className="w-full px-4 lg:px-6 py-4 lg:py-6 space-y-6 overflow-hidden">
        {/* Categories */}
        <CategoryChips 
          active={activeCategory} 
          onChange={(cat) => {
            setActiveCategory(cat);
            setCurrentPage(1);
          }} 
        />

        {/* Featured Companies */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">
            Работа в известных компаниях
          </h2>
          <FeaturedCompanies />
        </section>

        {/* Job Feed */}
        <section className="w-full overflow-hidden">
          <h2 className="text-base font-semibold text-foreground mb-3">
            Рекомендуемые
          </h2>
          {filteredJobs.length > 0 ? (
            <>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {currentJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-border"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-xl text-base font-medium transition-colors ${
                          currentPage === page
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-border"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-semibold text-foreground">Ничего не найдено</p>
              <p className="text-base text-muted-foreground mt-1">
                Попробуйте выбрать другую категорию
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-4 text-base font-medium text-primary hover:underline"
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
