/// <reference types="next" />
/// <reference types="next/image-types/global" />
import { UserRole } from "@/server/db/schema"
// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
      user: {
        /** The user's postal address. */
        id:string
        role:UserRole
        /**
         * By default, TypeScript merges new interface properties and overwrites existing ones.
         * In this case, the default session user properties will be overwritten,
         * with the new ones defined above. To keep the default session user properties,
         * you need to add them back into the newly declared interface.
         */
      } & DefaultSession["user"]
    }
    interface JWT {
      user: {
        id: string;
        role: UserRole;
      };
    }
  }

  
