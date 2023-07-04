import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';
import { AddFormEmployee } from '../../features';

export const AddEmployee = () => {
  const nav = useNavigate();
  return (
    <div className="max-w-4xl mx-auto py-12 ">
      <div className="grid items-center gap-4">
        <h1 className="font-bold text-3xl md:text-4xl text-center">Fill the form</h1>
        <button onClick={() => nav('/')} data-testid="button" type="button">
          <ArrowBigLeft className="w-10 h-10 text-zinc-800 hover:fill-zinc-800 transition-all " />

        </button>
        <AddFormEmployee />
      </div>
    </div>
  );
};
