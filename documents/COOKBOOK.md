```
npm install n8n -g
(move to repo folder)
npm installN
npm run build
npm link
cd ~/.n8n
mkdir custom
cd custom
npm init
npm link n8n-nodes-custom
n8n start
```

```shell
node .scripts/publish-pkg.js --public
```

```shell
cd /home/$USER/projects/personal/n8n/nodes/published/n8n-nodes-ai
rm -rf dist
rm -rf ~/.n8n/custom/node_modules/n8n-nodes-ai
cd /home/$USER/projects/personal/n8n/nodes/published/n8n-nodes-ai
npm run build
npm link
cd ~/.n8n/custom
npm link n8n-nodes-ai
cd /home/$USER/projects/personal/n8n/nodes/published/n8n-nodes-ai
```

```shell
cd /home/$USER/projects/personal/n8n/nodes/published/n8n-nodes-ai
npm run build
```

# Notes

volta pin node@20.8.1
