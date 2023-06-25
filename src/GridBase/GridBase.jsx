import React from 'react';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';



const GridBase = (prop) => {

  const {
  rows,
  columns,
  page,
  pageSize,
  pageSizeOptions,
  autoHeight,
  loading,
  rowCount,
  onFilterModelChange,
  pagination,
  paginationMode,
  paginationModel,
  onPaginationModelChange,
  onRowSelectionModelChange,
  rowSelectionModel,
  pinnedColumns,
  onPinnedColumnsChange
    } = prop;



  
  return (
    <div className="h-[500px] w-5/5 mt-7">
      <DataGridPro
        rows={rows}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
        page={page}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        autoHeight={autoHeight}
        defaultPageSize={10}
        loading={loading}
        rowCount={rowCount}
        onFilterModelChange={onFilterModelChange}
        pagination={pagination}
        paginationMode={paginationMode}
        paginationModel={paginationModel}  
        onPaginationModelChange={onPaginationModelChange}
        checkboxSelection 
        disableRowSelectionOnClick
        onRowSelectionModelChange={onRowSelectionModelChange}
        rowSelectionModel={rowSelectionModel}
        pinnedColumns={pinnedColumns}
        onPinnedColumnsChange={onPinnedColumnsChange}

      />
    </div>
  )
}

export default GridBase