import styles from "./ManageFingerSize.module.scss";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridPaginationModel,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import { Button, Grid } from "@mui/material";
import { primaryBtn } from "src/utils/styles";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import AddModal from "src/components/modal/fingerSize/Add.modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DeleteModal from "src/components/modal/fingerSize/Delete.modal";
import { pageSize } from "src/utils/constants";
import { fetchFingerSizes } from "src/utils/querykey";
import { getFingerSize } from "src/services/fingerSize.service";
import { useQuery } from "@tanstack/react-query";

interface Row extends IFingerSize {}

const initSelected = {
  id: 0,
  size: 0,
  diameter: 0,
};

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

function ManageFingerSize() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState<Row>(initSelected);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<IFingerSizeFilter>({
    page: 0,
    pageSize,
  });

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchFingerSizes, filterObj],

    queryFn: () => {
      return getFingerSize(filterObj);
    },
  });

  const handleEditClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    },
    [rowModesModel]
  );

  const handleSaveClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    },
    [rowModesModel]
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    },
    [rowModesModel]
  );

  const columns: GridColDef<Row>[] = useMemo(
    () => [
      {
        field: "size",
        headerName: "Size",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterable: false,
        editable: true,
      },
      {
        field: "diameter",
        headerName: "Diameter (mm)",
        width: 200,
        headerAlign: "center",
        align: "center",
        filterable: false,
        editable: true,
      },
      {
        field: "actions",
        headerName: "Action",
        type: "actions",
        width: 300,
        headerAlign: "center",
        align: "center",
        getActions: ({ id, row }) => {
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
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleProcessRowUpdate = (row: Row) => {
    console.log(row);

    return row;
  };

  const handleChangePage = (model: GridPaginationModel) => {
    // model.page is the page to fetch and starts at 0
    setFilterObj({
      ...filterObj,
      page: model.page,
    });
  };

  const handleSort = (model: GridSortModel) => {
    console.log(model);
  };

  useEffect(() => {
    if (response && response.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = response.data;
      setMetaData(rest);
    }
  }, [response]);

  return (
    <div className={styles.container}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <div className={styles.title}>Finger Size</div>

        <Button
          variant="contained"
          sx={{ ...primaryBtn, py: 1, mb: 3 }}
          onClick={() => setOpenAdd(true)}
        >
          Add New
        </Button>
      </Grid>

      <DataGrid
        processRowUpdate={handleProcessRowUpdate}
        loading={isLoading}
        getRowHeight={() => "auto"}
        rows={response?.data?.items ? response.data.items : []}
        columns={columns}
        editMode="row"
        onSortModelChange={handleSort}
        pageSizeOptions={[pageSize]}
        disableColumnSelector
        disableRowSelectionOnClick
        autoHeight
        onRowEditStop={handleRowEditStop}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        paginationMode="server"
        paginationModel={{
          page: filterObj?.page ? filterObj.page : 0,
          pageSize: filterObj?.pageSize ? filterObj.pageSize : pageSize,
        }}
        onPaginationModelChange={handleChangePage}
        rowCount={metaData.count}
      />

      <AddModal open={openAdd} setOpen={setOpenAdd} />
      <DeleteModal open={openDelete} setOpen={setOpenDelete} />
    </div>
  );
}

export default ManageFingerSize;
