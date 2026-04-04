import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "seeker" | "employer";

interface RoleContextType {
  role: UserRole;
  switchRole: (role: UserRole) => void;
  hasCompanyProfile: boolean;
  setHasCompanyProfile: (val: boolean) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem("jomush_role") as UserRole) || "seeker";
  });
  const [hasCompanyProfile, setHasCompanyProfile] = useState(() => {
    return localStorage.getItem("jomush_has_company") === "true";
  });

  const switchRole = useCallback((newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem("jomush_role", newRole);
  }, []);

  const updateCompanyProfile = useCallback((val: boolean) => {
    setHasCompanyProfile(val);
    localStorage.setItem("jomush_has_company", val ? "true" : "false");
  }, []);

  return (
    <RoleContext.Provider value={{ role, switchRole, hasCompanyProfile, setHasCompanyProfile: updateCompanyProfile }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within RoleProvider");
  return context;
};
