'use client';

import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  CreateUserInput,
  createUserSchema,
} from '../../schemas/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUser } from '../../actions/create-user';
import {
  Button,
  Group,
  PasswordInput,
  Select,
  TextInput,
} from '@mantine/core';

export function UserCreateForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      role: 'default',
    },
  });

  const onValidSubmit = (input: CreateUserInput) => {
    startTransition(async () => {
      const result = await createUser(input);

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

      {/* Field: Role */}
      <Controller
        name="role"
        control={control}
        render={({ field }) => {
          return (
            <Select
              label="Role"
              value={field.value}
              data={[
                { value: 'administrator', label: 'Administrator' },
                { value: 'default', label: 'Default' },
              ]}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.role?.message}
            />
          );
        }}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit" disabled={isPending} loading={isPending}>
          Save
        </Button>
      </Group>
    </form>
  );
}
