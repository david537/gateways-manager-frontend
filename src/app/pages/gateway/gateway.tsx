import { Paper, Table } from '@mantine/core';
import { IconPlus, IconRefresh, IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { DeleteGateway, PostGateway, UpdateGateway, fetchGateways } from '../../core/api/services';
import { FormGateway } from '../../core/components/form/formGateway';
import { Loading } from '../../core/components/loading/loading';
import { ResponsiveModal } from '../../core/components/modal/modal';

const head = [
  {
    id: 'serial_1',
    name: 'Serial'
  },
  {
    id: 'name_2',
    name: 'Name'
  },
  {
    id: 'ip_3',
    name: 'IP'
  },
  {
    id: 'peripherical_4',
    name: 'Peripherical'
  },
  {
    id: 'actions_5',
    name: 'Actions'
  }
];

export default function Gateway() {
  const {
    isLoading,
    data: gateways,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['gateways'],
    queryFn: fetchGateways
  });
  const data = gateways;

  if (isLoading) return <Loading />;
  else if (isError) return <div>Error</div>;

  // Head Table
  const ths = head.map((element: any, index: number) => (
    <th key={element + index}>{element.name}</th>
  ));

  // Row Table
  const rows = gateways.map((element: any, index: number) => {
    const size = Object.keys(gateways[index].peripherals).length;
    return (
      <tr key={index}>
        <td>{element.serial}</td>
        <td>{element.name}</td>
        <td>{element.ip}</td>
        <td>{size}</td>
        <td>
          <div className="table__actions">
            <ResponsiveModal
              title="Update Gateway"
              type={<FormGateway dataForm={element} query={UpdateGateway} />}
              icon={<IconRefresh />}
              color="orange"
              compact
            />
            <ResponsiveModal
              title="Delete Gateway"
              id={element.id}
              delete={DeleteGateway}
              icon={<IconTrash />}
              color="red"
              compact
            />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="table">
      <Paper shadow="sm" p="xl">
        {/* Modal */}
        <ResponsiveModal
          title="Add Gateway"
          icon={<IconPlus />}
          className="table__add"
          type={<FormGateway dataForm={data} query={PostGateway} />}
        />
        {/* Table */}
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
