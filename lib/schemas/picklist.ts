import { z } from "zod";
import { PickListStatus } from "@prisma/client";

export const PickListStatusSchema = z.enum(PickListStatus);

export const PickListSchema = z.object({
  id: z.string(),
  batch: z.string(),
  status: PickListStatusSchema,
  createdAt: z.iso.datetime(),
});

export const CreatePickListSchema = z.object({
  batch: z.string().min(1, "Batch is required"),
});

export const UpdatePickListSchema = z.object({
  id: z.string(),
  status: PickListStatusSchema.optional(),
  batch: z.string().min(1).optional(),
});

// Types
export type PickList = z.infer<typeof PickListSchema>;
export type CreatePickListInput = z.infer<typeof CreatePickListSchema>;
export type UpdatePickListInput = z.infer<typeof UpdatePickListSchema>;
