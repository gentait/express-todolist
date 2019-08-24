const express = require("express");
const multer = require("multer");
const uuidv4 = require("uuid/v4");

//expressアプリを生成する
const app = express();
app.use(multer().none());
app.use(express.static("web"));

const todoList = [];

// http://localhost:3000/api/v1/list にアクセスしてきたときにTODOリストを返す
app.get("/api/v1/list", (req, res) => {
  // JSONを送信する
  res.json(todoList);
});

//http://localhost:3000/api/v1/addにデータを送信してきたときにTODOリストに項目を追加する
app.post("/api/v1/add", (req, res) => {
  //クライアントからの送信データを追加する
  const todoData = req.body;
  const todoTitle = todoData.title;

  //ユニークIDを生成する
  const id = uuidv4();

  //TODO項目を作る
  const todoItem = {
    id,
    title: todoTitle,
    done: false
  };
  //TODO項目を追加する
  todoList.push(todoItem);

  console.log("Add:" + JSON.stringify(todoItem));

  //追加した項目をクライアントに返す
  res.json(todoItem);
});

//http://localhost:3000/api/v1/item/:idにDELETEで送信してきた時に項目を削除する
app.delete("/api/v1/item/:id", (req, res) => {
  console.log(req.params.id);
  const index = todoList.findIndex(item => {
    return item.id === req.params.id;
  });
  if (index >= 0) {
    const deleted = todoList.splice(index, 1);
    console.log(`Deleted: ${JSON.stringify(deleted[0])}`);
  }
  res.sendStatus(200);
});

//ポート3000でサーバを立てる
app.listen(3000, () => {
  console.log("server is running on localhost:3000");
});
