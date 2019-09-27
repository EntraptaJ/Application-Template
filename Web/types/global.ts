import 'UI/Server'

declare global {

  interface HotModule {
    dispose(cb: Function): void;
    accept(cb: Function): void;
  }

  interface NodeModule {
    hot: HotModule;
  }

  /* eslint-disable @typescript-eslint/no-namespace */
  namespace NodeJS {
    interface Process {
      browser: boolean;
    }
  }
  /* eslint-enable @typescript-eslint/no-namespace */
}
