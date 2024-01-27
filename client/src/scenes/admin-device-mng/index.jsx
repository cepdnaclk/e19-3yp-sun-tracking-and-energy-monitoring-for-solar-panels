import React, { useState, useEffect } from "react";
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';

import { DataGrid } from '@mui/x-data-grid';

const AdminDeviceMng = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [adminDeviceData, setAdminDeviceData] = useState([]);

	useEffect(() => {
		axios
		  .get("/devices/")
		  .then((res) => {
			setAdminDeviceData(res.data);
		  })
		  .catch((err) => {
			console.log(err);
		  });
	  }, []);

	// columns of the data grid
	const columns = [
		{ field: 'id', headerName: 'ID', },
		{
			field: 'modelName',
			headerName: 'Model Name',
			flex: 1,
			cellClassName: 'name-column--cell',
			width: 150,
		},
		{ field: 'modelNumber', headerName: 'Model Number', width: 150, },
		{
			field: 'deviceDescription',
			headerName: 'Description',
			flex: 1,
			cellClassName: 'name-column--cell',
			width: 200,
		},
		{ field: 'purchasedCustomerEmail', headerName: 'Customer Email', flex: 1 },
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 1,
			renderCell: (params) => (
				<>
					<Button
						variant="outlined"
						size="small"
						onClick={() => handleEdit(params.id)} // Use params.id instead of params.row.deviceId
						sx={{
							ml: 2,
							color: colors.yellowAccent[400],
							borderColor: colors.yellowAccent[400],
						}}
					>
						Edit
					</Button>
					<Button
						variant="outlined"
						color="error"
						size="small"
						onClick={() => handleDelete(params.id)} // Use params.id instead of params.row.deviceId
						sx={{ ml: 1 }}
					>
						Delete
					</Button>
				</>
			),
		},
	];

	const handleEdit = (deviceId) => {
		// Handle edit logic here
		console.log(`Editing device with ID: ${deviceId}`);
	};

	const handleDelete = (deviceId) => {
		// Handle delete logic here
		console.log(`Deleting device with ID: ${deviceId}`);
	};

	return (
		<Box m="20px" width="90%">
			{/* Header */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header
					title="DEVICE MANAGEMENT"
					subtitle="Manage Devices and Device Overview"
				/>
			</Box>

			<Box>
        <Link
          to="/admin-add-device"
          style={{ textDecoration: "none", margin: "1rem 0", display: "flex" }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              background: "#FFAC09",
              color: "black",
              fontWeight: "bold",
              marginLeft: "auto",
            }}
          >
            Add New Device
          </Button>
        </Link>
      </Box>

			<Box
				height="75vh"
				sx={{
					'& .MuiDataGrid-root': {
						border: 'none',
					},
					'& .MuiDataGrid-cell': {
						borderBottom: 'none',
					},
					'& .name-column--cell': {
						color: colors.yellowAccent[300],
					},
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: colors.blueAccent[700],
						borderBottom: 'none',
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: colors.primary[400],
					},
					'& .MuiDataGrid-footerContainer': {
						borderTop: 'none',
						backgroundColor: colors.blueAccent[700],
					},
					'& .MuiCheckbox-root': {
						color: `${colors.yellowAccent[200]} !important`,
					},
				}}
			>
				<DataGrid
					checkboxSelection
					rows={adminDeviceData}
					columns={columns}
				/>
			</Box>
		</Box>
	);
};

export default AdminDeviceMng;
