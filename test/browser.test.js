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
        describe('generateProfileURL()', function () {
            it('should handle a WKD URL', async function () {
                const local = await utils.generateProfileURL({
                    source: 'wkd',
                    input: 'test@doip.rocks',
                    hostname: 'keyoxide.instance'
                })
                local.should.equal('https://keyoxide.instance/test@doip.rocks')
            })
            it('should handle a HKP+email URL', async function () {
                const local = await utils.generateProfileURL({
                    source: 'hkp',
                    input: 'test@doip.rocks',
                    hostname: 'keyoxide.instance'
                })
                local.should.equal('https://keyoxide.instance/hkp/test@doip.rocks')
            })
            it('should handle a HKP+fingerprint URL', async function () {
                const local = await utils.generateProfileURL({
                    source: 'hkp',
                    input: '3637202523E7C1309AB79E99EF2DC5827B445F4B',
                    hostname: 'keyoxide.instance'
                })
                local.should.equal('https://keyoxide.instance/3637202523E7C1309AB79E99EF2DC5827B445F4B')
            })
            it('should handle a keybase URL', async function () {
                const local = await utils.generateProfileURL({
                    source: 'keybase',
                    input: 'https://keybase.io/doip/pgp_keys.asc?fingerprint=3637202523E7C1309AB79E99EF2DC5827B445F4B',
                    hostname: 'keyoxide.instance'
                })
                local.should.equal('https://keyoxide.instance/keybase/doip/3637202523E7C1309AB79E99EF2DC5827B445F4B')
            })
        })
    })
})