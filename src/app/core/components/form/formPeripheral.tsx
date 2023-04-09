import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, NumberInput, Select, TextInput } from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

interface IFormInput {
  uid: Number;
  vendor: String;
  createdAt: Date;
  status?: String;
  gatewayId: String;
}

const formSchema = z.object({
  uid: z.number(),
  vendor: z.string(),
  createdAt: z.date(),
  status: z.string(),
  gatewayId: z.string()
});

export function FormPeripheral() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      uid: 0,
      vendor: '',
      createdAt: new Date(),
      status: '',
      gatewayId: ''
    },
    mode: 'all',
    resolver: zodResolver(formSchema)
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form__control">
          <Controller
            name="uid"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <NumberInput defaultValue={0} withAsterisk label="UID" {...field} />
            )}
          />
          <Controller
            name="vendor"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextInput withAsterisk label="Vendor" {...field} />}
          />
        </div>

        <Controller
          name="status"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              placeholder="Select one"
              withAsterisk
              label="IP"
              {...field}
              data={[
                { value: 'online', label: 'Online' },
                { value: 'offline', label: 'Offline' }
              ]}
            />
          )}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  );
}
