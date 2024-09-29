import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function HeaderCard(props: IHeaderCardProps) {
  const { img, subTitle, title } = props;

  return (
    <Card sx={{ width: 250, borderRadius: 0, cursor: "pointer" }}>
      <CardMedia component="img" alt="green iguana" height="180" image={img} />
      <CardContent>
        <span>{title}</span>
        <Typography
          sx={{
            color: "text.secondary",
            mt: 1,
            fontSize: 13,
            "&:hover": { color: "#b43620" },
          }}
        >
          {subTitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HeaderCard;
