const endpoint = 'https://api.digitalocean.com/v2';
require('dotenv').config();
const Provider = require('./provider');

class DOProvider extends Provider {
  constructor(config={token,}) {
    super(config);
  }
  
  async listRegions() {
    // TODO 3: Get a list of regions
    try {
      const response = await fetch(`${endpoint}/regions`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.token}`,
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get regions: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.regions; 
    }
    catch (error) {
      console.log('Failed to get regions', error.message);
      throw error;
    }
  }

  async listImages() {
    // TODO 4: Get a list of images
  }

  async listSizes() {
    // TODO 5: Get a list of sizes
  }

  async create() {
    // TODO 6: Create a droplet

    // TODO 8: Update your implementation to set the ssh key for the droplet when it's created. Add all the ssh keys in your account to the droplet.

  }

  async getSSHInfo() {
    // Get SSH info for a droplet
    // Print IP for SSH
    // TODO 7: Wait for droplet to be ready, then get its IP and print it
  }

  async delete() {
    // Destroy a droplet
    // TODO: 9: delete the droplet
  }

}

module.exports = DOProvider;
