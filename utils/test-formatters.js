const { formatPushEvent, formatPullRequestEvent, formatIssuesEvent } = require('./utils/formatters');

// Test push event
const pushPayload = {
    ref: 'refs/heads/main',
    repository: {
        name: 'test-repo',
        full_name: 'myuser/test-repo'
    },
    pusher: {
        name: 'john_doe'
    },
    commits: [
        {
            id: 'abc123',
            message: 'Fix critical bug in authentication',
            url: 'https://github.com/myuser/test-repo/commit/abc123'
        },
        {
            id: 'def456',
            message: 'Update README',
            url: 'https://github.com/myuser/test-repo/commit/def456'
        }
    ],
    compare: 'https://github.com/myuser/test-repo/compare/abc...def'
};

console.log('=== Push Event ===');
console.log(JSON.stringify(formatPushEvent(pushPayload), null, 2));

// Test pull request event
const prPayload = {
    action: 'opened',
    pull_request: {
        title: 'Add user authentication',
        user: { login: 'jane_doe' },
        html_url: 'https://github.com/myuser/test-repo/pull/42',
        merged: false
    },
    repository: {
        name: 'test-repo'
    }
};

console.log('\n=== PR Opened ===');
console.log(JSON.stringify(formatPullRequestEvent(prPayload), null, 2));

// Test issues event
const issuePayload = {
    action: 'opened',
    issue: {
        number: 123,
        title: 'Bug: Login button not working',
        user: { login: 'alice' },
        html_url: 'https://github.com/myuser/test-repo/issues/123'
    },
    repository: {
        name: 'test-repo'
    }
};

console.log('\n=== Issue Opened ===');
console.log(JSON.stringify(formatIssuesEvent(issuePayload), null, 2));