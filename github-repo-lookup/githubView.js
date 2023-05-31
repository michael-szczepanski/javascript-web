class GithubView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    const submitButtonEl = document.querySelector('#submit-button');
    const repoInputEl = document.querySelector('#repo-name-input');

    submitButtonEl.addEventListener('click', () => {
      const repoName = repoInputEl.value;

      this.client.getRepoInfo(repoName, repoData => {
        console.log(repoData);
        this.display(repoData);
      });
    });
  }

  display(repoData) {
    const repoNameEl = document.querySelector('#repo-name');
    const repoDescEl = document.querySelector('#repo-description');
    const repoImgEl = document.querySelector('#repo-image');
    repoNameEl.append(repoData.full_name);
    repoDescEl.append(repoData.description);
    repoImgEl.src = repoData.organization.avatar_url;
  }
}

module.exports = GithubView;