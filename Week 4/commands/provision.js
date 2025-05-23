const DOProvider = require('../providers/arvan');
const ArvanProvider = require('../providers/arvan');

exports.command = ['provision'];
exports.desc = 'Provisio a new server';

exports.builder = yargs => {
    yargs.example('$0 provision --provider do --name myvm --region nyc1 --size s-1vcpu-1gb --image ubuntu-18-04-x64');
    yargs.example('$0 provision --provider aws --name myvm --region us-east-1 --size t2.micro --image ami-0c55b159cbfafe1f0');

    yargs.options({
        provider: {
            describe: 'Set the cloud-instance provider to use',
            demand: false,
            type: 'string',
            default: 'arvan'
        },
        name: {
            describe: 'The name of the VM to create',
            demand: false,
            type: 'string',
            default: 'name'
        },
        region: {
            describe: 'The region to create the VM in',
            demand: false,
            type: 'string',
            default: 'ir-thr-ba1'
        },
        size: {
            describe: 'The size of the VM to create',
            demand: false,
            type: 'string',
            default: 'eco-1-1-0'
        },
        image: {
            describe: 'The image to use for the VM',
            demand: false,
            type: 'string',
            default: '59683076-d980-4110-bee4-83ec4db93f3f'
        }
    });
};

exports.handler = async argv => {
    let { provider, name, region, size, image } = argv;

    try {
        if (provider !== 'arvan') {
            throw new Error(`The provider ${provider} is not supported yet.`);
        }

        // TODO 5: create a new VM using the DigitalOcean provider, and give it a name, region, size, and image
        const arvanProvider = new ArvanProvider({ token: process.env.ARVAN_TOKEN });
        console.log('Provisioning...');
        const server = await arvanProvider.create({ name, region, size, image });
        console.log('Waiting for server IP...');
        setTimeout(() => {
            if (server.ip) {
                console.log(`Server IP address: ${server.ip}`);
                console.log(`VM is ready! Connect via: ssh -i ~/.ssh/id_rsa ubuntu@${server.ip}`);
                console.log('Done!');
            } else {
                console.log('Server IP address not found');
                console.log('Server may not be ready yet.');
            }
        }, 5000);
    } catch (error) {
        console.log(error.message);
    }
};
