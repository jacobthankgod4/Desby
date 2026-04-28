import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const waitlistFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  whatsapp: z.string().min(7).max(20),
  role: z.string().min(1),
  city: z.string().min(2).max(50),
  purpose: z.string().min(10).max(500),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  waitlist: router({
    submit: publicProcedure
      .input(waitlistFormSchema)
      .mutation(async ({ input }) => {
        const apiKey = process.env.BREVO_API_KEY;
        const listId = process.env.BREVO_LIST_ID;

        if (!apiKey || !listId) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Brevo configuration missing",
          });
        }

        try {
          const response = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
              accept: "application/json",
              "api-key": apiKey,
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: input.email,
              attributes: {
                FIRSTNAME: input.name,
                WHATSAPP: input.whatsapp,
                ROLE: String(input.role),
                CITY: input.city,
                PURPOSE: input.purpose,
              },
              listIds: [parseInt(listId)],
              updateEnabled: true,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            console.error("Brevo API error:", data);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to add contact to waitlist",
            });
          }

          return {
            success: true,
            message: "Successfully added to waitlist!",
            contactId: data.id,
          };
        } catch (error) {
          console.error("Waitlist submission error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              error instanceof Error
                ? error.message
                : "Failed to process waitlist submission",
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
