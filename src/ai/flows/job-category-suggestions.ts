'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting job categories, specializations, and other qualities
 *  to help job seekers find relevant job opportunities.
 *
 * - JobCategorySuggestionsInput - The input type for the jobCategorySuggestions function.
 * - JobCategorySuggestionsOutput - The return type for the jobCategorySuggestions function.
 * - jobCategorySuggestions - A function that takes JobCategorySuggestionsInput and returns JobCategorySuggestionsOutput.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobCategorySuggestionsInputSchema = z.object({
  userDescription: z
    .string()
    .describe('A description of the job seeker and their desired job.'),
});
export type JobCategorySuggestionsInput = z.infer<
  typeof JobCategorySuggestionsInputSchema
>;

const JobCategorySuggestionsOutputSchema = z.object({
  categories: z
    .array(z.string())
    .describe('A list of suggested job categories.'),
  specializations: z
    .array(z.string())
    .describe('A list of suggested job specializations.'),
  qualities: z
    .array(z.string())
    .describe('A list of other suggested job qualities or keywords.'),
});
export type JobCategorySuggestionsOutput = z.infer<
  typeof JobCategorySuggestionsOutputSchema
>;

export async function jobCategorySuggestions(
  input: JobCategorySuggestionsInput
): Promise<JobCategorySuggestionsOutput> {
  return jobCategorySuggestionsFlow(input);
}

const jobCategorySuggestionsPrompt = ai.definePrompt({
  name: 'jobCategorySuggestionsPrompt',
  input: {schema: JobCategorySuggestionsInputSchema},
  output: {schema: JobCategorySuggestionsOutputSchema},
  prompt: `You are a job recommendation expert. Given the following description of a job seeker and their desired job, suggest relevant job categories, specializations, and other qualities.

Description: {{{userDescription}}}

Format your response as a JSON object with the following keys:
- categories: A list of suggested job categories.
- specializations: A list of suggested job specializations.
- qualities: A list of other suggested job qualities or keywords.`,
});

const jobCategorySuggestionsFlow = ai.defineFlow(
  {
    name: 'jobCategorySuggestionsFlow',
    inputSchema: JobCategorySuggestionsInputSchema,
    outputSchema: JobCategorySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await jobCategorySuggestionsPrompt(input);
    return output!;
  }
);
