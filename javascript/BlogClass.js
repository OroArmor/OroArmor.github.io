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
      for(image in this.images){
//    	  let img = $("<p></p>");
    	  alert(image);
//    	  img.text(image);
//    	  tempDiv.append(img);
      }
      tempDiv.append(pTag);
      return tempDiv;
    }).catch(err=>{
    	alert(err+". Blog name: "+this.title);
    });
  }

  addBlogTo(parentElement, divModifiers) {
    this.createHTMLBlog(divModifiers).then(newDiv => {
      $(parentElement).append(newDiv);
    });
  }
}
