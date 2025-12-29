import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertWaitingList } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateWaitingListEntry() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertWaitingList) => {
      // Validate with shared schema (though Zod on server does heavy lifting too)
      const validated = api.waitingList.create.input.parse(data);
      
      const res = await fetch(api.waitingList.create.path, {
        method: api.waitingList.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.waitingList.create.responses[400].parse(await res.json());
          throw new Error(error.message || "Validation failed");
        }
        if (res.status === 500) {
          const error = api.waitingList.create.responses[500].parse(await res.json());
          throw new Error(error.message || "Server error");
        }
        throw new Error("Failed to join waiting list");
      }

      return api.waitingList.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Welcome to the Revolution!",
        description: "You've been added to the 11thOne priority waiting list.",
        className: "bg-primary text-primary-foreground border-primary",
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
