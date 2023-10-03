/*
Copyright (C) 2023 Yarmo Mackenbach

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License along
with this program. If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

If your software can interact with users remotely through a computer network,
you should also make sure that it provides a way for users to get its source.
For example, if your program is a web application, its interface could display
a "Source" link that leads users to an archive of the code. There are many
ways you could offer source, and different solutions will be better for different
programs; see section 13 for the specific requirements.

You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary. For
more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
*/
export const profileSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://spec.keyoxide.org/2/profile.schema.json',
  title: 'Profile',
  description: 'Keyoxide profile with personas',
  type: 'object',
  properties: {
    profileVersion: {
      description: 'The version of the profile',
      type: 'integer'
    },
    profileType: {
      description: 'The type of the profile [openpgp, asp]',
      type: 'string'
    },
    identifier: {
      description: 'Identifier of the profile (email, fingerprint, URI)',
      type: 'string'
    },
    personas: {
      description: 'The personas inside the profile',
      type: 'array',
      items: {
        $ref: 'https://spec.keyoxide.org/2/persona.schema.json'
      },
      minItems: 1,
      uniqueItems: true
    },
    primaryPersonaIndex: {
      description: 'The index of the primary persona',
      type: 'integer'
    },
    publicKey: {
      description: 'The cryptographic key associated with the profile',
      type: 'object',
      properties: {
        keyType: {
          description: 'The type of cryptographic key [eddsa, es256, openpgp, none]',
          type: 'string'
        },
        encoding: {
          description: 'The encoding of the cryptographic key [pem, jwk, armored_pgp, none]',
          type: 'string'
        },
        encodedKey: {
          description: 'The encoded cryptographic key (PEM, stringified JWK, ...)',
          type: ['string', 'null']
        },
        fetch: {
          description: 'Details on how to fetch the public key',
          type: 'object',
          properties: {
            method: {
              description: 'The method to fetch the key [aspe, hkp, wkd, http, none]',
              type: 'string'
            },
            query: {
              description: 'The query to fetch the key',
              type: ['string', 'null']
            },
            resolvedUrl: {
              description: 'The URL the method eventually resolved to',
              type: ['string', 'null']
            }
          }
        }
      },
      required: [
        'keyType',
        'fetch'
      ]
    },
    verifiers: {
      description: 'A list of links to verifiers',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            description: 'Name of the verifier site',
            type: 'string'
          },
          url: {
            description: 'URL to the profile page on the verifier site',
            type: 'string'
          }
        }
      },
      uniqueItems: true
    }
  },
  required: [
    'profileVersion',
    'profileType',
    'identifier',
    'personas',
    'primaryPersonaIndex',
    'publicKey',
    'verifiers'
  ],
  additionalProperties: false
}

export const personaSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://spec.keyoxide.org/2/persona.schema.json',
  title: 'Profile',
  description: 'Keyoxide persona with identity claims',
  type: 'object',
  properties: {
    identifier: {
      description: 'Identifier of the persona',
      type: ['string', 'null']
    },
    name: {
      description: 'Name of the persona',
      type: 'string'
    },
    email: {
      description: 'Email address of the persona',
      type: ['string', 'null']
    },
    description: {
      description: 'Description of the persona',
      type: ['string', 'null']
    },
    avatarUrl: {
      description: 'URL to an avatar image',
      type: ['string', 'null']
    },
    isRevoked: {
      type: 'boolean'
    },
    claims: {
      description: 'A list of identity claims',
      type: 'array',
      items: {
        $ref: 'https://spec.keyoxide.org/2/claim.schema.json'
      },
      uniqueItems: true
    }
  },
  required: [
    'name',
    'claims'
  ],
  additionalProperties: false
}

