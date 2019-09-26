// API/src/API/Middleware/AuthChecker.ts
import { AuthChecker } from 'type-graphql';
import { Context } from 'API/Context';

export const authChecker: AuthChecker<Context> = (
  { root, args, context: { currentUser }, info },
  roles,
): boolean => {
  // If no roles are being requested then just check the user is logged in.
  if (roles.length === 0) return currentUser !== undefined;

  // If no user then no role to check.
  if (!currentUser) return false;

  // no roles matched, restrict access
  return false;
};
