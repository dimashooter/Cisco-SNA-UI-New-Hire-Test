import { QueryClient, QueryClientProvider } from 'react-query';
import { AppLayout } from '../shared/ui';
import { AppRouter } from './route/AppRoute';
import './styles/index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </QueryClientProvider>
  );
}

export default App;
