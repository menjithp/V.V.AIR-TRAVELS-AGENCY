import admin from 'firebase-admin'
// const fireConfig={
//     type: "service_account",
//     project_id: "time-waste-f5a8a",
//     private_key_id: "3e84b173e297b128ba1dbe1d52fc8bcf21d9c18c",
//     private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCzMHYucMKI05ej\nkuJmKM9hci5cLdvLpkA7baXw5cLHgGIVYWNKro4MUv+sKX1O9tPqo4aknmoW0uO0\nebTlz9MWvJCUUMR8laK+LsjLBgdxvhr+MiSs3fMw587fYlRlTEhfNEfLpmEv/3M3\nMoSKHpf3ZCjPt1h4aU/lp58ELsuAtehth7baPqTLtR+7heEAAp6tazWp6IURLIeG\nDhtJqX3VOGxqux5hDlloMiEokJPN6EpPqgUIhYdHLg7NppVVhTmkFRm8kVnJlq6w\nHaFrZ9iSZm9/R25qjb9Lk4Hdo9AWKKxzMmf6DWHp6Y1AJnuGG2eeQ4uSIBDde4VZ\nExi5I8aBAgMBAAECggEACw485G2hmwaPDxETdeEjtmvwj1BnBMAbq27+84eBhoSV\nyKLrGOL/MaR3UNx4dkRFW+898e8yNXlKgkqWDi3N5NO6ieQX02X6FgjV66zSDcMA\ncFmQqLfC9uv+eArdkShtOK6FlXuM+ISmy6uKwOjVUHa2C+bQhxFcVBuM9JmchbLY\nuFU62uTzO28pN1+eRPS4Ch/5e9KJ3Z26FxixIrrPaIpqMxC2y8xFIJ3woEkFKfIP\nvLAkkNqdMCWWC16BlX3ZMCcz06KPdZUcu9sj/wtkU4bAxE3BgfSo6b0HQx8PAHGM\netWL4QsziIdFOsa5QBNihf+WmZ06+IwgldRfhUKqhwKBgQD9V/rzGnP+Bmn1Z9lh\nynyIKTS6pexgjYWpfLUs1W2QeS0vDtvp/Vdsy5lmoIfELT3aALPU5XMHkJ5HJTI8\njoILLiwkyc2230n1WMiyhIfPTA0alPdUqhX8qyJcTzkZ0HkzOHr8VxmQnl88K56U\nwYhRJsvc44M33ywl5EW3zJdfEwKBgQC1EXASmITn5NRaD8BF0AEqcBQww5iCldkX\niNa/k6vyuAPZQ8F0/4UaVGrP+s8S/kHuePHd5UTUL5BuvWhJ9m/gPTiy7LmgkExC\nwr9mnLZ6/Mam7oWMJG0RpVoyPaSKDIsrVP01NvAb5KPQnkSZgkdkgWZ8r1HhpkTr\nB3dI01aymwKBgQCdNGnxTlnpqFs5v85Bg1+RMliY9XrfUxI84Lif8HRDcR4blFHc\nOat1REWVTEnS7uvxifwNQLAHYrMEnM02jIufmnAkB+GR966yAvzO4bRQavW6p/Nt\n4vkvx5XTyAk7voRmx0ZxrS6c8dlQwhRuZEVNbhCUqczz75U6khK9AcRwZwKBgQCA\niRdw6/p1D7k7EbFhHa6mLJf4ofESykMo9MfViYPnsn9w7StY3cbkEQceCyKSjhHJ\nsuunpIh+xCEYq7Zrwthaa7tjMK75b1XjkpICyr6zgduXRv1gpb8TZrknryCtqwfk\nQ9nXu98pPd6YSrHR82ywyTcyzdYnhDuqSEuCVBxYfwKBgFY5HHbT6o/TrYXAZjWn\nS1HxwYvgWYUU6AQyHnCEfOLRd5jHlwarFCmUx1KW9DSiRVnM6NXyB9XlT3rZf5/h\nItOWvfNAUvD12DFk56PT1sAvaDpFcWfcw6Z7WLMT0/q5OXco/RgT8gFUcrThFOP1\namlGqXj50XLihmCjescqK2R8\n-----END PRIVATE KEY-----\n",
//     client_email: "firebase-adminsdk-ujhbu@time-waste-f5a8a.iam.gserviceaccount.com",
//     client_id: "108869308364215588155",
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ujhbu%40time-waste-f5a8a.iam.gserviceaccount.com",
//     universe_domain: "googleapis.com"
//   }


const fireConfig={
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key:process.env.private_key,
  client_email:process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: process.env.universe_domain
}
  

try {
  admin.initializeApp({
    credential: admin.credential.cert(fireConfig),
  })
  console.log('Initialized.')
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack)
  }
}

export default admin.firestore();