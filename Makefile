client:
	cd packages/client && yarn dev
server:
	cd packages/server && yarn dev
cloudflared:
	cloudflared tunnel --url http://localhost:3000