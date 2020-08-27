import firebaseAdmin from '../services/firebase/admin'
import admin from '../services/firebase/admin'

class AdminConnector {
  async getUser(uid: string): Promise<admin.auth.UserRecord> {
    return await firebaseAdmin.auth().getUser(uid)
  }

  async setCustomClaims(uid: string, claims: { [key: string]: boolean }): Promise<void> {
    const user = await this.getUser(uid)
    return await firebaseAdmin.auth().setCustomUserClaims(uid, {
      ...user.customClaims,
      ...claims,
    })
  }
}

export default AdminConnector
