import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { User, UserLoginDto } from '@types';
import { PathRoutes } from '@enums/pathRoutes';

export type LoginResponse = {
  successful: boolean;
  errors: string[];
  result: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  authToken: string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
  login: (user: UserLoginDto) => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const navigate = useNavigate();
  const { getItem, setItem, removeItem } = useLocalStorage();
  const [authToken, setAuthToken] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  const updateAuthToken = (token: string) => {
    setAuthToken(token);
    setItem('AUTH_TOKEN', token);
  };

  const getUser = (token: string) => {
    fetch('http://192.168.1.44:4000/users/me', {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => data.result as User)
      .then((user) => setUser(user))
      .catch((error) => console.error(error));
  };

  const login = (user: UserLoginDto) => {
    fetch('http://192.168.1.44:4000/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => data as LoginResponse)
      .then((loginResponse) => {
        if (loginResponse.successful) {
          updateAuthToken(loginResponse.result);
        } else {
          console.log(loginResponse.errors);
        }
      });
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    removeItem('AUTH_TOKEN');
  };

  useEffect(() => {
    const token = getItem('AUTH_TOKEN');
    if (token) {
      if (!authToken?.length) {
        setAuthToken(token);
      }
      //navigate(`/${PathRoutes.Courses}`);
      getUser(token);
    } else {
      navigate(`/${PathRoutes.Login}`);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authToken,
        setAuthToken: updateAuthToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
