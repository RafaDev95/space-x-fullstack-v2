import 'dotenv/config'

import launchController from '@/controllers/launches/LaunchController'
import App from './app'

const PORT = process.env.PORT || 5000

const app = new App([launchController], Number(PORT))

app.listen()

app.express.get('/', (req, res) => {
  res.send({ message: 'Fullstack Challenge 🏅 - Space X API' }).status(200)
})
