// script.js

const blogForm = document.getElementById('blog-form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postsContainer = document.getElementById('posts-container');

let blogPosts = [];

// Load from localStorage
function loadPosts() {
  const stored = localStorage.getItem('blogPosts');
  if (stored) {
    try {
      blogPosts = JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored posts', e);
      blogPosts = [];
    }
  }
}

// Save to localStorage
function savePosts() {
  localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
}

// Render posts on page
function renderPosts() {
  postsContainer.innerHTML = '';

  if (blogPosts.length === 0) {
    postsContainer.innerHTML = '<p>No blog posts yet.</p>';
    return;
  }

  blogPosts.forEach((post, index) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');

    const h3 = document.createElement('h3');
    h3.textContent = post.title;

    const p = document.createElement('p');
    p.textContent = post.content;

    const actions = document.createElement('div');
    actions.classList.add('post-actions');
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
      deletePost(index);
    });
    actions.appendChild(delBtn);

    postEl.appendChild(h3);
    postEl.appendChild(p);
    postEl.appendChild(actions);

    postsContainer.appendChild(postEl);
  });
}

// Handle form submit
blogForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title || !content) {
    alert('Title and content both required.');
    return;
  }

  const newPost = {
    title,
    content,
    createdAt: new Date().toISOString()
  };

  blogPosts.unshift(newPost);  // add to front
  savePosts();
  renderPosts();

  // Clear form
  titleInput.value = '';
  contentInput.value = '';
});

// Delete post
function deletePost(index) {
  if (!confirm('Are you sure you want to delete this post?')) return;
  blogPosts.splice(index, 1);
  savePosts();
  renderPosts();
}

// Initial load
loadPosts();
renderPosts();
