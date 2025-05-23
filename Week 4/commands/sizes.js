// TODO 5: implement the size command, which should list the sizes available to you.
//         If you're not sure how to get started, take a look at regions command in commands/regions.js.
const DOProvider = require('../providers/arvan');
const ArvanProvider = require('../providers/arvan');

exports.command = ['sizes'];
exports.desc = 'List the available sizes';

exports.builder = yargs => {
    yargs.options({
        provider: {
            describe: 'Set the cloud-instance provider to use',
            demand: false,
            type: 'string',
            default: 'arvan',
        },
        region: {
            describe: 'Set the cloud-instance region to use',
            demand: false,
            type: 'string',
            default: 'ir-thr-ba1',
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
        console.log('Fetching available sizes...');
        const sizes = await arvanProvider.listSizes(region);

        console.log(sizes)
        console.table(
            sizes.map(size => ({
                ID: size.id,
                Name: size.name,
                Memory: `${size.memory} GB`,
                Disk: `${size.disk} GB`,
                Price: `${size.price_per_month} Rial`,
                AvailabeZone: size.availabilityZone,
            }))
        );
    } catch (error) {
        console.error(error.message);
    }
};
