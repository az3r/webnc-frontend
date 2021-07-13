import users from '@/mocks/users.json'
export default async function handler(req, res) {
  const { id, userName, avatar, email } = users[0]
  return res.status(200).json({
    results: {
      id,
      userName,
      email,
      avatarUrl: avatar
    }
  })
}
