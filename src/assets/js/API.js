// const apiRoot = 'http://localhost/learnPHP/vueCMS/api'
const apiRoot = 'http://localhost/vue/vueCMS/api'
export default {
  getRecentPosts: apiRoot + '/post/getRecentPosts.php',
  getTags: apiRoot + '/tag/getTags.php',
  delPosts: apiRoot + '/post/delPosts.php',
  getPosts: apiRoot + '/post/getPosts.php',
  editPost: apiRoot + '/post/editPost.php',
  addPost: apiRoot + '/post/addPost.php',
  getPost: apiRoot + '/post/getPost.php',
  addTag: apiRoot + '/tag/addTag.php',
  delTag: apiRoot + '/tag/delTag.php'
}
