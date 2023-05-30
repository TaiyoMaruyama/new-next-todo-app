const express = require("express");
const app = express();
const PORT = 8000;
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:3000" }));

///Todoの全件をUserに関係なく取得する
app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

///Userの情報を全件取得する
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

///Userがどの投稿をしたかの一覧取得
app.get("/middle", async (req, res) => {
  const getData = await prisma.user.findMany({
    include: { todo: true },
  });
  return res.json(getData);
});

app.listen(PORT, () => {
  console.log("server running");
});
