import {z} from 'zod';

const baseJurisdictionSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Jurisdiction = z.infer<typeof baseJurisdictionSchema> & {
  subJurisdictions?: Jurisdiction[];
};

export const jurisdictionSchema: z.ZodType<Jurisdiction> = baseJurisdictionSchema.extend({
  subJurisdictions: z.lazy(() => jurisdictionSchema.array()).optional(),
});
