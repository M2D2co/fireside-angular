//  Firebase Cloud Function Libraries
import * as admin from 'firebase-admin';

// Import Functions
import * as CreateClient from './functions/create-client'
import * as ClientAccess from './functions/client-access';
import * as ProjectAccess from './functions/project-access';
import * as MessageToZapier from './functions/message-to-zapier';

const project = process.env.GCP_PROJECT;

if ( project === 'mirach-portal-dev') {
  admin.initializeApp({
    credential: admin.credential.cert({
      'projectId': 'mirach-portal-dev',
      'privateKey': '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCeFt8r8UuoPCI+\npNdvfHc9n9eykje31jaHv48aPotPBc62uoiVSuiu2ghfEY9rqru7JsR9xnqD3pJg\nOM13F/0a8WWvN4M6P8pbhDAiSQev5d8oo+xFeWmOZiv5NhwczpMmT+XzZwHmCU+I\ni9DNZfnm0gzw73/UZPEwzxDh52XCyKrcyqciQltBZAHCecg2CKGcSQzKG6Zz/l+y\nDTfKvwSxdvr94c+5huoKwPv/NXNEodHaPBnSZxFFSnplfhqwMsRcj+LeqdTE1eBa\nHIrC6xpMMeQX7C5M7Rf29Wr23N+QMS2yT3/XCeIDb+OfTggj49VOb8X1Sdh/lunj\nOS49jgQrAgMBAAECggEAAJYPH8eWQzpt2hOcZOJuQsE7+IKISFs3+orgSfWfaJyZ\n5p2MchlEAZn3W/rhsEGCzq/XHKxGugRyQH8Va/Kf0qDAgsTO7MFdy7cSwp3ItINC\nr5DkCGHp3UhNs2/a7NRrQUIclSl1nVe9fsEd9hUBtzRiLeaFb9Er/8VUx7Gm8/Dv\nChUQS8bTVXJIsznvRUJ/39V4vvH+pjRSGyH9Ed7ED5c/OUQgS2GEI8t0Afib83a7\nwJq7Ba2zJ7Y5QIGgMBcU1Ig0O/E07mVFuJDZxtdpI0m7DF0hiOP/sVmrPH+cXkp3\ncnxCEn5TtfSBSKPs9wROpQjW7Af+5XbpXX4yUBQiKQKBgQDaJog4DQn0H59zW3JJ\nSr/ORMO4J7t2NefL55uvkr7SJ0utgbvh4v9i+ft01WBXG5XDZ/BSwJtDGH60aNHB\n4nVSgFSqevvpooWzLvDrXxwqhoimYb3NjiB5i4aN8g19iJ0zV6Fjk8WpOcuzQ+bO\nA1IGiDYojvHFfoCkx+EdV7zexQKBgQC5hKL1C5xeatyh4Z6tEXPgr6ZuiE/CeA/t\n6fLmIP83bnQwf/5b68yChiN/V4lXFE9AqJGzrPQDeD+yQUeIgqh1bZP13WuuczfS\nvQEfL/1P9TUAgl7yGvHuHiWN1IKeLrs7uMB8ZI7OFlHDsZHIaPloOZmHaZdcQ6ji\ntJAbJI6GLwKBgFVjB6aI1ACN8CeC/7TYYUMnf0QxqRqX9ubE/Rc35SD06JY9VYER\nDM1884PDkTYHQhN+N37sjNkyWUXcUV4Gec2VFY61HK1SQ+ri0MIQNEIg7pPRZi1z\nGBr7Feuxdr5QHtfd0Pnc+V1HlgfQ6CJzAkQ0RJ6TdObMoSXeZqrJkM/RAoGAetKq\nhKvMOeJr8i0KvbBJVJ9WA+XxUGHmwe/apauA7LUO7bE/uKHTgzLFu6A7yFAk7Dzu\nQdOmtcld+mknr+Q5HY2PoP6YNSYI9le1r205Oz+veIfXzlgyhiClYlIorAtqYG6/\n2VtGBIFYXsRoLRP605sW30T0NdyBqp46rg204ncCgYABgmu9LJv1zX4eA31Gx1jm\neqlAzbyheK1uDuBSD1xwAScLOgg8MXUPVClAP6RPADRAWCDWwErwPxGgyLRyedtL\nyxr87LpLZzYKwuedCrxpb5v4SYUldjj0TzwA+YIh2Wpc90he+Wajh5yaBqS1696p\n19JllnWPXLrcYr0guLpK+Q==\n-----END PRIVATE KEY-----\n',
      'clientEmail': 'firebase-adminsdk-t9rl6@mirach-portal-dev.iam.gserviceaccount.com'
    }),
    databaseURL: "https://mirach-portal-dev.firebaseio.com"
  });
} else {
  admin.initializeApp();
}




//  Export Functions
export const createClient = CreateClient.listener
export const clientAccess = ClientAccess.listener
export const projectAccess = ProjectAccess.listener
export const messageToZapier = MessageToZapier.listener