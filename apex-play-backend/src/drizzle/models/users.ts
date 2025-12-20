import { pgEnum } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', [
    'super_admin',
    'admin',
    'moderator',
    'contributor',
    'user',
]);

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    role: roleEnum('role').default('user').notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
   
});