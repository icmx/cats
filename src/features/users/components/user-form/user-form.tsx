'use client';

import { useActionState } from 'react';
import {
  Button,
  Group,
  PasswordInput,
  Select,
  TextInput,
} from '@mantine/core';
import { UserModel } from '@/db/schema';

export type UserFormProps = {
  initialValues: UserModel | null;
  action: (
    prevState: UserModel | null,
    formData: FormData
  ) => Promise<UserModel | null>;
};

export function UserForm({
  initialValues = null,
  action,
}: UserFormProps) {
  const [defaultValues, dispatch] = useActionState<
    UserModel | null,
    FormData
  >(action, initialValues);

  const isCreating = !defaultValues?.id;
  const isUpdating = !isCreating;

  return (
    <form action={dispatch}>
      {/* Field: Id */}
      {isUpdating && (
        <input
          type="hidden"
          name="id"
          defaultValue={defaultValues?.id}
        />
      )}

      {/* Field: Username */}
      <TextInput
        label="Username"
        name="username"
        defaultValue={defaultValues?.username}
        required={true}
      />

      {/* Field: Password */}
      {isCreating && (
        <PasswordInput
          label="Password"
          name="password"
          required={true}
        />
      )}

      {/* Field: Role */}
      <Select
        label="Role"
        name="role"
        defaultValue={defaultValues?.role || 'default'}
        data={[
          { value: 'administrator', label: 'Administrator' },
          { value: 'default', label: 'Default' },
        ]}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Save</Button>
      </Group>
    </form>
  );
}
