import dbConnect from "../../lib/mong-connect";
import Client from '../../model/news.js'


export default async function handler(req, res) {
  const { method } = req
  const { query } = req

  if (process.env.PERSISTENCE) {
    await dbConnect()
  }

  switch (method) {
    case 'GET':
      try {
        let news = []
        news = await Client.find({ company: query.company })
        res.status(200).json({ success: true, data: news })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}