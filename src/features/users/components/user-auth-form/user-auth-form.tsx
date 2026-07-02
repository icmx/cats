'use client';

import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import {
  AuthUserInput,
  authUserSchema,
} from '../../schemas/user-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActionResult } from '@/shared/types/action-result';
import { useTransition } from 'react';

export type UserAuthFormProps = {
  label: string;
  action: (
    input: AuthUserInput
  ) => Promise<ActionResult<AuthUserInput>>;
};

export function UserAuthForm({ label, action }: UserAuthFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthUserInput>({
    resolver: zodResolver(authUserSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onValidSubmit = (input: AuthUserInput) => {
    startTransition(async () => {
      const result = await action(input);

      if (result.status === 'error' && result.errors) {
        result.errors?.forEach(([field, message]) => {
          if (!message) {
            return;
          }

          setError(field, {
            message,
          });
        });
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValidSubmit)}>
        {/* Field: Username */}
        <TextInput
          label="Username"
          required={true}
          error={errors.username?.message}
          {...register('username')}
        />

        {/* Field: Password */}
        <PasswordInput
          label="Password"
          required={true}
          error={errors.password?.message}
          {...register('password')}
        />

        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            disabled={isPending}
            loading={isPending}
          >
            {label}
          </Button>
        </Group>
      </form>
    </>
  );
}
