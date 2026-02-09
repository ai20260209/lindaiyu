const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const WORK_DIR = '/home/ubuntu/';

// Step 1: Initialize git repository
try {
    process.chdir(WORK_DIR);
    const result = execSync('git init', { encoding: 'utf8', stdio: 'pipe' });
    console.log('Git init result:', result);
    console.log('Step 1 completed: Git repository initialized');
} catch (error) {
    console.error('Error during git init:', error.message);
    if (error.stderr) console.error('stderr:', error.stderr);
    process.exit(1);
}

// Step 2: Create README.md
const readmeContent = `# Lindaiyu

This repository contains the backup of local workspace files.

## Files

- **AGENTS.md** - Agent configuration and definitions
- **BOOTSTRAP.md** - Bootstrap instructions
- **IDENTITY.md** - Identity configuration
- **MEMORY.md** - Memory storage
- **SOUL.md** - Core soul/essence configuration
- **TOOLS.md** - Available tools documentation
- **USER.md** - User information
- **memory/** - Memory directory containing additional data

## Backup Date

Backup created on: ${new Date().toISOString()}
`;

try {
    fs.writeFileSync(path.join(WORK_DIR, 'README.md'), readmeContent);
    console.log('Step 2 completed: README.md created');
} catch (error) {
    console.error('Error creating README.md:', error.message);
    process.exit(1);
}

// Step 3: Git add all files
try {
    const result = execSync('git add .', { encoding: 'utf8', stdio: 'pipe' });
    console.log('Git add result:', result || 'All files added');
    console.log('Step 3 completed: All files added to staging area');
} catch (error) {
    console.error('Error during git add:', error.message);
    process.exit(1);
}

// Step 4: Git commit
try {
    const result = execSync('git commit -m "Initial commit: Backup workspace files"', { encoding: 'utf8', stdio: 'pipe' });
    console.log('Git commit result:', result);
    console.log('Step 4 completed: Changes committed');
} catch (error) {
    console.error('Error during git commit:', error.message);
    if (error.stderr) console.error('stderr:', error.stderr);
    process.exit(1);
}

// Step 5: Add remote origin
try {
    // Check if remote already exists
    try {
        execSync('git remote get-url origin', { encoding: 'utf8', stdio: 'pipe' });
        console.log('Remote origin already exists, removing...');
        execSync('git remote remove origin', { encoding: 'utf8', stdio: 'pipe' });
    } catch (e) {
        // Remote doesn't exist, that's fine
    }
    
    const result = execSync('git remote add origin https://github.com/ai20260209/lindaiyu.git', { encoding: 'utf8', stdio: 'pipe' });
    console.log('Git remote add result:', result || 'Remote added');
    console.log('Step 5 completed: Remote repository linked');
} catch (error) {
    console.error('Error during git remote add:', error.message);
    process.exit(1);
}

// Step 6: Push to main branch
try {
    // Ensure we're on main branch
    try {
        execSync('git branch -M main', { encoding: 'utf8', stdio: 'pipe' });
    } catch (e) {
        // Branch might already be main
    }
    
    const result = execSync('git push -u origin main', { encoding: 'utf8', stdio: 'pipe' });
    console.log('Git push result:', result);
    console.log('Step 6 completed: Successfully pushed to remote main branch');
} catch (error) {
    console.error('Error during git push:', error.message);
    if (error.stderr) console.error('stderr:', error.stderr);
    console.log('\nNote: Push may fail if authentication is required.');
    console.log('Please ensure you have configured Git credentials or SSH keys.');
    process.exit(1);
}

console.log('\n=== All steps completed successfully! ===');
