import styles from "./ManageMetalSpec.module.scss";
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
  GridSortModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import { currencyFormatter } from "src/utils/functions";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GoldColor } from "src/utils/enums";
import { Button, Grid } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import AddModal from "src/components/modal/metalSpecification/Add.modal";

interface Row {
  id: number;
  color: GoldColor;
  name: string;
  pricePerUnit: number;
}

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["contains" /* add more over time */].includes(value)
);

const rows = [
  {
    id: 1,
    name: "Gold 14K - Yellow",
    color: GoldColor.Yellow,
    pricePerUnit: 860000,
  },
  {
    id: 2,
    name: "Gold 18K - White",
    color: GoldColor.White,
    pricePerUnit: 1152000,
  },
  {
    id: 3,
    name: "Gold 18K - Rose",
    color: GoldColor.Rose,
    pricePerUnit: 1104000,
  },
];

function ManageMetalSpec() {
  const [openAdd, setOpenAdd] = useState(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

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
        field: "name",
        headerName: "Name",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterOperators,
        sortable: false,
      },
      {
        field: "color",
        headerName: "Color",
        width: 100,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterOperators,
        renderCell: ({ row }) => {
          let classname = "";

          if (row.color === GoldColor.Yellow) classname = styles.yellow;
          if (row.color === GoldColor.White) classname = styles.white;
          if (row.color === GoldColor.Rose) classname = styles.rose;

          return <div className={classname}>{row.color.toLowerCase()}</div>;
        },
      },
      {
        field: "pricePerUnit",
        headerName: "Price Per Gram",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterable: false,
        renderCell: ({ row }) => {
          return <div>{currencyFormatter(row.pricePerUnit)}</div>;
        },
        editable: true,
      },
      {
        field: "actions",
        headerName: "Action",
        type: "actions",
        width: 200,
        headerAlign: "center",
        align: "center",
        getActions: ({ id }) => {
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

  const handleSort = (model: GridSortModel) => {
    console.log(model);
  };

  return (
    <div className={styles.container}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <div className={styles.title}>Diamond Specification</div>

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
        onSortModelChange={handleSort}
        pageSizeOptions={[100]}
        disableColumnSelector
        disableRowSelectionOnClick
        autoHeight
        onRowEditStop={handleRowEditStop}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
      />

      <AddModal open={openAdd} setOpen={setOpenAdd} />
    </div>
  );
}

export default ManageMetalSpec;
