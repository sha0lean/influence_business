import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';

const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
];

export default function ProfileTable() {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <div style={{
                height: 300,
                width: '80%',
            }}>
                <div style={{
                    display: 'flex',
                    height: '100%'
                }}>
                    <div style={{
                        flexGrow: 1
                    }}>
                        <DataGrid rows={rows} columns={columns} />
                    </div>
                </div>
            </div>
        </Grid>
    );

}
