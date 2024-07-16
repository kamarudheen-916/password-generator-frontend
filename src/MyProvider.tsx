import  { useState, ReactNode,createContext } from 'react';
interface MyContextType {
  token: string;
  setToken: (token: string) => void;
}

export const MyContext = createContext<MyContextType>({
  token: 'default value', // Default value
  setToken: () => {}, // Default function (no-op)
});


interface MyProviderProps {
  children: ReactNode;
}

const MyProvider = ({ children }: MyProviderProps) => {
  let initialTocken = localStorage.getItem('token')
  const [token, setToken] = useState(initialTocken ? initialTocken:'');

  return (
    <MyContext.Provider value={{ token, setToken }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
