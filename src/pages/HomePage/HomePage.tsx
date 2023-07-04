import { useQuery } from 'react-query';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BarChartComponent, Chart, Spinner, Table,
} from '../../shared/ui';
import { AppRoutes } from '../../shared/routeConfig/routeConfig';
import { User } from '../../app/types/types';

export const HomePage = () => {
  const { data: users, isLoading, error } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);

      return data;
    },
  });

  const content = () => {
    if (isLoading) {
      return (
        <Spinner />
      );
    }
    if (error) {
      return (
        <div>
          Error:
          {' '}
          {error.message}
        </div>
      );
    }
    return (
      <div role="main">
        <button className=" block ml-auto" data-testid="button" type="button">
          <Link
            to={`${AppRoutes.ADD_EMPLOYEE}`} className="text-white p-2 flex items-center justify-start
           bg-slate-900 max-w-fit rounded-md hover:bg-slate-800"
          >
            <Plus className="w-4 h-4 mr-1 text-white " />
            {' '}
            add employer
            {' '}
          </Link>
        </button>
        <Table data={users!} className="mt-2" />
        <div className="flex gap-6 items-end max-lg:flex-wrap max-lg:gap-5 justify-center">

          <Chart data={users!} />
          <BarChartComponent data={users!} />
        </div>
      </div>

    );
  };

  return content();
};
