import express from 'express'
import * as dotenv from 'dotenv'
import OpenAIApi, { OpenAI } from 'openai'

dotenv.config()

const router = express.Router()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
})

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL.E ROUTES' })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body

    const response = await openai.chat.completions.create({
      prompt,
      n: 1,
      size: '1024x1024',
      model: 'gpt-3.5-turbo',
    })
    image_url = response.data.data[0].url

    res.status(200).json({ photo: image })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
