import { useRecoilValue } from "recoil";
import styles from "../../styles/allUsersTodoList.module.css";
import { Button } from "@mui/material";
import { getAllInfo } from "@/pages/overall";
import { SetStateAction, useEffect, useState } from "react";
import { Progress, User } from "@/pages";
import { useRouter } from "next/router";

const AllTodosList = () => {
  const router = useRouter();
  const todos = useRecoilValue(getAllInfo);
  const [allTodos, setAllTodos] = useState<
    {
      name: string;
      id: number;
      todo: string;
      progress: Progress;
      createdAt: string;
      user?: User | undefined;
      userId?: number | undefined;
    }[]
  >([]);

  const plant = () => {
    const newAllTodos: SetStateAction<
      {
        name: string;
        id: number;
        todo: string;
        progress: Progress;
        createdAt: string;
        user?: User | undefined;
        userId?: number | undefined;
      }[]
    > = [];
    todos.forEach((todo, index) => {
      const poster = todos[index].name;
      todo.todo.map((element) => {
        newAllTodos.push({ ...element, name: poster });
      });
    });
    newAllTodos.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime(); // createdAtの降順にソート
    });
    setAllTodos(newAllTodos);
  };

  useEffect(() => {
    plant();
  }, []);

  return (
    <>
      <div>
        {/* MyTodosListのHeader */}
        <div className={styles.header}>
          <h1 className="h1">Everyone Todos</h1>
          <div className={styles.headerButton}>
            <Button
              variant="contained"
              sx={{ ml: 6, mt: 0.5 }}
              onClick={() => router.push("/")}
            >
              MyPage
            </Button>
          </div>
        </div>
        {/* MyTodosListのBody */}
        <ul className={styles.everyoneTodosList}>
          <li>
            <div className={styles.everyoneTodosColumn}>
              <div className={styles.everyoneTodosTitle}>Everyone Todos</div>
              <div className={styles.everyoneTodosCreated}>作成日</div>
              <div className={styles.everyoneTodosProgress}>進捗</div>
              <div className={styles.everyoneTodosCreator}>作成者</div>
            </div>
          </li>
          <hr className={styles.myTodosLine}></hr>
          {allTodos?.map((myTodo) => (
            <li key={myTodo.id}>
              <div className={styles.myTodoColumn}>
                <div className={styles.myTodoTitle}>{myTodo.todo}</div>
                <div className={styles.myTodoCreated}>
                  {myTodo.createdAt.split("T")[0]}
                </div>
                <div className={styles.myTodoProgress}>{myTodo.progress}</div>
                <div className={styles.myTodoAction}>{myTodo.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AllTodosList;
