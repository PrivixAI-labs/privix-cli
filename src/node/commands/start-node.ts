import { spawn } from 'child_process';

// Start the chain server
export function startServer(chain : string): void {
  try {
    // Start the chain server
    let  chainServerCommand;

     if (chain === 'mainnet' || chain === 'main' || chain === 'm') {
      chainServerCommand = './Privix-node server --data-dir=data --chain mainnet.json --libp2p 0.0.0.0:10001 --nat 0.0.0.0 --jsonrpc 0.0.0.0:8545 --seal --block-gas-target 5000000000';
        } else if (chain === 'testnet' || chain === 'test'|| chain === 't') {
          chainServerCommand = './Privix-node server --data-dir=data --chain testnet.json --libp2p 0.0.0.0:10001 --nat 0.0.0.0 --jsonrpc 0.0.0.0:8545 --seal --block-gas-target 5000000000';
        }else new Error("Please provide a valid chain name (mainnet or testnet)");
          

    console.log('Starting chain server...');
    const chainServerProcess = spawn('sh', ['-c', chainServerCommand as string]);

    chainServerProcess.stdout.on('data', (data: Buffer) => {
      console.log(`chain server stdout: ${data.toString()}`);
    });

    chainServerProcess.stderr.on('data', (data: Buffer) => {
      console.error(`chain server stderr: ${data.toString()}`);
    });

    chainServerProcess.on('close', (code: number) => {
      if (code === 0) {
        console.log('chain server started successfully.');
      } else {
        console.error(`chain server process exited with code ${code}.`);
      }
    });
  } catch (error) {
    console.error('An error occurred:', (error as Error).message);
  }
}


