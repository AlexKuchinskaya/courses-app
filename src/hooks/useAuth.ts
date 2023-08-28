import { UserRegisterDto } from 'src/types';
import { useNavigate } from 'react-router-dom';
import { PathRoutes } from '../enums/pathRoutes';

export type RegisterResponse = {
  successful: boolean;
  errors: string[];
};

export const useAuth = () => {
  const navigate = useNavigate();

  const register = (user: UserRegisterDto) => {
    fetch('http://192.168.1.43:4000/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => data as RegisterResponse)
      .then((registerResponse) => {
        if (registerResponse.successful) {
          navigate(`/${PathRoutes.Login}`);
        } else {
          console.log(registerResponse.errors);
        }
      });
  };

  return { register };
};
