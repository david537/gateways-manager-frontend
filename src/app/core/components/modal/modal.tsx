import { Button, Group, Modal, Text, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

export function ResponsiveModal(props: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const idToDelete: String = props.id;
  const deleteQuery = props.delete;

  const mutation = useMutation(deleteQuery);

  const handleDelete = useCallback(
    (idToDelete: any) => {
      mutation.mutate(idToDelete, {
        onSuccess: () => {
          close();
          window.location.reload();
        },
        onError: (error, variables, context) => {
          console.error(error);
        }
      });
    },
    [mutation]
  );

  const deleteForm: any = (
    <div className="delete">
      <Text fw={700}>Are You Sure?</Text>
      <div className="delete__buttons">
        <Button onClick={() => handleDelete(idToDelete)}>Yes</Button>
        <Button color="red" onClick={close}>
          No
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={props.title}
        size="md"
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3
        }}
      >
        {props.type || deleteForm}
      </Modal>

      <Group position="center">
        <Button onClick={open} color={props.color} compact={props.compact}>
          {props.text || props.icon}
        </Button>
      </Group>
    </>
  );
}
