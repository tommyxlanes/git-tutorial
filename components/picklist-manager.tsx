"use client";

import { useState } from "react";
import {
  usePickLists,
  useCreatePickList,
  useDeletePickList,
} from "@/hooks/use-picklist";

export function PickListManager() {
  const [batch, setBatch] = useState("");

  const { data: pickLists, isLoading } = usePickLists();
  const createMutation = useCreatePickList();
  const deleteMutation = useDeletePickList();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await createMutation.mutateAsync({ batch });

    if (result.success) {
      setBatch("");
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-4">
      {/* Create form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          placeholder="Batch number"
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {createMutation.isPending ? "Creating..." : "Create"}
        </button>
      </form>

      {/* Validation errors */}
      {createMutation.data?.success === false && (
        <div className="text-red-600 text-sm">
          {createMutation.data.fieldErrors?.batch?.[0] ??
            createMutation.data.error}
        </div>
      )}

      {/* List */}
      <ul className="space-y-2">
        {pickLists?.map((pl) => (
          <li
            key={pl.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <span className="font-medium">{pl.batch}</span>
              <span className="ml-2 text-sm text-gray-500">{pl.status}</span>
            </div>
            <button
              onClick={() => deleteMutation.mutate(pl.id)}
              disabled={deleteMutation.isPending}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
