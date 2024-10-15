import { Card, CardContent } from "@mui/material";

const TextMessage = (props: ITextMessageProps) => {
  const { cardBgColor, content } = props;

  return (
    <Card
      sx={{
        background: cardBgColor,
      }}
    >
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default TextMessage;
