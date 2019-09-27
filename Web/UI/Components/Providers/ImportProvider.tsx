// Web/UI/Components/Providers/ImportContext.tsx
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import { useLocation } from 'react-router';

interface ModuleImported<T> {
  default: T;
}

type ModuleImport<T> = Promise<ModuleImported<T>>;

export type ImportItem = {
  path: string;
  promise: ModuleImport<any> | ModuleImported<any>;
};

type AddImport = <T extends ImportItem>(imported: T) => number;

interface Context {
  imports: ImportItem[];
  addImport: AddImport;
}

const ImportContext = createContext<Context>({
  imports: [],
  addImport: t => t
});

interface ImportProviderProps {
  imports: ImportItem[];
}

export function ImportProvider({
  children,
  imports
}: PropsWithChildren<ImportProviderProps>): React.ReactElement {
  const addImport: AddImport = useCallback(
    newImported => {
      const existingImport = imports.find(
        ({ path }) => path === newImported.path
      );

      if (existingImport) return imports.indexOf(existingImport);
      else {
        imports.push(newImported);
        return imports.indexOf(newImported);
      }
    },
    [imports]
  );

  return (
    <ImportContext.Provider value={{ imports, addImport }}>
      {children}
    </ImportContext.Provider>
  );
}

interface UseImportInput<T> {
  imported: Promise<{ default: T }>;
  path: string;
  Loader: () => React.ReactElement;
}

export function useImport<T extends any>({
  imported,
  path,
  Loader
}: UseImportInput<T>): T {
  const location = useLocation();
  const { addImport } = useContext(ImportContext);
  const { imports } = useContext(ImportContext);
  const [result, setResult] = useState<T>();
  const importsIndex = addImport({ path, promise: imported });
  const ourImport = useMemo(() => imports[importsIndex], [
    importsIndex,
    imports
  ]);

  useMemo(async () => {
    if (typeof imports[importsIndex].promise === 'undefined') return;
    if (typeof imports[importsIndex].promise === 'function') return;

    imports[importsIndex].promise = (await imports[importsIndex]
      .promise).default;
    setResult(ourImport.promise);
  }, [importsIndex, imports, location]);

  if (
    (ourImport.promise && ourImport.promise.executor) ||
    Promise.resolve(ourImport.promise) == ourImport.promise ||
    typeof ourImport.promise === 'undefined'
  ) {
    if (result) return () => result;
    return Loader;
  } else return ourImport.promise;
}
