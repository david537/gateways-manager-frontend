import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

interface IFormInput {
  id?: String;
  serial: String;
  name: String;
  ip: String;
}

const formSchema = z.object({
  serial: z.string().nonempty('Serial is required'),
  name: z.string().nonempty('Name is required'),
  ip: z.string().ip({ version: 'v4', message: 'Please, only IPv4' }).nonempty('IP is required')
});

export function FormGateway(props: any) {
  let dataForm = props.dataForm;
  const recordId = dataForm.id;
  const query = props.query;
  const [serial, setSerial] = useState(dataForm.serial || '');
  const [name, setName] = useState(dataForm.name || '');
  const [ip, setIp] = useState(dataForm.ip || '');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<IFormInput>({
    defaultValues: {
      serial: serial,
      name: name,
      ip: ip
    },
    mode: 'onSubmit',
    resolver: zodResolver(formSchema)
  });
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const mutation = useMutation(query);

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    (data: any, dataId?: any) =>
      mutation.mutate(data, {
        onSuccess: (data, variables, context) => {
          if (dataId) {
          }
          console.log('onSuccess');
          window.location.reload();
        },
        onError: (error, variables, context) => {
          console.error(error);
        },
        onSettled: (data, error, variables, context) => {}
      }),
    [mutation]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form__control">
          <Controller
            name="serial"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                error={!!errors['serial']}
                value={value}
                onChange={onChange}
                className="form__input-serial"
                withAsterisk
                label="Serial"
              />
            )}
          />
          {errors.serial && (
            <p role="alert" className="form__error-message serial">
              Serial is required
            </p>
          )}

          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                error={!!errors['name']}
                value={value}
                onChange={onChange}
                className="form__input-name"
                withAsterisk
                label="Name"
              />
            )}
          />
          {errors.name && (
            <p role="alert" className="form__error-message name">
              Name is required
            </p>
          )}
        </div>

        <Controller
          name="ip"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              error={!!errors['ip']?.message}
              value={value}
              onChange={onChange}
              withAsterisk
              label="IP"
            />
          )}
        />
        {errors.ip && (
          <p role="alert" className="form__error-message">
            IPv4 please
          </p>
        )}

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  );
}
