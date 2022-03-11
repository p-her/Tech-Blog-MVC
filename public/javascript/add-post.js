
const addPost = document.querySelector('#post-btn').addEventListener('click', () => {

    let contentEl = $( `
    <div  class="container">
        <div class="wrapper">
            <div class="title">
                <span>Create New Post</span>
            </div>
            <form class="new-post-form">
                <div class="row">
                    <p><b>Title</b></p>
                    <textarea class="textarea-field" id="post-title" ></textarea>
    
                </div>
                <div class="row">
                    <p><b>Content</b></p>
                    <textarea  class="textarea-field" id="post-content" ></textarea>
    
                </div>
                <div class="submit-btn">
                    <button class="btn" id="create-btn" type="submit">Create</button>
                </div>
            </form>
         
        </div>
        `
    )
 $('.content').append( contentEl);

 document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

})


async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value;
    const post_content = document.querySelector('#post-content').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
}
  
//   document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  