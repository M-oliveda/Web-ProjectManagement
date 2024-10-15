import { Button, Table } from "flowbite-react";

export function TableComponent({
  tableHeaders,
  tableRows,
  isSubscribe,
  onRowDelete,
  onRowUpdate,
}: {
  tableHeaders: Array<string>;
  tableRows: Array<any>;
}) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          {tableHeaders.map((item, index) => (
            <Table.HeadCell key={index * 2}>{item}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {tableRows.map((row, index) => (
            <Table.Row key={index ** 4}>
              {Object.keys(row).map((value) => (
                <Table.Cell key={row[value]}>{row[value]}</Table.Cell>
              ))}
              <Table.Cell>
                <Button
                  disabled={!isSubscribe}
                  onClick={() => onRowUpdate(row.id)}
                >
                  Update
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  disabled={!isSubscribe}
                  onClick={() => onRowDelete(row.id)}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
          .
        </Table.Body>
      </Table>
    </div>
  );
}
