import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

import { catApi, CreateCat } from 'src/api';

const CreateCatPage = () => {
  const catNameInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending, isError, isSuccess, reset } = useMutation({
    mutationFn: (cat: CreateCat) => catApi.createCat(cat),
    // onMutate: variables => {},
    // onError: (error, variables, context) => {},
    // onSuccess: (data, variables, context) => {},
    // onSettled: (data, error, variables, context) => {},
  });

  const handleCreateCat = () => {
    mutate({ name: catNameInputRef.current?.value || '', age: 1, breed: '23' });
    // catNameInputRef.current.value = '';
  };

  return (
    <>
      CreateCatPage
      <input name='name' ref={catNameInputRef} defaultValue={''} />
      <button disabled={isPending} onClick={handleCreateCat}>
        Create
      </button>
      <button onClick={reset}>Reset</button>
      {isSuccess && <p>Create cat successfully</p>}
      {isError && <p>error</p>}
    </>
  );
};

export default CreateCatPage;
