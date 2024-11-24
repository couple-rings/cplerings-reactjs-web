import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function HeaderCard(props: IHeaderCardProps) {
  const { img, subTitle, title, path } = props;

  const navigate = useNavigate();

  return (
    <Card
      sx={{ width: 250, borderRadius: 0, cursor: "pointer" }}
      onClick={() => navigate(path)}
    >
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
