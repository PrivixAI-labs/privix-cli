wget https://github.com/PrivixAI-labs/privix-cli/releases/download/v1.0.0/privix-cli

sudo chmod +x privix-cli

#sudo mv privix-cli /usr/bin
./privix-cli version
./privix-cli node  install-node
./privix-cli node init-node 
./privix-cli node get-genesis