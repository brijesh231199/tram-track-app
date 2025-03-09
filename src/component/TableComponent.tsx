import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";

interface TableComponentProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  rowKey: (record: T) => string | number;
  pagination: false | TablePaginationConfig;
}

const TableComponent = <T extends object>({
  columns,
  data,
  rowKey,
  pagination,
}: TableComponentProps<T>) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={rowKey}
      pagination={pagination}
      bordered
    />
  );
};

export default TableComponent;
