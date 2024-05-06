import { Delete, ExpandMore } from "@mui/icons-material"
import { Box, Typography, Divider, Accordion, AccordionSummary, AccordionDetails, Stack, Skeleton, Checkbox, Button, TextField } from "@mui/material"
import { useState, useEffect, ChangeEvent } from "react"
import { Form } from "./components/Form";

export interface ITopic {
  title: string;
  say_1: string;
  say_2: string;
  say_3: string;
  done: boolean;
  notes?: string;
}


function App() {
  const [topic, setTopic] = useState<ITopic[]>([])
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<boolean>(false);


  useEffect(() => {
    if (topic.length === 0) return
    localStorage.setItem("topic", JSON.stringify(topic))
  }, [topic])

  useEffect(() => {
    const getTopic = localStorage.getItem("topic")
    const topic = JSON.parse(getTopic as string);
    setTopic(topic)
  }, [])

  function addTask(title: string, say_1: string, say_2: string, say_3: string) {
    setTopic(prev => {
      return [...prev, { title: title, say_1: say_1, say_2: say_2, say_3: say_3, done: false }]
    })
  }

  const deleteTask = (title: string) => {
    setTopic((prev) => prev.filter((el) => el.title != title));
  };

  const handleChange = (taskIndex: number, newDone: boolean) => {
    setTopic(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone
      return newTasks
    })
  };


  const handleNote = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, noteIndex: number) => {
    setTopic(prev => {
      const newNotes = [...prev]
      newNotes[noteIndex].notes = e.target.value
      return newNotes
    })
  }

  setTimeout(() => {
    setLoading(false)
  }, 3000)


  return (
    <>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography textAlign="center" fontSize="30px" fontWeight={600} color="#2A6CEA" lineHeight="35px">
              Speaking challenge
            </Typography>
            <Divider sx={{ m: "3px auto 0 auto" }} />
          </Box>
          <Box>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Add New Topic
            </Button>
          </Box>
        </Box>
        {open &&
          <Form onAdd={addTask} open={open} setOpen={setOpen} />
        }
        {loading ? (
          <Stack spacing={1}>
            <Skeleton variant="text" height={100} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="rectangular" height={300} />
          </Stack>
        ) :
          <Stack>
            <Box mt="20px">
              {topic.map((el, i) => (
                <Accordion key={el.title} sx={{ py: "12px", opacity: `${el.done ? "0.6" : ""}` }}>
                  <AccordionSummary sx={{ color: "#191C1F", fontSize: "20px", fontWeight: 600, lineHeight: "25px", "&:hover": { color: "#2A6CEA" } }}
                    expandIcon={<ExpandMore sx={{ "&:hover": { color: "#2A6CEA" } }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    {el.title}
                  </AccordionSummary>
                  <AccordionDetails sx={{ color: "#5E646A", fontSize: "18px", fontWeight: 600, lineHeight: "25px", mb: "3px", pb: "5px" }}>
                    You should say: <Checkbox checked={el.done} onChange={() => handleChange(i, el.done)}
                      onClick={() => el.done ? el.done = false : el.done = true} />
                    <Button size="small" sx={{ width: "10px" }} onClick={() => deleteTask(el.title)}><Delete /></Button>
                  </AccordionDetails>
                  <AccordionDetails sx={{ color: "#5E646A", fontSize: "18px", fontWeight: 400, lineHeight: "25px", fontStyle: "italic", py: "5px" }}>
                    {el.say_1}
                  </AccordionDetails>
                  <AccordionDetails sx={{ color: "#5E646A", fontSize: "18px", fontWeight: 400, lineHeight: "25px", fontStyle: "italic", py: "5px" }}>
                    {el.say_2}
                  </AccordionDetails>
                  <AccordionDetails sx={{ color: "#5E646A", fontSize: "18px", fontWeight: 400, lineHeight: "25px", fontStyle: "italic", py: "5px" }}>
                    {el.say_3}
                  </AccordionDetails>
                  <AccordionDetails>
                    <TextField label="Notes" sx={{ width: "60%" }} value={el.notes}
                      onChange={(e) => handleNote(e, i)} />
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Stack>
        }
      </Box>
    </>
  )
}

export default App
