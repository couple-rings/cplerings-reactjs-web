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
import {
  currencyFormatter,
  formatRefundMethodTitle,
} from "src/utils/functions";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";

function Row(props: IResellOrderRowProps) {
  const { data, expandComponent } = props;

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
        <TableCell align="center">{data.orderNo}</TableCell>
        <TableCell align="center">
          {moment(data.proofImage.createdAt).format("DD/MM/YYYY")}
        </TableCell>
        <TableCell align="center">
          {currencyFormatter(data.amount.amount)}
        </TableCell>
        <TableCell align="center">
          {formatRefundMethodTitle(data.paymentMethod)}
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
                    <Grid item>Tên tài khoản:</Grid>

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
