export interface SidebarOption {
  title: string;
  icon: string;
  menus: Menu[];
}

export interface Menu {
  title: string;
  icon: string;
  routeName: string | null;
  subMenus: null | Menu[];
}
