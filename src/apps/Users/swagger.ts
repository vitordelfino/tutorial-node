const paths = {
  '/users/{id}': {
    put: {
      tags: ['User'],
      summary: 'User',
      description: 'Update user',
      security: [
        {
          Bearer: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'uuid',
        },
        {
          in: 'body',
          name: 'update',
          required: true,
          schema: {
            $ref: '#/definitions/UserPayload',
          },
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: {
            $ref: '#/definitions/User',
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
    delete: {
      tags: ['User'],
      summary: 'User',
      description: 'Delete User',
      security: [
        {
          Bearer: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'uuid',
        },
      ],
      responses: {
        200: {
          description: 'OK',
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
  '/users': {
    get: {
      tags: ['User'],
      summary: 'User',
      description: 'Get user by Id',
      security: [
        {
          Bearer: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'uuid',
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: {
            $ref: '#/definitions/User',
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
    post: {
      tags: ['User'],
      summary: 'User',
      description: 'Create user',
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
            $ref: '#/definitions/UserPayload',
          },
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: {
            $ref: '#/definitions/User',
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
  User: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      name: { type: 'string' },
      document: { type: 'string' },
      password: { type: 'string' },
      createdAt: { type: 'date' },
      updatedAt: { type: 'date' },
    },
  },
  UserPayload: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      document: { type: 'string' },
      password: { type: 'string' },
    },
  },
};

export default {
  paths,
  definitions,
};
