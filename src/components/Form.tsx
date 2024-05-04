import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { FormEvent, useState } from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type TPropsForm = {
    onAdd: any;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Form = ({ onAdd, open, setOpen } : TPropsForm) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskSay_1, setTaskSay_1] = useState("");
    const [taskSay_2, setTaskSay_2] = useState("");
    const [taskSay_3, setTaskSay_3] = useState("");
    
    const handleClose = () => setOpen(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onAdd(taskTitle,taskSay_1,taskSay_2,taskSay_3)        
        handleClose()
        setTaskTitle("")
        setTaskSay_1("")
        setTaskSay_2("")
        setTaskSay_3("")
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "#5E646A", fontSize: "18px", fontWeight: 600, lineHeight: "25px", mb: "7px" }}>
                        Add Topic
                    </Typography>
                    <form
                        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                        onSubmit={handleSubmit}
                    >
                        <TextField id="outlined-basic" label="Title" variant="outlined" value={taskTitle} onChange={ev => setTaskTitle(ev.target.value)} required/>
                        <Typography sx={{ color: "#5E646A", fontSize: "18px", fontWeight: 600, lineHeight: "25px", mb: "-3px", pb: "0px" }}>
                            You should say:
                        </Typography>
                        <TextField id="outlined-basic" label="Say_1" variant="outlined" value={taskSay_1} onChange={ev => setTaskSay_1(ev.target.value)} />
                        <TextField id="outlined-basic" label="Say_2" variant="outlined" value={taskSay_2} onChange={ev => setTaskSay_2(ev.target.value)} />
                        <TextField id="outlined-basic" label="Say_3" variant="outlined" value={taskSay_3} onChange={ev => setTaskSay_3(ev.target.value)} />
                        <Box textAlign="end">
                            <Button variant="contained" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" sx={{ ml: "10px" }} type="submit">
                                Save
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
