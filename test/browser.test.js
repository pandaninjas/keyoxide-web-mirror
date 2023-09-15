import 'chai/register-should.js'
import * as utils from '../static-src/utils.js'

describe('browser', function () {
    describe('utils', function () {
        describe('computeWKDLocalPart()', function () {
            it('should handle "test"', async function () {
                const local = await utils.computeWKDLocalPart('test')
                local.should.equal('iffe93qcsgp4c8ncbb378rxjo6cn9q6u')
            })
            it('should handle "zaphod"', async function () {
                const local = await utils.computeWKDLocalPart('zaphod')
                local.should.equal('xrea5za9y9auaxq463c9opxt338bnaxu')
            })
        })
        describe('encodeZBase32()', function () {
            it('should handle a Uint8Array', async function () {
                const data = new Uint8Array([
                    169,  74, 143, 229, 204, 177,
                    155, 166,  28,  76,   8, 115,
                    211, 145, 233, 135, 152,  47,
                    187, 211
                ])
                const local = utils.encodeZBase32(data)
                local.should.equal('iffe93qcsgp4c8ncbb378rxjo6cn9q6u')
            })
        })
        describe('generateArgon2Hash()', async function () {
            it('should generate an Argon2 hash', async function () {
                const hash = await utils.generateArgon2Hash("123")
                hash.should.match(/\$argon2id\$(?:.*)/)
            })
        })
        describe('verifyArgon2Hash()', async function () {
            it('should verify a valid Argon2 hash', async function () {
                const hash = await utils.verifyArgon2Hash(
                    "123",
                    "$argon2id$v=19$m=64,t=512,p=2$2ZmmBcXDEMl6M1Bz6fvgEw$WPni+yUmwLYny1JSHcjKOQ")
                hash.should.be.true
            })
            it('should reject an invalid Argon2 hash', async function () {
                const hash = await utils.verifyArgon2Hash(
                    "321",
                    "$argon2id$v=19$m=64,t=512,p=2$2ZmmBcXDEMl6M1Bz6fvgEw$WPni+yUmwLYny1JSHcjKOQ")
                hash.should.be.false
            })
        })
        describe('generateBcryptHash()', async function () {
            it('should generate a bcrypt hash', async function () {
                const hash = await utils.generateBcryptHash("123")
                hash.should.match(/\$2a\$(?:.*)/)
            })
        })
        describe('verifyBcryptHash()', async function () {
            it('should verify a valid bcrypt hash', async function () {
                const hash = await utils.verifyBcryptHash(
                    "123",
                    "$2a$11$yi5BcfAMmDZNbIvIeaRxzOjRCJ.GPWoKBRwGCf8iK7pYrVwiDaQdC")
                hash.should.be.true
            })
            it('should reject an invalid bcrypt hash', async function () {
                const hash = await utils.verifyBcryptHash(
                    "321",
                    "$2a$11$yi5BcfAMmDZNbIvIeaRxzOjRCJ.GPWoKBRwGCf8iK7pYrVwiDaQdC")
                hash.should.be.false
            })
        })
        describe('generateProfileURL()', function () {
            it('should handle a https WKD URL', async function () {
                const local = await utils.generateProfileURL({
                    source: 'wkd',
                    input: 'test@doip.rocks',
                    hostname: 'keyoxide.instance',
                    scheme: 'https'
                })
                local.should.equal('https://keyoxide.instance/test@doip.rocks')
            })
            it('should handle a http WKD URL', async function () {
                const local = await utils.generateProfileURL({
                    source: 'wkd',
                    input: 'test@doip.rocks',
                    hostname: 'keyoxide.instance',
                    scheme: 'http'
                })
                local.should.equal('http://keyoxide.instance/test@doip.rocks')
            })
            it('should handle a https HKP+email URL', async function () {
                const local = await utils.generateProfileURL({
                    source: 'hkp',
                    input: 'test@doip.rocks',
                    hostname: 'keyoxide.instance',
                    scheme: 'https'
                })
                local.should.equal('https://keyoxide.instance/hkp/test@doip.rocks')
            })
            it('should handle a http HKP+email URL', async function () {
                const local = await utils.generateProfileURL({
                    source: 'hkp',
                    input: 'test@doip.rocks',
                    hostname: 'keyoxide.instance',
                    scheme: 'http'
                })
                local.should.equal('http://keyoxide.instance/hkp/test@doip.rocks')
            })
            it('should handle a https HKP+fingerprint URL', async function () {
                const local = await utils.generateProfileURL({
                    source: 'hkp',
                    input: '3637202523E7C1309AB79E99EF2DC5827B445F4B',
                    hostname: 'keyoxide.instance',
                    scheme: 'https'
                })
                local.should.equal('https://keyoxide.instance/3637202523E7C1309AB79E99EF2DC5827B445F4B')
            })
            it('should handle a http HKP+fingerprint URL', async function () {
                const local = await utils.generateProfileURL({
                    source: 'hkp',
                    input: '3637202523E7C1309AB79E99EF2DC5827B445F4B',
                    hostname: 'keyoxide.instance',
                    scheme: 'http'
                })
                local.should.equal('http://keyoxide.instance/3637202523E7C1309AB79E99EF2DC5827B445F4B')
            })
            it('should handle a https keybase URL', async function () {
                const local = await utils.generateProfileURL({
                    source: 'keybase',
                    input: 'https://keybase.io/doip/pgp_keys.asc?fingerprint=3637202523E7C1309AB79E99EF2DC5827B445F4B',
                    hostname: 'keyoxide.instance',
                    scheme: 'https'
                })
                local.should.equal('https://keyoxide.instance/keybase/doip/3637202523E7C1309AB79E99EF2DC5827B445F4B')
            })
            it('should handle a http keybase URL', async function () {
                const local = await utils.generateProfileURL({
                    source: 'keybase',
                    input: 'https://keybase.io/doip/pgp_keys.asc?fingerprint=3637202523E7C1309AB79E99EF2DC5827B445F4B',
                    hostname: 'keyoxide.instance',
                    scheme: 'http'
                })
                local.should.equal('http://keyoxide.instance/keybase/doip/3637202523E7C1309AB79E99EF2DC5827B445F4B')
            })
        })
    })
})
