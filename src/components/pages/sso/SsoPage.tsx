import { Table } from "antd";

export const SSOPage = () => {
  const dataSource = [
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "10 Downing Street, London",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 28,
      address: "221B Baker Street, London",
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource}>
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Age" dataIndex="age" key="age" />
        <Table.Column title="Address" dataIndex="address" key="address" />
        <Table.Column
          title="Action"
          key="action"
          render={(_, record) => <a>View {record.name}</a>}
        />
      </Table>
    </div>
  );
};
