import * as React from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { StepIconProps } from "@mui/material/StepIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem } from "@fortawesome/free-solid-svg-icons";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundColor: "#b43620",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundColor: "#b43620",
      },
    },
  ],
}));

function PickupStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement<unknown> } = {
    1: <PaymentIcon />,
    2: <FontAwesomeIcon icon={faGem} />,
    3: <CheckRoundedIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

function ShippingStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement<unknown> } = {
    1: <PaymentIcon />,
    2: <FontAwesomeIcon icon={faGem} />,
    3: <LocalShippingIcon />,
    4: <CheckRoundedIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const stepsPickup = ["Thanh Toán", "Chuẩn Bị Đơn", "Hoàn Thành"];
const stepsDelivery = [
  "Thanh Toán",
  "Chuẩn Bị Đơn",
  "Vận Chuyển",
  "Hoàn Thành",
];

export default function StandardOrderStepper(props: IStepperProps) {
  const { activeStep, shipping } = props;

  const steps = shipping ? stepsDelivery : stepsPickup;
  return (
    <Stepper alternativeLabel activeStep={activeStep} connector={null}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={shipping ? ShippingStepIcon : PickupStepIcon}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
