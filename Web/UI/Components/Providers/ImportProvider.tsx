// Web/UI/Components/Providers/ImportContext.tsx
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

function Test<T extends any>(props: T): any {
  return <div>Test</div>;
}

type ReactComponent = (props?: any) => React.ReactElement;

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

interface UseImportInput<T> {
  imported: Promise<{ default: T }>;
  path: string;
  Loader: () => React.ReactElement;
}

export function useImport<T>({ imported, path, Loader }: UseImportInput<T>): T {
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
    } else {
      return ourImport.promise;
    }
  }, [ourImport, result]);
}
