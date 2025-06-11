
const ghpages = require('gh-pages');

ghpages.publish('dist', {
  branch: 'gh-pages',
  repo: 'https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git', // Update this with your repo
  message: 'Deploy to GitHub Pages'
}, (err) => {
  if (err) {
    console.error('Deployment failed:', err);
  } else {
    console.log('Successfully deployed to GitHub Pages!');
  }
});
