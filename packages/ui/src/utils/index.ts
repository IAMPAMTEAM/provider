import type { App, Plugin } from 'vue';

type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T>(component: T) => {
  console.log(component);
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name, comp);
  };
  return component as SFCWithInstall<T>;
};
