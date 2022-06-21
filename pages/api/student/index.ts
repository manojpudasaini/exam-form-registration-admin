import { NextApiRequest, NextApiResponse } from "next";

var admin = require("firebase-admin");

var serviceAccount = require("../../../utils/serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://exam-form-9286a.firebaseio.com",
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resp = await admin
    .app()
    .auth()
    .createUser({
      email: req.body.email,
      password: req.body.password,
      // emailVerified: false,
      // phoneNumber: "+9779813228397",
      // displayName: "John Doe",
      // photoURL: "http://www.example.com/12345678/photo.png",
      // disabled: false,
      // admin: true,
    })
    .catch((error: any) => res.status(500).json({ error: error }));
  console.log(resp?.uid);
  const finalResp = await admin
    .auth()
    .setCustomUserClaims(resp?.uid, { admin: true });
  res.status(200).json({ final: finalResp });
}
