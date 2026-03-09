import z from "zod";

export const inviteUserValidator = z.object({

    email: z
        .string().email('Email inválido'),
    
    rol: z
        .enum(['administrador', 'chofer', 'usuario'])
        .optional(),
    
    agency_id: z
        .string()
        .uuid('ID de agencia debe ser un UUID válido')

})

export type InviteUserInput = z.infer<typeof inviteUserValidator>