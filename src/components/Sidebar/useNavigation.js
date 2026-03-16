import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/paths';

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    toHome: () => navigate(PATHS.HOME),
    toSolve: () => navigate(PATHS.SOLVE)
  };
};
