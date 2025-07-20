import z, { success } from 'zod';
import { HttpRequest, HttpResponse } from '../types/Http';
import { badRequest, created } from '../utils/http';

const schema = z.object({
  goal: z.enum(['loose', 'mantain', 'gain']),
  gender: z.enum(['male', 'female']),
  birthdate: z.iso.date(),
  heigth: z.number(),
  weight: z.number(),
  activityLevel: z.number().min(1).max(5),
  account: z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8)
  })

})

export class SignUpController {
  static async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(body)

    if (!success) {
      return badRequest({errors: error.issues})
    }

    return created({
      data: data
    });
  }
}
