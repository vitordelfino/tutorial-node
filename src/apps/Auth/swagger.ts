const paths = {
  '/auth': {
    post: {
      tags: ['Auth'],
      summary: 'Auth',
      description: 'Authenticate User',
      security: [
        {
          Bearer: [],
        },
      ],
      parameters: [
        {
          in: 'body',
          name: 'update',
          required: true,
          schema: {
            $ref: '#/definitions/AuthPayload',
          },
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: {
            $ref: '#/definitions/AuthResponse',
          },
        },
        404: {
          description: 'Not Found',
          schema: {
            $ref: '#/definitions/ErrorResponse',
          },
        },
        500: {
          description: 'Internal Server Error',
          schema: {
            $ref: '#/definitions/ErrorResponse',
          },
        },
      },
    },
  },
};

const definitions = {
  AuthResponse: {
    type: 'object',
    properties: {
      token: { type: 'string' },
    },
  },
  AuthPayload: {
    type: 'object',
    properties: {
      document: { type: 'string' },
      password: { type: 'string' },
    },
  },
};

export default {
  paths,
  definitions,
};
