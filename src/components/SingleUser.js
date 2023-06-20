import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import "../styles/SingleUser.css";

function SingleUser({ userName, email, phoneNumber, onDeleteHandler, index }) {
  const navigate = useNavigate();
  return (
    <Card className="card">
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() =>
            navigate("/useredit", {
              state: { userName, email, phoneNumber, index },
            })
          }
        >
          <EditIcon sx={{ color: "blue" }} />
        </Button>
        <Button onClick={() => onDeleteHandler(index)}>
          <DeleteIcon sx={{ color: "red" }} />
        </Button>
      </CardActions>

      <CardContent className="card-content">
        
        <div className="card-content-div">
          <PersonIcon />
          <span>{userName}</span>
        </div>
        <div className="card-content-div">
          <EmailIcon />
          <span>{email}</span>
        </div>
        <div className="card-content-div">
          <LocalPhoneIcon />
          <span>{phoneNumber}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default SingleUser;
