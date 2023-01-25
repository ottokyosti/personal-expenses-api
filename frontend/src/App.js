import * as React from "react";
import Button from "@mui/material/Button";
import Cards from "./Cards.js";
import AddExpense from "./AddExpense.js";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import "./App.css";

function App() {
    const [stateOfThisMess, setDatabase] = React.useState(<></>);
    const [month, setMonth] = React.useState("");
    const [postObject, setPostObject] = React.useState({date:"", amount:0, shop:"", category:""});
    const [openPost, setOpenPost] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    
    React.useEffect(() => {
        console.log("olentälä");
        setDatabase(<Paper sx={{ p: 1, width: 950, m: 2 }} elevation={5}>
                        <h3>Expenses</h3>
                        <div style={{ maxWidth: 1000, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", paddingBottom: 10 }}>
                            <Cards month={month} count={count} setCount={setCount}/>
                        </div>
                    </Paper>);
        console.log("menintän");
    }, [month, count]);

    const expenseAdd = () => {
        setOpenPost(false);
        axios.post("https://personal-expenses-api.onrender.com/api/expenses", postObject)
            .then((response) => {
                alert("Expense successfully created");
                setCount(prevCount => prevCount + 1);
            }).catch((err) => {
                console.log(err);
                alert(err.response.data);
            });
    }

    const seeTotalAmount = () => {
        axios.get("https://personal-expenses-api.onrender.com/api/expenses/total")
            .then((response) => {
                alert(`Total amount of expenses is currently ${response.data.total}`);
            }).catch((err) => {
                console.log(err);
                alert(err.response.data);
            });
    }

    return (
        <div>
            <div>
                <h1 className="bigtitle">Personal Expenses API</h1>
            </div>
            <div className="categories">
                {stateOfThisMess}
                <FormControl variant="standard" sx={{ marginTop: 2, display: "flex", flexDirection: "column" }}>
                    <RadioGroup
                        value={month}
                        onChange={(event) => {setMonth(event.target.value)}}
                    >
                        <FormControlLabel value="" control={<Radio />} label={"All expenses"} />
                        {months.map((item, index) => {
                            return (<FormControlLabel sx={{marginTop: -1.5}} key={index} value={item} control={<Radio />} label={item} />)
                        })}
                    </RadioGroup>
                    <Button variant="contained" onClick={() => setOpenPost(true)}>Add expense</Button>
                    <Dialog open={openPost} onClose={() => setOpenPost(false)}>
                        <DialogTitle>New expense</DialogTitle>
                        <DialogContent>
                            <AddExpense changeObject={setPostObject}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenPost(false)}>Cancel</Button>
                            <Button onClick={expenseAdd}>Confirm</Button>
                        </DialogActions>
                    </Dialog>
                    <Button variant="contained" sx={{ marginTop: 1.5 }} onClick={seeTotalAmount}>Total amount</Button>
                </FormControl>
            </div>
        </div>  
    );
}

export default App;
