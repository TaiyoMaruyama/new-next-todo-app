import AllTodosList from "@/components/allTodosList/allTodosList";
import axios from "axios";
import { GetServerSideProps } from "next";
import { atom, useRecoilState } from "recoil";
import { Middle } from ".";

//SSR処理で情報を取得してくる
export const getServerSideProps: GetServerSideProps = async () => {
  const baseUrl = "http://localhost:8000";
  const middleResponse = await axios.get(`${baseUrl}/middle`);

  const middle = await middleResponse.data;

  return {
    props: { middle },
  };
};

export const getAllInfo = atom<Middle[]>({
  key: "AllInfo",
  default: [],
});

const AllTodo = ({ middle }: { middle: Middle[] }) => {
  const [allInfoSend, setAllInfosSend] = useRecoilState<Middle[]>(getAllInfo);
  setAllInfosSend(middle);

  return <AllTodosList />;
};

export default AllTodo;
