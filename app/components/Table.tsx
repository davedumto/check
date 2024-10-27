import React, { useState, useEffect } from "react";
import { Capsule } from "../types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { format } from "date-fns";
import CapsuleDetailsModal from "./CapsuleDetailsModal";

interface TableProps {
  capsules: Capsule[];
  loading: boolean;
  error: any;
  onEdit: (capsule: Capsule) => void;
  onDelete: (index: number) => void;
}

const Table: React.FC<TableProps> = ({
  capsules,
  loading,
  error,
  onEdit,
  onDelete,
}) => {
  const [pagination, setPagination] = useState({ first: 0, rows: 5 });
  const [localStateCapsules, setLocalStateCapsules] = useState<Capsule[]>([]);
  const [editingRow, setEditingRow] = useState<Capsule | null>(null);

  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLocalStateCapsules(capsules);
  }, [capsules]);

  const handleViewDetails = (capsule: Capsule) => {
    setSelectedCapsule(capsule);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCapsule(null);
    setIsModalOpen(false);
  };

  const handleChange = (
    field: keyof Capsule,
    value: string,
    capsule: Capsule
  ) => {
    if (editingRow && editingRow.capsule_serial === capsule.capsule_serial) {
      setEditingRow((prev) => ({
        ...prev!,
        [field]: value,
      }));
    }
  };

  const handleDelete = (index: number) => {
    onDelete(index);
  };

  const onPage = (event: { first: number; rows: number }) => {
    setPagination(event);
  };

  const getStatusStyles = (status: string) => {
    const statusStyles: any = {
      destroyed: {
        row: "bg-red-100",
        pill: "bg-red-200 text-red-800",
      },
      active: {
        row: "bg-green-100",
        pill: "bg-green-200 text-green-800",
      },
      unknown: {
        row: "bg-blue-100",
        pill: "bg-blue-200 text-blue-800",
      },
      retired: {
        row: "bg-amber-100",
        pill: "bg-amber-200 text-amber-800",
      },
    };
    return (
      statusStyles[status.toLowerCase()] || { row: "", pill: "text-gray-800" }
    );
  };

  const missionsBodyTemplate = (rowData: Capsule) => (
    <span className="text-lg md:text-xl">{rowData.missions.length}</span>
  );

  const idBodyTemplate = (rowData: Capsule) => (
    <span className="text-lg md:text-xl">{rowData.capsule_id}</span>
  );

  const statusBodyTemplate = (rowData: Capsule) => {
    const isEditing = editingRow?.capsule_id === rowData.capsule_id;
    const statusStyles = getStatusStyles(rowData.status);

    if (isEditing) {
      return (
        <input
          type="text"
          value={editingRow.status}
          onChange={(e) => handleChange("status", e.target.value, rowData)}
          className="p-2 border rounded w-full text-sm"
        />
      );
    }
    return (
      <span
        className={`px-3 py-1 rounded-full text-lg md:text-xl font-medium ${statusStyles.pill}`}
      >
        {rowData.status}
      </span>
    );
  };

  const typeBodyTemplate = (rowData: Capsule) => {
    const isEditing = editingRow?.capsule_id === rowData.capsule_id;

    if (isEditing) {
      return (
        <input
          type="text"
          value={editingRow.type}
          onChange={(e) => handleChange("type", e.target.value, rowData)}
          className="p-2 border rounded w-full text-sm"
        />
      );
    }
    return <span className="text-lg md:text-xl">{rowData.type}</span>;
  };

  const originalLaunchBodyTemplate = (rowData: Capsule) => {
    const isEditing = editingRow?.capsule_serial === rowData.capsule_serial;

    if (isEditing) {
      return (
        <input
          type="text"
          value={editingRow.original_launch || ""}
          onChange={(e) =>
            handleChange("original_launch", e.target.value, rowData)
          }
          className="p-2 border rounded w-full text-sm"
          placeholder="YYYY-MM-DD"
        />
      );
    }
    return (
      <span className="text-lg md:text-xl">
        {rowData.original_launch
          ? format(new Date(rowData.original_launch), "do MMMM yyyy: h:mm a")
          : "N/A"}
      </span>
    );
  };

  const actionBodyTemplate = (rowData: Capsule, options: any) => {
    // const isEditing = editingRow?.capsule_serial === rowData.capsule_serial;
    const rowIndex = options.rowIndex;

    return (
      <div className="flex gap-9">
        <Button
          label="Edit"
          onClick={() => onEdit(rowData)}
          severity="info"
          className="md:text-xl"
        />

        <Button
          label="Delete"
          onClick={() => handleDelete(rowIndex)}
          severity="danger"
          className="md:text-xl"
        />
        <Button
          label="View Details"
          onClick={() => handleViewDetails(rowData)}
          className="md:text-xl"
        />
      </div>
    );
  };

  if (loading) return <p className="text-sm">Loading...</p>;
  if (error)
    return <p className="text-sm text-red-600">Error: {error.message}</p>;

  const rowClassName = (rowData: Capsule) => {
    return `${
      getStatusStyles(rowData.status).row
    } transition-colors duration-150`;
  };

  return (
    <div className="text-gray-600">
      <h2 className="text-3xl font-bold mb-4">Capsules Table</h2>
      <DataTable
        value={localStateCapsules}
        paginator
        paginatorTemplate={
          "CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        }
        first={pagination.first}
        rows={pagination.rows}
        onPage={onPage}
        rowsPerPageOptions={[5, 10, 20]}
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        className="p-4 shadow-lg rounded-lg text-sm"
        rowClassName={rowClassName}
        tableClassName="md:text-lg"
        paginatorClassName="text-xl gap-6 mt-4 font-medium"
        paginatorLeft={<div className="text-xl">Pages: </div>}
      >
        <Column
          field="capsule_id"
          header="Capsule ID"
          body={idBodyTemplate}
          headerClassName="md:text-lg font-semibold"
        />
        <Column
          field="original_launch"
          header="Original Launch"
          body={originalLaunchBodyTemplate}
          headerClassName="md:text-lg font-semibold"
        />
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          headerClassName="md:text-lg font-semibold"
        />
        <Column
          field="type"
          header="Type"
          body={typeBodyTemplate}
          headerClassName="md:text-lg font-semibold"
        />
        <Column
          field="missions"
          header="No. of Missions"
          body={missionsBodyTemplate}
          headerClassName="md:text-lg font-semibold"
        />
        <Column
          body={actionBodyTemplate}
          headerClassName="text-sm font-semibold"
        />
      </DataTable>

      <CapsuleDetailsModal
        capsule={selectedCapsule}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Table;
