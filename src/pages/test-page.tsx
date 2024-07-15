import { useEffect, useState } from 'react';

import { userApi, User } from 'src/api';

const TestPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await userApi.users();
        setUsers(data);
      } catch (error) {
        console.log('error :>> ', error);
      }
    })();
  }, []);

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
      <div data-testid='container'>
        {users.map(user => {
          return (
            <p key={user.id} data-testid='user-card'>
              {user.name}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default TestPage;
