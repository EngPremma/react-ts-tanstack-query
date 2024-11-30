import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';

// import { userApi } from 'src/api';

const TestPage = () => {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['test', 'user'],
  //   queryFn: userApi.users,
  //   staleTime: 10000,
  // });

  return (
    <>
      TestPage
      <input
        value={inputText}
        onChange={e => {
          setInputText(e.target.value);
        }}
        placeholder='type something'
      />
      <button
        onClick={() => {
          setDisplayText(inputText);
          setInputText('');
        }}
      >
        set text
      </button>
      <p>{displayText}</p>
      {/* {isError && <p>Error</p>} */}
      {/* {isLoading && <p>Loading...</p>} */}
      <div data-testid='container'>
        {/* {data?.map(user => {
          return (
            <p key={user.id} data-testid='user-card'>
              {user.name}
            </p>
          );
        })} */}
      </div>
    </>
  );
};

export default TestPage;
