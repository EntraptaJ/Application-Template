// Web/UI/Components/Providers/NavProvider.tsx
import React, {
  createContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
  useContext,
  useCallback,
} from 'react';

interface Context {
  navOpen: boolean;
  toggleNav: () => void;
  setNavOpen: Dispatch<SetStateAction<boolean>>;
}

const NavContext = createContext<Context>({
  navOpen: false,
  toggleNav: () => {},
  setNavOpen: () => {},
});

export function NavProvider({
  children,
}: PropsWithChildren<{}>): React.ReactElement {
  const [navOpen, setNavOpen] = useState<boolean>();

  const toggleNav = useCallback(() => setNavOpen((navOpen) => !navOpen), [
    setNavOpen,
  ]);

  return (
    <NavContext.Provider value={{ navOpen, setNavOpen, toggleNav }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNavState(): Context {
  return useContext(NavContext);
}
