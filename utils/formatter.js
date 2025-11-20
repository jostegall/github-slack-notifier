
function formatPushEvent(payload) {
    // Destructure to get the parts we need
    const { repository, pusher, commits, ref, compare} = payload;

    // Extract branch name
    const branch = ref.split('/').pop();

    // Get first 3 commits
    const commitList = commits.slice(0, 30).map(commit => {
        // Extract just the first line of the commit message
        const message = commit.message.split('\n')[0];
        return `• ${message}`;
    }).join('\n');
    
    return {
        text: `New push to ${repository.name}`, // Fallback text
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `🔨 *New Push to ${repository.name}*\n*${pusher.name}* pushed ${commits.length} commit(s) to \`${branch}\``
                }
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: commitList
                }
            },
            {
                type: "actions",
                text: {
                    type: "plain_text",
                    text: "View Commits"
                },
                url: compare
            }
        ]
    };
};

function formatPullEvent(payload) {
    // Destructure to get the parts we need
    const { action, pull_request, repository } = payload;
    const { title, user, html_url, merged } = pull_request;

    const emojiMap = {
        'closed': '❌',
        'opened': '🎉',
        'reopened': '🔄'
    };

    // Determine the emoji based on action
    const emoji = action === 'closed' && pull_request.merged 
        ? '✅' 
        : emojiMap[action] || '📝';

    // Determine the actionText based on action
    const actionText = action === 'closed' && merged 
        ? 'merged a pull request' 
        : `${action} a pull request`;
    return {
        text: `${emoji} Pull Request ${action}`, // Fallback text
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `${emoji} *Pull Request ${action}*\n\n*${user.login}* ${actionText} in *${repository.name}*\n\n*${title}*`
                }
            },
            {
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "View Pull Request"
                        },
                        url: html_url
                    }    
                ]
            }
        ]
    };
};

function formatIssueEvent(payload) {
    return;
};

module.exports = {
    formatPushEvent,
    formatPullEvent,
};