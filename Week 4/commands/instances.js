// TODO: implement instances command to list instances for a provider
const DOProvider = require('../providers/do');
const ArvanProvider = require('../providers/arvan');

exports.command = ['instances'];
exports.desc = 'List all servers in a table';

exports.builder = yargs => {
    yargs.options({
        provider: {
            describe: 'Set the cloud-instance provider to use',
            demand: false,
            type: 'string',
            default: 'arvan'
        },
        region: {
            describe: 'The region to list VMs in',
            demand: false,
            type: 'string',
            default: 'ir-thr-ba1'
        }
    });
};

exports.handler = async argv => {
    let { provider, region } = argv;

    try {
        if (provider !== 'arvan') {
            throw new Error(`The provider ${provider} is not supported yet.`);
        }
        const arvanProvider = new ArvanProvider({ token: process.env.ARVAN_TOKEN });
        const servers = await arvanProvider.listInstances(region);
        if (!servers.length) {
            console.log('No servers found.');
            return;
        }

        // Print the servers in a table format
        console.table(
            servers.map(server => ({
                ID: server.id,
                IP: server.ip || '-',
                Name: server.name,
                Status: server.status,
            })));
    } catch (error) {
        console.log(error.message);
    }
};