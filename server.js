'use strict';

const Hapi = require('@hapi/hapi');
const { Unkey, verifyKey } = require('@unkey/api');
require('dotenv').config();

// Initialize Unkey with root key
const unkey = new Unkey({
    rootKey: process.env.UNKEY_ROOT_KEY,
});

// create the hapi server
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // Public route - no protection
    server.route({
        method: 'GET',
        path: '/public',
        handler: (request, h) => {
            return { message: 'This is a public route.' };
        },
    });

    // Protected route - secured by Unkey
    server.route({
        method: 'GET',
        path: '/protected',
        options: {
            pre: [
                {
                    method: async (request, h) => {
                        const authorization = request.headers.authorization;

                        if (!authorization) {
                            return h.response({ error: 'Missing authorization header' }).code(401).takeover();
                        }

                        try {
                            // Extract the token from the Authorization header
                            const token = authorization.replace('Bearer ', '');

                            // Verify the key using Unkey
                            const { result, error } = await verifyKey(token);

                            if (error) {
                                console.error(error.message);
                                return h.response({ error: 'Invalid token' }).code(401).takeover();
                            }

                            if (!result.valid) {
                                return h.response({ error: 'Invalid or expired token' }).code(401).takeover();
                            }

                        } catch (err) {
                            console.error(err.message);
                            return h.response({ error: 'Internal server error' }).code(500).takeover();
                        }

                        return h.continue;
                    },
                },
            ],
        },
        handler: (request, h) => {
            return { message: 'This is a protected route, secured by Unkey.' };
        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();