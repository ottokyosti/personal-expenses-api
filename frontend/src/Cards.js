import * as React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import axios from "axios";

const Cards = (props) => {
    const [currentGet, setCurrentGet] = React.useState([]);

    const clickHandler = (id) => {
        axios.delete(`https://personal-expenses-api.onrender.com/api/expenses/${id}`)
            .then((response) => {
                alert(response.data);
                props.setCount(prevCount => prevCount + 1);
            }).catch((err) => {
                console.log(err);
                alert("Unexpected error ocurred");
            });
    }

    React.useEffect(() => {
        if (props.month === "") {
            axios.get("https://personal-expenses-api.onrender.com/api/expenses").then((response) => {
                setCurrentGet(response.data)
            }).catch((err) => {
                console.log(err);
            });
        } else {
            axios.get(`https://personal-expenses-api.onrender.com/api/expenses/${props.month}`).then((response) => {
                setCurrentGet(response.data);
            }).catch((err) => {
                alert(err.response.data);
            })
        }
    }, [props]);

    let array = currentGet.map((item) => {
        return(
                <Card key={item.id} sx={{ m: 1, minWidth: 250 }} elevation={5}>
                <CardContent>
                    <b>ID:</b> {item.id}
                    <Divider sx={{ marginY: 1 }} />
                    <b>Date:</b> {item.date}
                    <Divider sx={{ marginY: 1 }} />
                    <b>Amount:</b> {item.amount} €
                    <Divider sx={{ marginY: 1 }} />
                    <b>Shop:</b> {item.shop}
                    <Divider sx={{ marginY: 1 }} />
                    <b>Category:</b> {item.category}
                </CardContent>
                <CardActions>
                    <IconButton aria-label="delete" onClick={() => clickHandler(item.id)}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
            );
        });
    return array;
}

export default Cards;