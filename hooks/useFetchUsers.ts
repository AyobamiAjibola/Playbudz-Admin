
import { useQuery } from "@tanstack/react-query";
import { Game, Player } from "../types/types";
import { api } from "@/lib/api";

interface PlayerParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const useFetchUsers = ({
  page = 1,
  limit = 10,
  search
}: PlayerParams = {}) => {
    const query = useQuery({
        queryKey: [
        "players",
        { page, limit, search },
        ],

        queryFn: async () => {
        const response = await api.get("/users/players", {
            params: {
            page,
            limit,
            search
            },
        });

        return response.data.data as { players: Player[], count: number };
        },
        staleTime: 1000 * 60 * 2, // Dont consider the data stale for 2min
        //gcTime: // Keep unused cached data in memory for 30 minutes
    });

    return {
        players: query.data ?? {players: [], count: 0},
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
};