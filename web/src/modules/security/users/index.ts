import { endpoints } from './api';
import UsersTable from './components/table/UsersTable.vue';

export { UsersTable };
export const useUsers = () => {
  const { getUsers } = endpoints;
  return {
    getUsers,
  };
};
