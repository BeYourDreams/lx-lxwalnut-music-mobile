import crypto from 'crypto'

function sha1(text) {
  return crypto.createHash('sha1').update(text).digest('hex')
}

const PART_1_INDEXES = [23, 14, 6, 36, 16, 40, 7, 19]
const PART_2_INDEXES = [16, 1, 32, 12, 19, 27, 8, 5]
const SCRAMBLE_VALUES = [89, 39, 179, 150, 218, 82, 58, 252, 177, 52, 186, 123, 120, 64, 242, 133, 143, 161, 121, 179]

function pickHashByIdx(hash, indexes) {
  return indexes.map((idx) => hash[idx]).join('')
}

function base64Encode(data) {
  return Buffer.from(data)
    .toString('base64')
    .replace(/[\\/+=]/g, '')
}

function zzcSign(text) {
  const hash = sha1(text)
  const part1 = pickHashByIdx(hash, PART_1_INDEXES)
  const part2 = pickHashByIdx(hash, PART_2_INDEXES)
  const part3 = SCRAMBLE_VALUES.map((value, i) => value ^ parseInt(hash.slice(i * 2, i * 2 + 2), 16))
  const b64Part = base64Encode(part3).replace(/[\\/+=]/g, '')
  return `zzc${part1}${b64Part}${part2}`.toLowerCase()
}

console.log('hash length', sha1('test').length)
console.log('part1', pickHashByIdx(sha1('test'), PART_1_INDEXES))
console.log('sign sample', zzcSign('{"abc":1}'))
