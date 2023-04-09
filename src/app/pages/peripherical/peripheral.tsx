import { Paper, Table } from '@mantine/core';
import { IconPlus, IconRefresh, IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPeripherals } from '../../core/api/services';
import { FormPeripheral } from '../../core/components/form/formPeripheral';
import { Loading } from '../../core/components/loading/loading';
import { ResponsiveModal } from '../../core/components/modal/modal';

const head = [
  {
    id: 'uid_1',
    name: 'UID'
  },
  {
    id: 'vendor_2',
    name: 'Vendor'
  },
  {
    id: 'Data_3',
    name: 'Date'
  },
  {
    id: 'status_4',
    name: 'Status'
  },
  {
    id: 'actions_5',
    name: 'Actions'
  }
];

export default function Gateway() {
  const {
    isLoading,
    data: peripherals,
    error
  } = useQuery({
    queryKey: ['peripherals'],
    queryFn: fetchPeripherals
  });

  if (isLoading) return <Loading />;
  else if (error) return 'An error has occurred: ' + error;

  // Head Table
  const ths = head.map((element: any, index: number) => (
    <th key={element + index}>{element.name}</th>
  ));

  // Row Table
  const rows = peripherals.map((element: any, index: number) => {
    const getDate = element.createdAt;
    return (
      <tr key={index}>
        <td>{element.uid}</td>
        <td>{element.vendor}</td>
        <td>{formatDate(getDate)}</td>
        <td>{element.status}</td>
        <td>
          <div className="table__actions">
            <ResponsiveModal title="Update Gateway" icon={<IconRefresh />} color="orange" compact />
            <ResponsiveModal title="Delete Gateway" icon={<IconTrash />} color="red" compact />
          </div>
        </td>
      </tr>
    );
  });

  //To Format Date
  function formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  return (
    <div className="table">
      <Paper shadow="sm" p="xl">
        <ResponsiveModal
          title="Add Peripheral"
          icon={<IconPlus />}
          className="table__add"
          type={<FormPeripheral />}
        />
        <Table
          horizontalSpacing="xl"
          verticalSpacing="sm"
          miw={700}
          sx={{ tableLayout: 'fixed' }}
          striped
        >
          <thead>
            <tr>{ths}</tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </div>
  );
}
