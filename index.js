const express = require('express')
const db = require('./db')
const app = express();

const router = express.Router();

app.use(router)
app.use(express.json())
app.set('view engine', 'pug')
app.set('views', './views')

router.get('/', function (req, res) {
  res.render('index')
})

// const inputText = "ro"

router.route('/search').get(async (req, res, next) => {
  try {
    const name = 'r'

    const docs = [];

    const snapshot = await db.collection('users').orderBy('name').startAt(name).endAt(name+'\uf8ff').get();
    // const snapshot = await db.collection('users').where('name', '>=', name)
    //   .where('name', '<=', name + 'z').get();

    if (snapshot.empty) {
      throw Error('no documents', 400)
    }

    snapshot.forEach(doc => {
      const data = {
        id: doc.id,
        ...doc.data()
      }

      docs.push(data)
    })

    res.json({ data: docs }).status(200);

  } catch (err) {
    console.log(err);
  }
})

app.listen(8000, () => {
  console.log('Server is running');
})

