import firebaseAdmin from '../../services/firebase/admin'

const firebase = firebaseAdmin.database()

export default async (_, response) => {
  // const ref = firebase.ref('/ingredients')
  // const res = await new Promise((resolve) => {
  //   ref.once('value', function (snapshot) {
  //     const ingredients = snapshot.val()
  //     resolve(ingredients)
  //   })
  // })
  // return response.json(res)
  // const res = await firebase.ref('/news').push()
  // const updated = await res.set(cards[2])
  // return response.json('updated')
  const ref = await firebase.ref('/news/-MFgIiHO--BwBI623t3Z')
  console.log(ref.key)
  ref.once('value', (snapshot) => {
    const res = snapshot.val()
    return response.json(res)
  })
}
