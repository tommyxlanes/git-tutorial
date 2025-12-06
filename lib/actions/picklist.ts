"use server";

import { z } from "zod";
import { createAction } from "./utils";
import {
  CreatePickListSchema,
  UpdatePickListSchema,
} from "@/lib/schemas/picklist";
import { picklistService } from "@/services/picklist.service";

export const createPickList = createAction({
  schema: CreatePickListSchema,
  handler: (input) => picklistService.create(input),
});

export const updatePickList = createAction({
  schema: UpdatePickListSchema,
  handler: (input) => picklistService.update(input),
});

export const deletePickList = createAction({
  schema: z.object({ id: z.string() }),
  handler: ({ id }) => picklistService.delete(id),
});

// For queries, simpler approach (no input validation needed)
export async function getPickLists() {
  return picklistService.findAll();
}

export async function getPickList(id: string) {
  return picklistService.findById(id);
}
