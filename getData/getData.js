const express = require("express");
const app = express();
const PORT = 8000;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

app.listen(PORT, () => {
  console.log("server running");
});
