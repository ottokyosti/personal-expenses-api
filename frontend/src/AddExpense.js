import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";

function AddExpense(props) {
    const date = React.useRef("");
    const amount = React.useRef("");
    const shop = React.useRef("");
    const category = React.useRef("");

    return(
        <React.Fragment>
            <FormControl variant="standard" sx={{ minWidth: 200, marginTop: 0.5 }}>
                <InputLabel htmlFor="title">Date</InputLabel>
                <Input id="title" value={date.current} onChange={(event) => {
                        date.current = event.target.value;
                        props.changeObject({date: date.current,
                                            amount: parseInt(amount.current),
                                            shop: shop.current,
                                            category: category.current});
                }} />
                <FormHelperText>Date in "yyyy-mm-dd" format</FormHelperText>
            </FormControl>
            <br/>
            <FormControl variant="standard" sx={{ minWidth: 200, marginTop: 0.5 }}>
                <InputLabel htmlFor="title">Amount</InputLabel>
                <Input id="title" type="number" value={amount.current} onChange={(event) => {
                        amount.current = event.target.value;
                        props.changeObject({date: date.current,
                                            amount: parseInt(amount.current),
                                            shop: shop.current,
                                            category: category.current});
                }} />
                <FormHelperText>Max two decimal places</FormHelperText>
            </FormControl>
            <br/>
            <FormControl variant="standard" sx={{ minWidth: 200, marginTop: 0.5 }}>
                <InputLabel htmlFor="title">Shop</InputLabel>
                <Input id="title" value={shop.current} onChange={(event) => {
                        shop.current = event.target.value;
                        props.changeObject({date: date.current,
                                            amount: parseInt(amount.current),
                                            shop: shop.current,
                                            category: category.current});
                }} />
            </FormControl>
            <br/>
            <FormControl variant="standard" sx={{ minWidth: 200, marginTop: 0.5 }}>
                <InputLabel htmlFor="title">Category</InputLabel>
                <Input id="title" value={category.current} onChange={(event) => {
                        category.current = event.target.value;
                        props.changeObject({date: date.current,
                                            amount: parseInt(amount.current),
                                            shop: shop.current,
                                            category: category.current});
                }} />
            </FormControl>
        </React.Fragment>
    );
}

export default AddExpense;