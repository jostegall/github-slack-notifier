const axios = require('axios');

// Test push event
async function testPushEvent() {
    console.log('Testing push event...');
    
    const payload = {
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
                message: 'Update README with new instructions',
                url: 'https://github.com/myuser/test-repo/commit/def456'
            }
        ],
        compare: 'https://github.com/myuser/test-repo/compare/abc...def'
    };
    
    try {
        const response = await axios.post('http://localhost:3000/webhook/github', payload, {
            headers: {
                'X-GitHub-Event': 'push',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Push event test passed');
        console.log('Response:', response.data);
    } catch (error) {
        console.error('❌ Push event test failed:', error.message);
    }
}

// Test pull request event
async function testPullRequestEvent() {
    console.log('\nTesting pull request event...');
    
    const payload = {
        action: 'opened',
        pull_request: {
            title: 'Add new feature: dark mode',
            user: {
                login: 'jane_doe'
            },
            html_url: 'https://github.com/myuser/test-repo/pull/42',
            merged: false
        },
        repository: {
            name: 'test-repo'
        }
    };
    
    try {
        const response = await axios.post('http://localhost:3000/webhook/github', payload, {
            headers: {
                'X-GitHub-Event': 'pull_request',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Pull request event test passed');
        console.log('Response:', response.data);
    } catch (error) {
        console.error('❌ Pull request event test failed:', error.message);
    }
}

// Test issues event
async function testIssuesEvent() {
    console.log('\nTesting issues event...');
    
    const payload = {
        action: 'opened',
        issue: {
            number: 123,
            title: 'Bug: Login button not working',
            user: {
                login: 'alice'
            },
            html_url: 'https://github.com/myuser/test-repo/issues/123'
        },
        repository: {
            name: 'test-repo'
        }
    };
    
    try {
        const response = await axios.post('http://localhost:3000/webhook/github', payload, {
            headers: {
                'X-GitHub-Event': 'issues',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Issues event test passed');
        console.log('Response:', response.data);
    } catch (error) {
        console.error('❌ Issues event test failed:', error.message);
    }
}

// Run all tests
async function runTests() {
    await testPushEvent();
    await testPullRequestEvent();
    await testIssuesEvent();
    console.log('\n✅ All tests complete! Check your Slack channel for messages.');
}

runTests();