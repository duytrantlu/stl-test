export default {
  '400': {
    response: {
      body: {
        name: 'BadRequest',
        message: 'Bad request.'
      }
    }
  },
  '401': {
    response: {
      body: {
        name: 'Unauthorized',
        code: 'credentials_required',
        message: 'No authorization token was found'
      }
    }
  },
  '403': {
    response: {
      body: {
        name: 'Forbidden',
        message: 'You don\'t have permission to access this resource.'
      }
    }
  },
  '404': {
    response: {
      body: {
        name: 'NotFound',
        message: 'The resource you requested was not found.'
      }
    }
  },
  '409': {
    response: {
      body: {
        name: 'Conflict',
        message: 'Missing param',
        errors: []
      }
    }
  },
  '422': {
    response: {
      body: {
        name: 'UnprocessableEntity',
        message: `Unprocessable Entity response is when a request was well-formed, `
        + `but the server could not follow the request due to semantic errors within the request.`
      }
    }
  },
  '500': {
    response: {
      body: {
        name: 'ServerError',
        message: 'Internal server error.'
      }
    }
  }
};
