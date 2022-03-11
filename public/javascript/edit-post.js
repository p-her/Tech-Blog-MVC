
async function editFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const post_content = document.querySelector('#post-content').value.trim();
    const str = window.location.toString().split('/');
    const id= str.at(-1);


    
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
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

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);