import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, update, remove } from "firebase/database";
import express from "express";
import bodyParser from "body-parser";
import moment from "moment";

var app2 = express();
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));
var server = app2.listen(3001, console.log("server is running on port 3001"));

const firebaseConfig = {
  databaseURL:
    "https://myappwater-b3274-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const date = new Date();
const timeInMilliseconds = date.getTime();
const month = date.getMonth() + 1;
const year = date.getFullYear();
//add_home
app2.post("/api/add_home", (req, res) => {
  var fullname = req.body.fullname;
  var number = req.body.number;

  try {
    //console.log('>>>> fullname', fullname)
    //console.log('path', 'home/' + fullname)
    set(ref(db, "home/" + number), {
      name: fullname,
      number: number,
    //   expenses: `${month-1}-${month}`,
      Time: moment(timeInMilliseconds).format(),
    });
    return res.status(200).json({
      RespCode: 200,
      RespMessage: "good",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      RespCode: 500,
      RespMessage: err.message,
    });
  }
});

//expenses
app2.post("/api/expenses", (req, res) => {
  var number = req.body.number;
  var meter_last_month = req.body.meter_last_month;
  var meter_this_month = req.body.meter_this_month;
  var expenses_number = req.body.expenses_number;

  try {
    //console.log('>>>> fullname', fullname)
    //console.log('path', 'home/' + /fullname)
    set(ref(db, "home/" + number + "/expenses/" + month + "-" + year), {
      meter_last_month: meter_last_month,
      meter_this_month: meter_this_month,
      expenses: expenses_number,
      Time: moment(timeInMilliseconds).format(),
    });
    return res.status(200).json({
      RespCode: 200,
      RespMessage: "good",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      RespCode: 500,
      RespMessage: err.message,
    });
  }
});

//get
app2.get("/api/get_home", (req, res) => {
  try {
    get(ref(db, "home"))
      .then((snapshot) => {
        console.log(snapshot.val());
        if (snapshot.exists()) {
          return res.status(200).json({
            RespCode: 200,
            RespMessage: "good",
            Result: snapshot.val(),
          });
        } else {
          return res.status(200).json({
            RespCode: 200,
            RespMessage: "good",
            Result: "not found data",
          });
        }
      })
      .catch((err2) => {
        console.log(err2);
        return res.status(500).json({
          RespCode: 500,
          RespMessage: err2.message,
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      RespCode: 500,
      RespMessage: err.message,
    });
  }
});

//get by user
app2.post("/api/getbyuser", (req, res) => {
  var fullname = req.body.fullname;

  try {
    get(ref(db, "users/" + fullname))
      .then((snapshot) => {
        console.log(snapshot.val());
        if (snapshot.exists()) {
          return res.status(200).json({
            RespCode: 200,
            RespMessage: "good",
            Result: snapshot.val(),
          });
        } else {
          return res.status(200).json({
            RespCode: 200,
            RespMessage: "good",
            Result: "not found data",
          });
        }
      })
      .catch((err2) => {
        console.log(err2);
        return res.status(500).json({
          RespCode: 500,
          RespMessage: err2.message,
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      RespCode: 500,
      RespMessage: err.message,
    });
  }
});

//update
app2.put("/api/update", (req, res) => {
  var fullname = req.body.fullname;
  var balance = req.body.balance;

  try {
    var updates = {};
    updates[`users/${fullname}/balance`] = balance;
    updates[`users/${fullname}/date`] = new Date() + "";
    updates[`users/${fullname}/mil`] = new Date().getTime();

    update(ref(db), updates)
      .then(() => {
        return res.status(200).json({
          RespCode: 200,
          RespMessage: "good",
        });
      })
      .catch((err2) => {
        return res.status(500).json({
          RespCode: 500,
          RespMessage: "bad " + err2.message,
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      RespCode: 500,
      RespMessage: err.message,
    });
  }
});

//delete
app2.delete("/api/delete", (req, res) => {
  var fullname = req.body.fullname;

  try {
    remove(ref(db, "users/" + fullname))
      .then(() => {
        return res.status(200).json({
          RespCode: 200,
          RespMessage: "good",
        });
      })
      .catch((err2) => {
        return res.status(500).json({
          RespCode: 500,
          RespMessage: "bad " + err2.message,
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      RespCode: 500,
      RespMessage: err.message,
    });
  }
});
