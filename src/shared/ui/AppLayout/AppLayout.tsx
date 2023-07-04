import { Toaster } from 'react-hot-toast';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="p-4 border-b-2 border-zinc-300">
        <h1 className="font-bold text-4xl text-zinc-700 ">Corporate Employees</h1>
      </header>
      <div className="max-w-4xl  mx-auto ">
        <main className="p-2 mx-auto">
          {children}
        </main>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};
