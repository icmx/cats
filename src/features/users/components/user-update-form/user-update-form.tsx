'use client';

import { UserModel } from '@/db/schema';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  UpdateUserInput,
  updateUserSchema,
} from '../../schemas/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUser } from '../../actions/update-user';
import { Button, Group, Select, TextInput } from '@mantine/core';

export type UserUpdateFormProps = {
  defaultValues: UserModel;
};

export function UserUpdateForm({ defaultValues }: UserUpdateFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
    reset,
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    mode: 'onBlur',
    defaultValues: {
      id: defaultValues.id,
      username: defaultValues.username,
      role: defaultValues.role,
    },
  });

  const onValidSubmit = (input: UpdateUserInput) => {
    startTransition(async () => {
      const result = await updateUser(input);

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
      <input type="hidden" {...register('id')} />

      {/* Field: Username */}
      <TextInput
        label="Username"
        required={true}
        error={errors.username?.message}
        {...register('username')}
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
