import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

import { catApi, CreateCat } from 'src/api';

const CreateCatPage = () => {
  const catNameInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isLoading, isError, isSuccess, error, reset } = useMutation({
    mutationFn: (cat: CreateCat) => catApi.createCat(cat),
    // onMutate: variables => {},
    // onError: (error, variables, context) => {},
    // onSuccess: (data, variables, context) => {},
    // onSettled: (data, error, variables, context) => {},
  });

  const handleCreateCat = () => {
    mutate({ name: catNameInputRef.current?.value || '', age: 1, breed: '23' });
    catNameInputRef.current.value = null;
  };

  return (
    <>
      CreateCatPage
      <input name='name' ref={catNameInputRef} />
      <button disabled={isLoading} onClick={handleCreateCat}>
        Create
      </button>
      <button onClick={reset}>Reset</button>
      {isSuccess && <p>Create cat successfully</p>}
      {isError && <p>{error?.response?.data?.messageObj?.message}</p>}
    </>
  );
};

export default CreateCatPage;
