import 'chai/register-should.js'
import esmock from 'esmock'

import * as utils from '../src/server/utils.js'

const _env = Object.assign({},process.env)

describe('server', function () {
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
    })
    describe('index', function () {

        // Brittle mocking :(
        describe('generateHKPProfile', function() {

            it('should handle implicit scheme with implicit keys.openpgp.org keyserver', async function () {

                // Arrange
                const fingerprint = '79895B2E0F87503F1DDE80B649765D7F0DDD9BD5'
                // the process.env needs to be here, before the esmock setup.
                process.env.DOMAIN = "keyoxide.org"
                //process.env.SCHEME = "http"

                const index = await esmock('../src/server/index.js', {
                    '../src/server/keys.js': {
                        fetchHKP: () => {
                            return Promise.resolve({
                                publicKey: {
                                    getPrimaryUser: () => {
                                        return {
                                            user: {
                                                userID: {
                                                    email: "example@example.org"
                                                }
                                            }
                                        }
                                    }
                                },
                                fetchURL: 'example.com'
                            })
                        }
                    },
                    'doipjs': {
                        keys: {
                            process: () => {
                                return { 
                                    key: {},
                                    'fingerprint': fingerprint,
                                    users: [] 
                                }
                            }
                        }
                    },
                    'libravatar': {
                        get_avatar_url: () => {
                            return "example.org/avatar.png"
                        }
                    }
                })

                // Act
                const local = await index.generateHKPProfile(fingerprint)

                // Assert
                local.keyoxide.url.should.equal(`https://keyoxide.org/hkp/${fingerprint}`)

            })
        })
    })
})