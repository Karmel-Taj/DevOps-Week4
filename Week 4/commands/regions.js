const DOProvider = require('../providers/arvan');
const ArvanProvider = require('../providers/arvan');

exports.command = ['regions'];
exports.desc = 'list the regions available to you';

exports.builder = yargs => {
    yargs.options({
        provider: {
            describe: 'Set the cloud-instance provider to use',
            demand: false,
            type: 'string',
            default: 'arvan',
        }
    });
};

exports.handler = async argv => {
    let { provider } = argv;

    try {
        if (provider !== 'arvan') {
            throw new Error(`The provider ${provider} is not supported yet.`);
        }
        const arvanProvider = new ArvanProvider({ token: process.env.ARVAN_TOKEN });
        console.log('Listing regions...');
        let regions = await arvanProvider.listRegions();
        
        console.table(
            regions.map(region => ({
                Name: `${region.country} - ${region.city}`,
                Slug: region.code
            }))
        );

    } catch (error) {
        console.log(error.message);
    }
};
