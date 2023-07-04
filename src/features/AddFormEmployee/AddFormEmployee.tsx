import { useCallback, useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Listbox } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { User } from '../../app/types/types';

const positions = ['CEO', 'Developer', 'QA', 'Marketing Specialist', 'CFO'];

const AddFormEmployee = () => {
  const nav = useNavigate();

  const [selectedPosition, setSelectedPosition] = useState(positions[0]);

  const [user, setUser] = useState<User>({
    gender: null,
    id: null,
    jobTitle: null,
    name: null,
    tenure: null,
  });

  const { mutate: createUser, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        ...user,
        jobTitle: selectedPosition,
        id: Date.now(),
      };
      if (!payload.gender || !payload.jobTitle || !payload.name || !payload.tenure) {
        toast.error('All fields required!');
      }
      if (!payload.name) {
        return;
      }
      if (payload.name!.length < 3) {
        toast.error('Property name must be 3 characters minimum!');
        return;
      }
      if (!payload.name!.match(/^[a-zA-Z ]*$/)) {
        toast.error('Please enter alphabet characters only.');
        return;
      }

      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, payload);
      // eslint-disable-next-line consistent-return
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        toast.success('Successfully added!');
        nav('/');
      }
    },
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  }, [user]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createUser();
      }} className="flex flex-col max-w-md mx-auto w-full"
    >

      <input
        className="p-2 border-b-2  outline-none text-zinc-800 mb-2" type="text" name="name"
        onChange={handleChange} value={user.name || ''} placeholder="Name"
        data-testid="name"
      />

      <label htmlFor="tenure" className="flex gap-1 items-center mb-2">
        <span className="text-zinc-500">Tenure</span>
        <input
          id="tenure" type="range" min="0"
          max="30" onChange={handleChange} name="tenure"
          value={user.tenure || 0} step="1" className="bg-zinc-600 w-full"
          data-testid="tenure"
        />
        {user.tenure && <span className="text-zinc-500 font-medium">{user.tenure}</span>}
      </label>
      <Listbox value={selectedPosition} onChange={setSelectedPosition}>
        <Listbox.Button className="p-2 bg-zinc-400 text-white rounded-lg mb-2">{selectedPosition}</Listbox.Button>
        <Listbox.Options>
          {positions.map((pos, idx) => (
            <Listbox.Option
              key={idx}
              value={pos}
              className="bg-zinc-400 p-1 border-b text-white"

            >
              {pos}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <div className="flex gap-2">

        <div className="flex gap-1 items-center p-2">
          <input
            type="radio" id="male" name="gender"
            value="Male"
            onChange={handleChange} data-testid="Male"
          />
          <label htmlFor="male" className="text-zinc-500">Male</label>
        </div>
        <div className="flex gap-1 items-center">
          <input
            type="radio" id="female" name="gender"
            value="Female"
            onChange={handleChange}
          />
          <label htmlFor="female" className="text-zinc-500">Female</label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !user.gender || !user.name || !user.tenure}
        className="bg-zinc-800 text-white p-2 rounded-lg disabled:bg-zinc-400
      disabled:cursor-not-allowed" data-testid="submit"
      >
        submit
      </button>
    </form>
  );
};

export { AddFormEmployee };
