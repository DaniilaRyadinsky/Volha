import { useQueries } from '@tanstack/react-query';
import { commonQueries } from '../AdminLayout/api/common-queries';

interface IAdminDataProvider {
  children: React.ReactNode;
}
export const AdminDataProvider = ({children}: IAdminDataProvider) => {
  useQueries({
    queries: [
      commonQueries.categories,
      commonQueries.brands,
      commonQueries.materials,
      commonQueries.colors,
      commonQueries.countries,
    ].map(config => ({
      queryKey: config.queryKey,
      queryFn: config.queryFn,
      staleTime: config.staleTime,
    }))
  });

  return <>{children}</>;
};