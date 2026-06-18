const express = require("express");
const webpush = require("web-push");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const VAPID_PUBLIC_KEY =
  "BGw4Fuov12Klb9MNl0VkFNEaxjRs7p1ytzM0VuRcwxQIkm9OO2Y1drEuNaEa2W44yc9XFlGMysMgEcq9Do9icRY";
const VAPID_PRIVATE_KEY = "NIDEuQ1l1nNHYhP-jQDQkDqa1HIz67PlboD0mRBtX_g";

webpush.setVapidDetails(
  "mailto:marcionavarrodearaujo@gmail.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
);

let subscriptions = [];

app.post("/subscribe", (req, res) => {
  console.log("Subscription recebida:", JSON.stringify(req.body, null, 2));
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post("/send-notification", async (req, res) => {
  const { title, body } = req.body;
  console.log("Enviando notificação:", { title, body });
  const notifications = subscriptions.map((subscription) => {
    return webpush.sendNotification(
      subscription,
      JSON.stringify({ title, body }),
    );
  });

  try {
    await Promise.all(notifications);
    res.status(200).json({ message: "Notificações enviadas com sucesso" });
  } catch (error) {
    console.error("Erro ao enviar notificações: ", error);
    res.status(500).json({ error: "Falha ao enviar notificações" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
