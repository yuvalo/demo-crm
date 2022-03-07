import dbConnect from "../../lib/mong-connect";
import Client from '../../model/client.js'

export default async function handler(req, res) {
  const { method } = req

  if (process.env.PERSISTENCE) {
    await dbConnect()
  }

  switch (method) {
    case 'GET':
      try {
        let clients = []
        if (process.env.PERSISTENCE) {
          clients = await Client.find({})
        } else {
          clients = [
            {
              "_id": "6224b7351a1c6bc7727bcfbe",
              "name": "John Doe",
              "email": "john@doe.com",
              "company": "Doe",
              "website": "https://doe.com",
            },
            {
              "_id": "62s457371a8a6bc7727bcfbe",
              "name": "Omri",
              "email": "omri@develeap.com",
              "company": "Develeap",
              "website": "https://develeap.com",
            }
          ]
        }
        res.status(200).json({ success: true, data: clients })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const client = await Client.create(req.body)
        res.status(201).json({ success: true, data: client })
      } catch (error) {
        res.status(400).json({ success: error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}