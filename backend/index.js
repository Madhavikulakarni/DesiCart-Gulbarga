import crypto from 'crypto'
// generate series of bytes
const resetToken=crypto.randomBytes(20).toString('hex')
console.log(resetToken)
const resetPassordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
console.log(resetPassordToken)