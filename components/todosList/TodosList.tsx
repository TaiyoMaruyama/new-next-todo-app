import { Todo, getTodoInfo, getUserInfo } from "@/pages";
import { Button } from "@mui/material";
import styles from "../../styles/todoList.module.css";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import axios from "axios";

const TodoList: React.FC = () => {
  const router = useRouter();
  const [myTodos, setMyTodos] = useState<Todo[]>([]);
  const todos = useRecoilValue(getTodoInfo);
  const users = useRecoilValue(getUserInfo);

  // セッションのあるユーザーのTODOだけ表示するようにFilterをかける
  useEffect(() => {
    const filteredTodos = todos.filter((myTodo) => myTodo.userId == 1);
    setMyTodos(filteredTodos);
  }, []);

  return (
    <div>
      {/* MyTodosListのHeader */}
      <div className={styles.header}>
        <h1 className="h1">My Todos</h1>
        <div className={styles.headerButton}>
          <Button
            variant="contained"
            sx={{ ml: 6, mt: 0.5 }}
            onClick={() => router.push("/create")}
          >
            新規作成
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 6, mt: 0.5 }}
            onClick={() => router.push("/overall")}
          >
            一覧表示
          </Button>
        </div>
      </div>
      {/* MyTodosListのBody */}
      <ul className={styles.myTodosList}>
        <li>
          <div className={styles.myTodosColumn}>
            <div className={styles.myTodosTitle}>MyTodos</div>
            <div className={styles.myTodosCreated}>作成日</div>
            <div className={styles.myTodosProgress}>進捗</div>
            <div className={styles.myTodosAction}> </div>
          </div>
        </li>
        <hr className={styles.myTodosLine}></hr>
        {myTodos?.map((myTodo) => (
          <li key={myTodo.id}>
            <div className={styles.myTodoColumn}>
              <div className={styles.myTodoTitle}>{myTodo.todo}</div>
              <div className={styles.myTodoCreated}>
                {myTodo.createdAt.split("T")[0]}
              </div>
              <div className={styles.myTodoProgress}>{myTodo.progress}</div>
              <div className={styles.myTodoAction}>
                <Button variant="contained" color="error" size="small">
                  削除
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
