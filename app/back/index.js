const fastify = require('fastify')({ logger: true });
const UserAction = require('./UserAction');

let actions = null;

fastify.register(require('fastify-cors'), { 
    origin: '*',
    methods: ['POST']
})

// ROUTING
// REST API
// - handshake (server -> feedback)
//   1. HTTP status codes (200, 400 ...) headers ()
//   2. return { status: '...' }
fastify.post('/api/analytics', async (request, reply) => {
    // HW1: get the real data from {request}
    const userAction = new UserAction('dummy');
    actions.push(userAction)
    console.log(actions);
    return { status: 'ok' } 
})

const start = async () => {
    try {
        await fastify.listen(3001)
        console.log('Server running');

        actions = []
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()