// Web/UI/Components/Providers/ImportContext.tsx
import React, {
  useMemo,
  useContext,
  createContext,
  useState,
  PropsWithChildren
} from 'react';

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
  const addImport: AddImport = imported => {
    const existingPath = imports.find(({ path }) => path === imported.path);
    
    if (existingPath) return imports.indexOf(existingPath);
    else return imports.push(imported) - 1;
  };

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
  const { addImport } = useContext(ImportContext);
  const [results, setResults] = useState<T>();
  const { imports } = useContext(ImportContext);
  const importsIndex = addImport({ path, promise: imported });
  const ourImport = useMemo(() => {
    return imports[importsIndex];
  }, [importsIndex]);

  useMemo(async () => {
    if (
      typeof results !== 'undefined' ||
      typeof imports[importsIndex].promise === 'undefined'
    )
      return;

    imports[importsIndex].promise = (await imports[importsIndex]
      .promise).default;

    setResults(imports[importsIndex].promise);
  }, [imported, importsIndex]);

  return useMemo(() => {
    if (
      (ourImport.promise && ourImport.promise.executor) ||
      Promise.resolve(ourImport.promise) == ourImport.promise ||
      typeof ourImport.promise === 'undefined'
    )
      return Loader;
    else return ourImport.promise;
  }, [ourImport]);
}
