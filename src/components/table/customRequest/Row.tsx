import {
  Box,
  Collapse,
  FormLabel,
  Grid,
  IconButton,
  Popover,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from "moment";
import { currencyFormatter } from "src/utils/functions";
import { designFee } from "src/utils/constants";
import { CustomRequestStatus } from "src/utils/enums";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";

function Row(props: ICustomRequestRowProps) {
  const { data, expandComponent } = props;

  const currentStatus = data.customRequestHistories.find(
    (item) => item.status === data.status
  );

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formatStatus = (
    status: CustomRequestStatus
  ): { text: string; color: string } => {
    if (status === CustomRequestStatus.Waiting)
      return {
        text: "Đang Chờ Duyệt",
        color: "#f1c40f",
      };

    if (status === CustomRequestStatus.OnGoing)
      return {
        text: "Đang Thiết Kế",
        color: "#f1c40f",
      };

    if (status === CustomRequestStatus.Canceled)
      return {
        text: "Đã Hủy",
        color: "#e74c3c",
      };

    return {
      text: "Đã Hoàn Thành",
      color: "#07bc0c",
    };
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{moment().format("DD/MM/YYYY")}</TableCell>
        <TableCell align="center">{currencyFormatter(designFee)}</TableCell>
        <TableCell
          align="center"
          sx={{ color: formatStatus(data.status).color }}
        >
          {formatStatus(data.status).text}
        </TableCell>
        <TableCell align="center">
          {" "}
          {moment(currentStatus?.createdAt).format("DD/MM/YYYY")}
        </TableCell>
        <TableCell align="center">
          {data.staff?.username ?? "--"}{" "}
          {data.staff && (
            <>
              <IconButton onClick={handleClick}>
                <RemoveRedEyeSharpIcon fontSize="small" />
              </IconButton>
              <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Grid container width={300} p={3} gap={1}>
                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Username:</Grid>

                    <Grid item>{data.staff?.username}</Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Email:</Grid>

                    <Grid item>
                      <FormLabel>{data.staff?.email}</FormLabel>
                    </Grid>
                  </Grid>

                  <Grid container justifyContent={"space-between"}>
                    <Grid item>Số điện thoại:</Grid>

                    <Grid item>{data.staff?.phone ?? "--"}</Grid>
                  </Grid>
                </Grid>
              </Popover>
            </>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>{expandComponent}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;
