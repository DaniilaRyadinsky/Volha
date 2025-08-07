
import { Suspense } from 'react';
import './App.css'
import AppRouter from './routes/AppRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <AppRouter />

        </Suspense>
      </QueryClientProvider>
    </>
  )
}

export default App
