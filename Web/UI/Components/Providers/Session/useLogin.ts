// Web/UI/Components/Providers/Session/useLogin.ts
import { useLoginMutation } from './login.gen'
import { LoginInput } from 'UI/GraphQL/graphqlTypes.gen';
import { useCallback } from 'react';

export function useLogin(): any {
  const [login] = useLoginMutation()

  const loginFN = useCallback(async (input: LoginInput) => {
    const response = await login({ variables: { input } })
  }, [login])

}