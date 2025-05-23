import React, { useState } from "react";
import { TemplatePageTable } from "../../../../components/ui/template/plantillaPages";
import { Sidebar, TableSimple } from "../../../../components/ui/organismo";
import { InfoBusiness } from "../../../../../domain/entities/InfoBusiness";
import { columnsClient } from "./columnsClient";
import { clientColumnRender } from "./clientColumnRender";
import {
  useActionTables,
  UseFetchGetPaginatio,
} from "../../../../components/hook";
import Drawer1 from "../../../../components/ui/organismo/tablas/config/drawerPrueba";
import { Title1 } from "../../../../components/ui/atomos";

const Clientes: React.FC = () => {
  const [currentePage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, metadata, loading, error } = UseFetchGetPaginatio<InfoBusiness>(
    "/user-Admin",
    currentePage,
    pageSize
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const {
    handleEdit,
    handleView,
    handleDelete,
    selectedItem,
    isOpen,
    onOpenChange,
  } = useActionTables<InfoBusiness>();

  return (
    <TemplatePageTable
      sideBar={<Sidebar />}
      mainContent={
        <>
          <Title1 clasname="text-start" titulo="Clientes" />

          <TableSimple
            tabla="Clientes"
            columnas={columnsClient}
            columnRender={clientColumnRender(
              handleEdit,
              handleView,
              handleDelete
            )}
            data={data || []}
            getRowKey={(item) => item.idUser}
            isLoading={loading}
            error={error?.message}
            page={metadata?.currentPage || 1}
            totalPages={metadata?.totalPages || 1}
            setPage={handlePageChange}
            totalItems={metadata.totalItems}
            setPageSize={setPageSize}
          />

          {selectedItem && (
            <Drawer1
              isOpen={isOpen}
              onClose={() => onOpenChange()}
              data={selectedItem}
            />
          )}
        </>
      }
    />
  );
};

export default Clientes;
