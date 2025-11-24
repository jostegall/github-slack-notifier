# GitHub to Slack Notifier

Real-time GitHub event notifications delivered to Slack with rich formatting and secure webhook verification.

---

## Features

- Real-time notifications for GitHub push, pull request, and issue events
- Rich Slack messages with interactive buttons using Block Kit
- Secure verification via HMAC-SHA256 cryptographic signatures
- Production-ready with error handling, logging, and auto-deployment

---

## Demo

**Push Notification**
```
🔨 New Push to my-repo
john_doe pushed 3 commit(s) to main

- Fix authentication bug
- Update README
- Add tests

[View Commits]
```

**Pull Request Merged**
```
✅ Pull Request closed
jane_doe merged a pull request in my-repo

Add dark mode feature

[View Pull Request]
```

---

## Quick Start

### Prerequisites
- Node.js v14+
- Slack workspace
- GitHub repository

### Setup

**1. Clone and install**
```bash
git clone https://github.com/yourusername/github-slack-notifier.git
cd github-slack-notifier
npm install
```

**2. Configure environment**
```bash
cp .env.example .env
```

Edit `.env`:
```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
WEBHOOK_SECRET=your_random_secret_here
PORT=3000
```

Generate a secure secret:
```bash
openssl rand -hex 32
```

**3. Run locally**
```bash
npm run dev
```

### Deploy to Railway

1. Push code to GitHub
2. Go to railway.app → New Project → Deploy from GitHub
3. Add environment variables in Railway dashboard
4. Copy your Railway URL

### Configure GitHub Webhook

1. Repository → Settings → Webhooks → Add webhook
2. Payload URL: `https://your-app.up.railway.app/webhook/github`
3. Content type: `application/json`
4. Secret: (same as WEBHOOK_SECRET)
5. Events: Pushes, Pull requests, Issues

---

## Architecture
```
GitHub Event → Webhook POST → Verify Signature → Parse Event → Format Message → Send to Slack
```

**Tech Stack:** Node.js, Express.js, Axios, Slack/GitHub APIs, Railway

---

## Project Structure
```
github-slack-notifier/
├── routes/
│   └── webhook.js          # Webhook handler & signature verification
├── services/
│   └── slackService.js     # Slack API integration
├── utils/
│   └── formatters.js       # Event formatters
├── server.js               # Express setup
└── package.json
```

---

## Security

- HMAC-SHA256 signature verification authenticates all webhooks
- Timing-safe comparison prevents timing attacks
- Environment variables for secrets management
- Input validation on all endpoints

---

## Testing
```bash
# Test locally
node test-webhook.js

# Check health endpoint
curl https://your-app.up.railway.app/health

# View logs
Railway Dashboard → Your Service → Logs
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Invalid signature | Ensure WEBHOOK_SECRET matches in Railway and GitHub |
| No Slack messages | Verify SLACK_WEBHOOK_URL is correct |
| Webhook not received | Check Railway logs and GitHub Recent Deliveries |

---

## Future Enhancements

- Support for more GitHub events (releases, comments, stars)
- Multiple Slack channels for different event types
- Web dashboard for configuration
- Event history and analytics

---

## What I Learned

- Webhook architecture and event-driven systems
- Cryptographic signature verification (HMAC-SHA256)
- Production deployment with CI/CD
- RESTful API design and error handling
- Third-party API integration (GitHub, Slack)

---

## Author

**Your Name**

- GitHub: [@jostegall](https://github.com/jostegall)
- LinkedIn: [Joseph Stegall](https://www.linkedin.com/in/josteg/)

---

## License

MIT License - see LICENSE file for details.

---
