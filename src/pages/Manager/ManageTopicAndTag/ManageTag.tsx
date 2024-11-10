import styles from "./Index.module.scss";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridFilterModel,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Button, Grid, Switch } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddModal from "src/components/modal/tag/Add.modal";
import DeleteModal from "src/components/modal/tag/Delete.modal";

interface Row {
  id: number;
  name: string;
  isActive: boolean;
}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const rows = [
  {
    id: 1,
    name: "Engagement",
    isActive: true,
  },
  {
    id: 2,
    name: "Proposal",
    isActive: true,
  },
  {
    id: 3,
    name: "Love Story",
    isActive: true,
  },
  {
    id: 4,
    name: "Wedding",
    isActive: false,
  },
  {
    id: 5,
    name: "Ring Care",
    isActive: false,
  },
];

const initSelected = {
  id: 0,
  name: "",
  isActive: true,
};

function ManageTag() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState<Row>(initSelected);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const onChangeStatus = (id: number) => {
    console.log(id);
  };

  const handleEditClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    },
    [rowModesModel]
  );

  const handleSaveClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      console.log("call api update");
    },
    [rowModesModel]
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      const editedRow = rows.find((row) => row.id === id);
      console.log(editedRow);
    },
    [rowModesModel]
  );

  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "index",
        headerName: "No",
        width: 200,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (index) =>
          index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1,
      },
      {
        field: "name",
        headerName: "Name",
        width: 300,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
        editable: true,
      },
      {
        field: "isActive",
        headerName: "Status",
        width: 250,
        headerAlign: "center",
        align: "center",
        filterable: false,
        sortable: false,
        renderCell: ({ row }) => (
          <Switch
            defaultChecked={row.isActive}
            onChange={() => onChangeStatus(row.id)}
          />
        ),
      },
      {
        field: "actions",
        headerName: "Action",
        type: "actions",
        width: 200,
        headerAlign: "center",
        align: "center",
        getActions: ({ row, id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon color="primary" />}
                label="Save"
                onClick={handleSaveClick(id)}
                sx={{ py: 3 }}
              />,
              <GridActionsCellItem
                icon={<CancelIcon color="action" />}
                label="Cancel"
                onClick={handleCancelClick(id)}
              />,
            ];
          }

          return [
            <GridActionsCellItem
              sx={{ py: 3 }}
              icon={<DeleteRoundedIcon color="action" />}
              label="Delete"
              onClick={() => {
                setOpenDelete(true);
                setSelected(row);
              }}
            />,
            <GridActionsCellItem
              sx={{ py: 3 }}
              icon={<BorderColorSharpIcon color="action" />}
              label="Update"
              onClick={handleEditClick(id)}
            />,
          ];
        },
      },
    ],
    [handleCancelClick, handleEditClick, handleSaveClick, rowModesModel]
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    const { id } = params;
    const reasons = [
      GridRowEditStopReasons.rowFocusOut,
      GridRowEditStopReasons.escapeKeyDown,
    ];

    if (params.reason && reasons.includes(params.reason)) {
      event.defaultMuiPrevented = true;
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    }

    if (params.reason === GridRowEditStopReasons.enterKeyDown) {
      console.log("call api update");
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleFilter = (model: GridFilterModel) => {
    console.log(model);
  };

  return (
    <div className={styles.container} style={{ paddingBottom: "5rem" }}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <div className={styles.title}>Tag</div>

        <Button
          variant="contained"
          sx={{ ...primaryBtn, py: 1, mb: 3 }}
          onClick={() => setOpenAdd(true)}
        >
          Add New
        </Button>
      </Grid>

      <DataGrid
        getRowHeight={() => "auto"}
        rows={rows}
        columns={columns}
        editMode="row"
        onFilterModelChange={handleFilter}
        pageSizeOptions={[100]}
        disableColumnSelector
        disableRowSelectionOnClick
        autoHeight
        onRowEditStop={handleRowEditStop}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
      />

      <AddModal open={openAdd} setOpen={setOpenAdd} />
      <DeleteModal open={openDelete} setOpen={setOpenDelete} />
    </div>
  );
}

export default ManageTag;
