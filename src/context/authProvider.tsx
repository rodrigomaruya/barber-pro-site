"use client";

import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { destroyCookie, parseCookies } from "nookies";
import { setupAPIClient } from "@/service/api";
import { setAuthTokenCookie } from "@/service/auth";
import { SignOut } from "@/service/logout";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credential: SignInProps) => Promise<void>;
  signUp: (credential: SignUpProps) => Promise<void>;
  logoutUser: () => Promise<void>;
  listActiveHaircuts: HaircutsProps[];
  setListActiveHaircuts: Dispatch<SetStateAction<HaircutsProps[]>>;
  enableOrDisable: boolean;
  setEnableOrDisable: Dispatch<SetStateAction<boolean>>;
  activeStatus: boolean;
  setListReport: Dispatch<SetStateAction<ReportProps[]>>;
  listReport: ReportProps[];
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco: string | null;
  subscriptions?: SubscriptionProps | null;
}

interface SubscriptionProps {
  id: string;
  status: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

interface Props {
  data: HaircutsProps[];
}

interface HaircutsProps {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface ReportProps {
  id: string;
  nameClient: string;
  nameHaircut: string;
  price: number;
  day: number;
  month: number;
  year: number;
}
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps>();
  const [listActiveHaircuts, setListActiveHaircuts] = useState<HaircutsProps[]>(
    []
  );
  const [listReport, setListReport] = useState<ReportProps[]>([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [enableOrDisable, setEnableOrDisable] = useState(true);
  const isAuthenticated = !!user;
  const { "@barber.token": token } = parseCookies();
  const api = setupAPIClient(token);

  useEffect(() => {
    if (token) {
      api
        .get("/me")
        .then((res) => {
          const { id, name, email, endereco, subscriptions } = res.data;
          setUser({
            id,
            name,
            email,
            endereco,
            subscriptions,
          });
        })
        .catch(() => {
          SignOut();
        });
    }
  }, []);

  useEffect(() => {
    if (token) {
      api.get("/me").then((res) => {
        const { subscriptions } = res.data;
        const subscribe = subscriptions?.status === "active" ? true : false;
        setActiveStatus(subscribe);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/signin", {
        email,
        password,
      });

      const { id, name, token, subscriptions, endereco } = response.data;

      setAuthTokenCookie(token);
      setUser({
        id,
        name,
        email,
        endereco,
        subscriptions,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      window.location.href = "/dashboard";
    } catch (error) {
      if (error.response?.data?.error) {
        console.log("Erro ao logar", error.response.data.error);
      } else {
        console.log("Erro desconhecido", error);
      }
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });
      window.location.href = "/login";
    } catch (error) {
      console.log("Error ao cadastrar ", error);
    }
  }

  async function logoutUser() {
    try {
      destroyCookie(null, "@barber.token", { path: "/" });
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.log("Error ao sair ", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signUp,
        logoutUser,
        listActiveHaircuts,
        setListActiveHaircuts,
        enableOrDisable,
        setEnableOrDisable,
        activeStatus,
        listReport,
        setListReport,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