export const claimSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://spec.keyoxide.org/2/claim.schema.json',
  title: 'Identity claim',
  description: 'Verifiable online identity claim',
  type: 'object',
  properties: {
    claimVersion: {
      description: 'The version of the claim',
      type: 'integer'
    },
    uri: {
      description: 'The claim URI',
      type: 'string'
    },
    proofs: {
      description: 'The proofs that would verify the claim',
      type: 'array',
      items: {
        type: 'string'
      },
      minItems: 1,
      uniqueItems: true
    },
    matches: {
      description: 'Service providers matched to the claim',
      type: 'array',
      items: {
        $ref: 'https://spec.keyoxide.org/2/serviceprovider.schema.json'
      },
      uniqueItems: true
    },
    status: {
      type: 'integer',
      description: 'Claim status code'
    },
    display: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Account name to display in the user interface'
        },
        url: {
          type: ['string', 'null'],
          description: 'URL to link to in the user interface'
        },
        serviceProviderName: {
          type: ['string', 'null'],
          description: 'Name of the service provider to display in the user interface'
        },
        serviceProviderId: {
          type: ['string', 'null'],
          description: 'Id of the service provider'
        }
      }
    }
  },
  required: [
    'claimVersion',
    'uri',
    'proofs',
    'status',
    'display'
  ],
  additionalProperties: false
}

export const serviceProviderSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://spec.keyoxide.org/2/serviceprovider.schema.json',
  title: 'Service provider',
  description: 'A service provider that can be matched to identity claims',
  type: 'object',
  properties: {
    about: {
      description: 'Details about the service provider',
      type: 'object',
      properties: {
        name: {
          description: 'Full name of the service provider',
          type: 'string'
        },
        id: {
          description: 'Identifier of the service provider (no whitespace or symbols, lowercase)',
          type: 'string'
        },
        homepage: {
          description: 'URL to the homepage of the service provider',
          type: ['string', 'null']
        }
      }
    },
    profile: {
      description: 'What the profile would look like if the match is correct',
      type: 'object',
      properties: {
        display: {
          description: 'Profile name to be displayed',
          type: 'string'
        },
        uri: {
          description: 'URI or URL for public access to the profile',
          type: 'string'
        },
        qr: {
          description: 'URI or URL associated with the profile usually served as a QR code',
          type: ['string', 'null']
        }
      }
    },
    claim: {
      description: 'Details from the claim matching process',
      type: 'object',
      properties: {
        uriRegularExpression: {
          description: 'Regular expression used to parse the URI',
          type: 'string'
        },
        uriIsAmbiguous: {
          description: 'Whether this match automatically excludes other matches',
          type: 'boolean'
        }
      }
    },
    proof: {
      description: 'Information for the proof verification process',
      type: 'object',
      properties: {
        request: {
          description: 'Details to request the potential proof',
          type: 'object',
          properties: {
            uri: {
              description: 'Location of the proof',
              type: ['string', 'null']
            },
            accessRestriction: {
              description: 'Type of access restriction [none, nocors, granted, server]',
              type: 'string'
            },
            fetcher: {
              description: 'Name of the fetcher to use',
              type: 'string'
            },
            data: {
              description: 'Data needed by the fetcher or proxy to request the proof',
              type: 'object',
              additionalProperties: true
            }
          }
        },
        response: {
          description: 'Details about the expected response',
          type: 'object',
          properties: {
            format: {
              description: 'Expected format of the proof [text, json]',
              type: 'string'
            }
          }
        },
        target: {
          description: 'Details about the target located in the response',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              format: {
                description: 'How is the proof formatted [uri, fingerprint]',
                type: 'string'
              },
              encoding: {
                description: 'How is the proof encoded [plain, html, xml]',
                type: 'string'
              },
              relation: {
                description: 'How are the response and the target related [contains, equals]',
                type: 'string'
              },
              path: {
                description: 'Path to the target location if the response is JSON',
                type: 'array',
                items: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  },
  required: [
    'about',
    'profile',
    'claim',
    'proof'
  ],
  additionalProperties: false
}
