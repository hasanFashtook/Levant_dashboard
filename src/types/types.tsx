export type SideNavItem = {
  title: string,
  path?: string,
  icon: JSX.Element,
  submenu?: boolean,
  subMenuItems?: SideNavItem[]
};


export type SessionType = {
  accessToken: string,
  balance: number,
  currency_balance: string,
  email: string,
  full_name: string,
  id: number,
  phone_number: string | null,
  role: {
    id: number,
    name: string
  }
  selected_instagram_account_id: number | null,
  username: string,
}

export type itemData = {
  id: number,
  category: {
    id: number,
    name: string
  },
  service: {
    id: number,
    name: string,
    type: number
  },
  user: {
    id: number,
    name: string | null,
    type: null
  } | null,
  period_in_days: number,
  code: string | null,
  count: number,
  price: string | null,
  status: number
}

export type catchError = {
  response: {
    data: {
      message: string
    }
  }
} | any

export type formikValuesTypes = {
  code: string | null;
  service_id: number;
  category_id: number | string;
  count: number;
  period_in_days: number;
  price: number | null;
  is_real_accounts: string | boolean;
}
export type productsStoreState = {
  success: boolean,
  loading: boolean,
  error: any,
  productsData: {
    products: [],
    count: number,
  },
  activatingId: number,
  lastDispatch: string,
}

export interface InputProps {
  name: string,
  type?: string,
  label: string,
}
export interface InputChoicesProps extends InputProps {
  options: {
    label: string,
    value: string
  }[],
}
export interface InputControlProps extends InputProps {
  control: string,
  options?: {
    label: string,
    value: string | number
  }[],
}
