export interface UserType {
  username: string;
  displayname: string;
}

export interface ChatType {
  chatUrn: string;
  roomUrn: string;
  lastMessage: {
    message: string;
    when: string;
  };
  roomName: string;
  users: string[];
  myData: {
    alert: boolean;
    isPin: boolean;
    status: boolean;
    unreadCount: number;
  };
}

export interface Menu {
  title: string;
  routeName: string | null;
  subMenus: null | Menu[];
}

// TODO: 변수명 변경하기_생각해보니 사이드바 옵션이라는 이름이 이상하다
export interface HeaderOption {
  title: string;
  menus: Menu[];
}
