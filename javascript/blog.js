let blogs;
let blogObjs;

fetch("./blog/blogIndex.json")
  .then(response => {
    return response.json();
  })
  .then(data => {blogs = data.blogs;})
  .then(() => {
	blogObjs=[];
	for(blog in blogs){
		blogObjs.push(new Blog(blogs[blog]));
	}

	for(var i = blogObjs.length-3; i < blogObjs.length; i++){
		blogObjs[i].addBlogTo("#blogs", {class:"blog", id:"blogID"+(blogObjs.length-i)});
	}
  })
  .catch(
		  err => {
			  alert(err);
			  }
		);

class Blog {
  constructor(jsonData) {
    this.id = jsonData.id;
    this.json = jsonData;
    this.title = jsonData.title;
    this.txtFilePath = jsonData.text;
    this.images = jsonData.images;
    this.date = new Date(jsonData.date);
  }

  async getText(textPath) {
    let textRequest = await fetch(textPath);
    let text = await textRequest.text();
    return text;
  }

  async createHTMLBlog(divModifiers) {
    return this.getText(this.txtFilePath).then(result => {
      let tempDiv = $("<div></div>", divModifiers);
      tempDiv.append($("<h4></h4>").text(this.title));
      let pTag = $("<p></p>").text(result);
      tempDiv.append(pTag);
      return tempDiv;
    });
  }

  addBlogTo(parentElement, divModifiers) {
    this.createHTMLBlog(divModifiers).then(newDiv => {
      $(parentElement).append(newDiv);
    });
  }
}
