
import { z } from "zod";

export const formSchema = z.object({
  frequency: z.string().min(1, {
    message: "Frequency must be at least 1 character.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  locationName: z.string().min(2, {
    message: "Location name must be at least 2 characters.",
  }),
  offset: z.string().optional(),
  tone: z.string().optional(),
  mode: z.string().optional(),
  source: z.string().optional(),
  callsign: z.string().optional(),
  symbol: z.string().optional(),
  course: z.string().optional(),
  speed: z.string().optional(),
  altitude: z.string().optional(),
  comment: z.string().optional(),
  path: z.string().optional(),
});
