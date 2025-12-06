import { prisma } from "@/lib/prisma";
import type {
  PickList,
  CreatePickListInput,
  UpdatePickListInput,
} from "@/lib/schemas/picklist";

export const picklistService = {
  async create(input: CreatePickListInput): Promise<PickList> {
    const record = await prisma.pickList.create({
      data: {
        batch: input.batch,
        status: "CREATED",
      },
    });

    return {
      id: record.id,
      batch: record.batch,
      status: record.status,
      createdAt: record.createdAt.toISOString(),
    };
  },

  async findAll(): Promise<PickList[]> {
    const records = await prisma.pickList.findMany({
      orderBy: { createdAt: "desc" },
    });

    return records.map((r) => ({
      id: r.id,
      batch: r.batch,
      status: r.status,
      createdAt: r.createdAt.toISOString(),
    }));
  },

  async findById(id: string): Promise<PickList | null> {
    const record = await prisma.pickList.findUnique({ where: { id } });
    if (!record) return null;

    return {
      id: record.id,
      batch: record.batch,
      status: record.status,
      createdAt: record.createdAt.toISOString(),
    };
  },

  async update(input: UpdatePickListInput): Promise<PickList> {
    const record = await prisma.pickList.update({
      where: { id: input.id },
      data: {
        ...(input.batch && { batch: input.batch }),
        ...(input.status && { status: input.status }),
      },
    });

    return {
      id: record.id,
      batch: record.batch,
      status: record.status,
      createdAt: record.createdAt.toISOString(),
    };
  },

  async delete(id: string): Promise<void> {
    await prisma.pickList.delete({ where: { id } });
  },
};
