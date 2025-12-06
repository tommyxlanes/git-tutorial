"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPickList,
  updatePickList,
  deletePickList,
  getPickLists,
  getPickList,
} from "@/lib/actions/picklist";
import type {
  CreatePickListInput,
  UpdatePickListInput,
} from "@/lib/schemas/picklist";

export const picklistKeys = {
  all: ["picklists"] as const,
  detail: (id: string) => ["picklists", id] as const,
};

export function usePickLists() {
  return useQuery({
    queryKey: picklistKeys.all,
    queryFn: () => getPickLists(),
  });
}

export function usePickList(id: string) {
  return useQuery({
    queryKey: picklistKeys.detail(id),
    queryFn: () => getPickList(id),
    enabled: !!id,
  });
}

export function useCreatePickList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePickListInput) => createPickList(input),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: picklistKeys.all });
      }
    },
  });
}

export function useUpdatePickList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdatePickListInput) => updatePickList(input),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: picklistKeys.all });
        queryClient.invalidateQueries({
          queryKey: picklistKeys.detail(result.data.id),
        });
      }
    },
  });
}

export function useDeletePickList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePickList({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: picklistKeys.all });
    },
  });
}
