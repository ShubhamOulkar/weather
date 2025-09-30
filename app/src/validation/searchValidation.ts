import { z } from "zod";

export const SearchSchema = z.object({
    search: z.string()
        .trim()
        .min(1, "The place name cannot be empty.")
        .max(100, "The place name is too long (max 100 characters).")
        .regex(
            /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s,.-]*$/,
            "Only use spaces, commas, hyphens, and periods."
        ),
});

export type SearchInput = z.infer<typeof SearchSchema>;
