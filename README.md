# DevOps-Week4
## Cloud instance workshop
### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/Karmel-Taj/DevOps-Week4.git
cd cloud-instances
npm install
```

### .env file
Create an ArvanCloud account and create an API Key
Add the API Key to your `.env` file

```env
ARVAN_TOKEN=arvancloud_token
```

### Available Commands
```bash
cloud-instances regions
cloud-instances images
cloud-instances sizes
cloud-instances provision
cloud-instances instances
cloud-instances delete
```

## Screencast
[Video Tutorial](https://drive.google.com/file/d/1TxoGLLWCR6gJV1R0d7ubUrOeXO60ojFW/view?usp=sharing)

## Conceptual Questions

- **1. How do you connect to a server you provisioned on Arvan Cloud? Give example of the command to run.**
```bash
ssh -i ~/.ssh/id_rsa root@<ip-address>
ssh ubuntu@100.101.18.22
```

- **2. If there is a brand new linux environment and you want to be able to ssh to it, what should you do to enable access using your ssh key?**
  > - Generate SSH keys.
  > - Copy the public key to the server's ~/.ssh/ folder or register the key in ArvanCloud manualy.

- **3. What is the difference between a public and private ssh key?**
  > - **Public key**: is shared to servers
  > - **Private key**: stays on your local machine and should not be shared.

- **4. What is the prompt that we see when we run `ssh root@<ip-address>` for the first time? Briefly explain what it means.**
    ```bash
    The authenticity of host '<ip-address> (<ip-address>)' cant be established.
    ED25519 key fingerprint is <fingerprint>
    This key is not known by any other names.
    Are you sure you want to continue connecting (yes/no/[fingerprint])?
    ```
    > This means SSH has not seen this server before and wants to verify its identity.

- **5. How do you wait for 5 seconds in an async js function?**

    ```js
    await new Promise(resolve => setTimeout(resolve, 5000));
    ```

- **6. Assume we are creating a generic REST API for managing servers (think an API for the CLI app you worked with in this hw). Based on convention that you’ve seen so far, what should be the HTTP verb + endpoint for the following actions?**

    | Action                    | HTTP Methds | Endpoint     |
    | ------------------------- | ------------| ------------ |
    | List all servers          | GET         | `/servers`   |
    | Create a new server       | POST        | `/servers`   |
    | Get server with id = 4    | GET         | `/servers/4` |
    | Delete a server with id=4 | DELETE      | `/servers/4` |


- **7. What npm command can we use to install our CLI tool to be accessible by its name instead of node index.js? Show how you would run the list command from workshop, using node and using the installed CLI tool.**
    ```bash
    npm install -g
    node index.js list
    cloud-instances list
    ```

- **8. What was a new feature, challenge, or interesting learning experience that you encountered while doing the homework or classroom exercises?**
  > - ArvanCloud APIs
  > - SSH Keys
  > - CLI and using commands

- **9. Explain the difference between upper and lower directories in an overlay file system.**

  > - **Lower directory**: Original, read-only files.
  > - **Upper directory**: Stores changes (modifications, additions, deletions). When a file is accessed, the system checks the upper layer first—if a change exists, it uses that; otherwise, it retrieves the original from the lower layer.

- **10. What are 3 limitations of the chroot environment used in the Chroot Workshop compared to a Docker container?**
  > - **No Process Isolation** – Chroot only restricts file access, but processes still interact with the host system. Docker fully isolates processes.
  > - **No Networking Control** – Chroot doesn’t provide separate networking environments, while Docker allows custom networks.
  > - **No Resource Management** – Docker manages CPU, memory, and storage limits, but Chroot has no such controls.
