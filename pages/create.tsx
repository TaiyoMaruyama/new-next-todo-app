import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styled from "../styles/createPage.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const CreatePage = () => {
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState("");
  const router = useRouter();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleChangeProgress = (e: SelectChangeEvent) => {
    setProgress(e.target.value as string);
  };

  return (
    <>
      <div className={styled.createForm}>
        <div className={styled.input}>
          <input
            type="text"
            placeholder="新しいTODOを作成"
            onChange={handleChangeInput}
            value={input}
            className={styled.inputForm}
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                value={progress}
                label="進捗"
                onChange={handleChangeProgress}
              >
                <MenuItem value={"NotStart"}>NotStart</MenuItem>
                <MenuItem value={"Doing"}>Doing</MenuItem>
                <MenuItem value={"Done"}>Done</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className={styled.buttonFrame}>
          <div className={styled.button}>
            <Button variant="contained" sx={{ ml: 6, mt: 0.5 }}>
              新規作成
            </Button>
          </div>
          <div className={styled.button}>
            <Button
              variant="contained"
              sx={{ ml: 6, mt: 0.5 }}
              onClick={() => router.push("/")}
            >
              キャンセル
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
