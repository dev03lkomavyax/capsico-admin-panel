import { z } from "zod";

export const TicketResolveSchema = z.object({
  resolutionNote: z.string().min(1, "Resolution is required"),
});