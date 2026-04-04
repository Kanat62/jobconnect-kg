import React, { createContext, useContext, useState, useMemo, useCallback } from "react";

export interface FilterState {
  cities: string[];
  profession: string;
  salaryFrom: string;
  salaryTo: string;
  schedule: string[];
  remote: boolean;
  experience: string;
  paymentPeriod: string[];
}

const initialState: FilterState = {
  cities: [],
  profession: "",
  salaryFrom: "",
  salaryTo: "",
  schedule: [],
  remote: false,
  experience: "",
  paymentPeriod: [],
};

interface FilterContextType {
  appliedFilters: FilterState;
  draftFilters: FilterState;
  setDraftCities: (cities: string[]) => void;
  setDraftProfession: (profession: string) => void;
  setDraftSalaryFrom: (val: string) => void;
  setDraftSalaryTo: (val: string) => void;
  setDraftSchedule: (val: string[]) => void;
  setDraftRemote: (val: boolean) => void;
  setDraftExperience: (val: string) => void;
  setDraftPaymentPeriod: (val: string[]) => void;
  applyFilters: () => void;
  resetAll: () => void;
  cancelDraft: () => void;
  activeFilterGroupsCount: number;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const countActiveGroups = (f: FilterState) => {
  let count = 0;
  if (f.cities.length > 0) count++;
  if (f.profession) count++;
  if (f.salaryFrom || f.salaryTo) count++;
  if (f.schedule.length > 0) count++;
  if (f.remote) count++;
  if (f.experience) count++;
  if (f.paymentPeriod.length > 0) count++;
  return count;
};

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(initialState);
  const [draftFilters, setDraftFilters] = useState<FilterState>(initialState);

  const setDraftCities = useCallback((cities: string[]) => setDraftFilters(prev => ({ ...prev, cities })), []);
  const setDraftProfession = useCallback((profession: string) => setDraftFilters(prev => ({ ...prev, profession })), []);
  const setDraftSalaryFrom = useCallback((salaryFrom: string) => setDraftFilters(prev => ({ ...prev, salaryFrom })), []);
  const setDraftSalaryTo = useCallback((salaryTo: string) => setDraftFilters(prev => ({ ...prev, salaryTo })), []);
  const setDraftSchedule = useCallback((schedule: string[]) => setDraftFilters(prev => ({ ...prev, schedule })), []);
  const setDraftRemote = useCallback((remote: boolean) => setDraftFilters(prev => ({ ...prev, remote })), []);
  const setDraftExperience = useCallback((experience: string) => setDraftFilters(prev => ({ ...prev, experience })), []);
  const setDraftPaymentPeriod = useCallback((paymentPeriod: string[]) => setDraftFilters(prev => ({ ...prev, paymentPeriod })), []);
  
  const applyFilters = useCallback(() => {
    setAppliedFilters(draftFilters);
  }, [draftFilters]);

  const resetAll = useCallback(() => {
    setDraftFilters(initialState);
  }, []);

  const cancelDraft = useCallback(() => {
    setDraftFilters(appliedFilters);
  }, [appliedFilters]);

  const activeFilterGroupsCount = useMemo(() => countActiveGroups(appliedFilters), [appliedFilters]);

  const value = {
    appliedFilters,
    draftFilters,
    setDraftCities,
    setDraftProfession,
    setDraftSalaryFrom,
    setDraftSalaryTo,
    setDraftSchedule,
    setDraftRemote,
    setDraftExperience,
    setDraftPaymentPeriod,
    applyFilters,
    resetAll,
    cancelDraft,
    activeFilterGroupsCount,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
