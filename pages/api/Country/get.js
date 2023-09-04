import db from '../../../firebase'


export default async (req, res) => {
    const { id } = req.query;
  
    try {
      if (req.method === 'POST') {
        const res = db.collection('entries').doc(id)
        res.update({...req.body})
      } 
      else if(req.method === "ADD"){
        const res = db.collection('entries').doc(id).set({...req.body});
      }
      else if (req.method === 'GET') {
        const doc = await db.collection('entries').doc(id).get();
        if (!doc.exists) {
          res.status(404).end();
        } else {
          res.status(200).json(doc.data());
        }
      } else if (req.method === 'DELETE') {
        await db.collection('entries').doc(id).delete();
      }
      res.status(200).end();
    } catch (e) {
      res.status(400).end();
    }
  }