import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import PDFExportPanel from "./pdfExport/PDFExportPanel";
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './index.css';

interface ColumnDef {
field: string;
minWidth?: number;
checkboxSelection?: (params: any) => boolean;
headerCheckboxSelection?: (params: any) => boolean;
hide?: boolean;
}

const checkboxSelection = (params: any) => {
return params.columnApi.getRowGroupColumns().length === 0;
};

const headerCheckboxSelection = (params: any) => {
return params.columnApi.getRowGroupColumns().length === 0;
};

const Grid: React.FC = () => {
const gridRef = useRef<AgGridReact>(null);
const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
const [gridApi, setGridApi] = useState<AgGridReactProps['api'] | null>(null);
const [columnApi, setColumnApi] = useState<AgGridReactProps['columnApi'] | null>(null);
const [rowData, setRowData] = useState<any[] | null>(null);
const [columnDefs, setColumnDefs] = useState<ColumnDef[]>([
{
field: 'athlete',
minWidth: 200,
checkboxSelection: checkboxSelection,
headerCheckboxSelection: headerCheckboxSelection,
hide: true,
},
{ field: 'age', hide: false },
{ field: 'country' },
{ field: 'year' },
{ field: 'date' },
{ field: 'sport' },
{ field: 'gold' },
{ field: 'silver' },
{ field: 'bronze' },
{ field: 'total' },
]);
const autoGroupColumnDef = useMemo(() => {
return {
headerName: 'Group',
minWidth: 200,
field: 'athlete',
valueGetter: (params: any) => {
if (params.node.group) {
return params.node.key;
} else {
return params.data[params.colDef.field];
}
},
headerCheckboxSelection: true,
cellRenderer: 'agGroupCellRenderer',
cellRendererParams: {
checkbox: true,
},
};
}, []);
const defaultColDef = useMemo(() => {
return {
editable: true,
enableRowGroup: true,
enablePivot: true,
enableValue: true,
sortable: true,
resizable: true,
filter: true,
flex: 1,
minWidth: 100,
wrapText: true,
autoHeight: true,
};
}, []);

const onGridReady = useCallback((params: AgGridReactProps) => {
setGridApi(params.api);
setColumnApi(params.columnApi);
fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
.then((resp) => resp.json())
.then((data) => setRowData(data));
}, []);

const toggleColumn = (field: string) => {
const newColumns = columnDefs.map((column) => {
if (column.field === field) {
const hide = !column.hide;
return { ...column, hide };
}
return column;
});
setColumnDefs(newColumns);
};

const downloadCSV = () => {
gridRef.current?.api?.exportDataAsCsv();
};

return (
<div style={containerStyle} className="container-fluid">
<div className="grid-check">
{columnDefs.map((column) => (
<div style={{ marginRight: 10 }}>
<input
type="checkbox"
onChange={(e) => toggleColumn(column.field)}
id={column.field}
name={column.field}
checked={!column.hide}
/>
<label htmlFor={column.field}>{column.field}</label>
</div>
))}
</div>
<div style={gridStyle} className="ag-theme-alpine">
<AgGridReact
ref={gridRef}
rowData={rowData}
columnDefs={columnDefs}
autoGroupColumnDef={autoGroupColumnDef}
defaultColDef={defaultColDef}
suppressRowClickSelection={true}
suppressBrowserResizeObserver={true}
rowSelection={'multiple'}
pagination={true}
onGridReady={onGridReady}
/>
<div className="buttons">
<button onClick={downloadCSV}>Download CSV</button>
<PDFExportPanel gridApi={gridApi} columnApi={columnApi} />
</div>
</div>
</div>
);
};

export default Grid;