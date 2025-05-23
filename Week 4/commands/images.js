// TODO 4: implement the images command, which should list the images available to you.
//         If you're not sure how to get started, take a look at regions command in commands/regions.js.
const DOProvider = require('../providers/arvan');
const ArvanProvider = require('../providers/arvan');

exports.command = ['images'];
exports.desc = 'List the available images from DigitalOcean';

exports.builder = yargs => {
    yargs.options({
        provider: {
            describe: 'Set the cloud-instance provider to use',
            demand: false,
            type: 'string',
            default: 'arvan'
        },
        region:{
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
        console.log('Fetching available images...');
        const images = await arvanProvider.listImages(region);

        console.table(
            images.map(image => ({
                ID: image.id,
                Name: image.name,
                ImageVersion: image.image_version,
            }))
        );
    } catch (error) {
        console.error(error.message);
    }
};
