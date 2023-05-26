import { GetServerSideProps } from "next";
import axios from "axios";
import TodoList from "@/components/todosList/TodoList";
import { useRecoilState } from "recoil";
import { atom } from "recoil";

//SSR処理で情報を取得してくる
export const getServerSideProps: GetServerSideProps = async () => {
  const baseUrl = "http://localhost:8000";
  const todoResponse = await axios.get(`${baseUrl}/todos`);
  const userResponse = await axios.get(`${baseUrl}/users`);

  const todos = await todoResponse.data;
  const users = await userResponse.data;

  return {
    props: { todos, users },
  };
};

// 型の定義
export type Todo = {
  id: number;
  todo: string;
  progress: Progress;
  createdAt: string;
  user?: User;
  userId?: number;
};

export type Progress = "NotStart" | "Doing" | "Done";

export type User = {
  id: number;
  name: string;
  email: string;
  icon: string;
  todos: Todo[];
};

export const getTodoInfo = atom<Todo[]>({
  key: "AllTodo",
  default: [],
});

export const getUserInfo = atom<User[]>({
  key: "AllUser",
  default: [],
});

export default function Home({
  todos,
  users,
}: {
  todos: Todo[];
  users: User[];
}) {
  const [todosSend, setTodosSend] = useRecoilState<Todo[]>(getTodoInfo);
  const [usersSend, setUsersSend] = useRecoilState<User[]>(getUserInfo);
  setTodosSend(todos);
  setUsersSend(users);
  return <TodoList />;
}
