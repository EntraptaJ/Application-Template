// Web/UI/Components/Providers/ImportContext.tsx
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type ReactComponent = () => React.ReactElement;

interface ReactModule {
  default: ReactComponent;
}

type ModuleImport = Promise<ReactModule>;

export type ImportItem = {
  path: string;
  promise: ModuleImport | ReactComponent;
};

type AddImport = <T extends ImportItem>(imported: T) => number;

interface Context {
  imports: ImportItem[];
  addImport: AddImport;
}

const ImportContext = createContext<Context>({
  imports: [],
  addImport: (t) => 1,
});

interface ImportProviderProps {
  imports: ImportItem[];
}

export function ImportProvider({
  children,
  imports,
}: PropsWithChildren<ImportProviderProps>): React.ReactElement {
  const addImport: AddImport = useCallback(
    (newImported) => {
      const existingImport = imports.find(
        ({ path }) => path === newImported.path,
      );

      if (existingImport) return imports.indexOf(existingImport);
      else {
        imports.push(newImported);
        return imports.indexOf(newImported);
      }
    },
    [imports],
  );

  return (
    <ImportContext.Provider value={{ imports, addImport }}>
      {children}
    </ImportContext.Provider>
  );
}

interface UseImportInput {
  imported: Promise<ReactModule>;
  path: string;
  Loader: ReactComponent;
}

export function useImport({
  imported,
  path,
  Loader,
}: UseImportInput): ReactComponent {
  const { addImport } = useContext(ImportContext);
  const { imports } = useContext(ImportContext);
  const [result, setResult] = useState<ReactModule>();
  const importsIndex = addImport({ path, promise: imported });
  const ourImport = useMemo(() => imports[importsIndex], [
    importsIndex,
    imports,
  ]);

  useMemo(async () => {
    if (typeof imports[importsIndex].promise === 'undefined') return;
    if (typeof imports[importsIndex].promise === 'function') return;
    imports[importsIndex].promise = (await imports[importsIndex]
      .promise).default;

    setResult(() => imports[importsIndex].promise);
  }, [importsIndex, imports]);

  return useMemo(() => {
    if (
      (ourImport.promise && ourImport.promise.executor) ||
      Promise.resolve(ourImport.promise) == ourImport.promise ||
      typeof ourImport.promise === 'undefined'
    ) {
      if (result) return result;
      return Loader;
    } else return ourImport.promise;
  }, [ourImport, Loader, result]);
}