let blogs;
let blogObjs;

fetch("./blog/blogIndex.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    blogs = data.blogs;
  })
  .then(() => {
    blogObjs = [];
    for (blog in blogs) {
      blogObjs.push(new Blog(blogs[blog]));
    }

    for (var i = blogObjs.length - 3; i < blogObjs.length; i++) {
      blogObjs[i].addBlogTo("#blogs", {
        class: "blog",
        id: "blogID" + (blogObjs.length - i)
      });
    }
    console.log("Finished");
  })
  .catch(err => {
// alert(err);
	  alert(err);
	 let pTag = $("<p></p>");
	 pTag.text("Failed to get blogs.");
     $("#blogs").appendChild(pTag);
  });
