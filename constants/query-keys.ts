export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },

  users: {
    all: ["users"] as const,
    detail: (id: string) => ["users", id] as const,
  },

  roles: {
    all: ["roles"] as const,
    detail: (id: string) => ["roles", id] as const,
  },

  permissions: {
    all: ["permissions"] as const,
  },

  dashboard: {
    stats: ["dashboard", "stats"] as const,
  },
};

// use this instead of passing the keys everywhere
// useQuery({
//   queryKey: ["users"],
//   queryFn: getUsers,
// });

// you can just do this:
// import { queryKeys } from "@/constants/query-keys";

// useQuery({
//   queryKey: queryKeys.users.all,
//   queryFn: getUsers,
// });

