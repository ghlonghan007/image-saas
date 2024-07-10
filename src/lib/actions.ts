'use server'

import { signOut } from '@/auth'
import { LoginSchema } from '@/schemas'
import { z } from 'zod'

export async function logout() {
  await signOut()
}

