let blogs;
let blogObjs;

whenLoaded = () => {
  fetch("./blogIndex.json")
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

      let splitURL = location.href.split("?");
      console.log(splitURL);
      if (splitURL[1].substring(0, 5) == "blog=") {
        let found = false;
        for (let i = 0; i < blogObjs.length; i++) {
          if (blogObjs[i].id == splitURL[1].substring(5)) {
            blogObjs[i].addBlogTo("#blogs", {
              class: "blog",
            });
            found = true;
            break;
          }
        }

        if (!found) {
          $("#blogs").append("<p>The requested blog was not found</p>")
        }

        $("#prev").attr("href", "?blog=" + ((splitURL[1].substring(5) > 0 && found) ? (splitURL[1].substring(5) - 1) : splitURL[1].substring(5)));
        $("#next").attr("href", "?blog=" + ((splitURL[1].substring(5) < blogObjs.length - 1 && found) ? (parseInt(splitURL[1].substring(5)) + 1) : splitURL[1].substring(5)));

      }
      console.log("Finished");
    })
    .catch(err => {
      let errorMessage = "Failed to get blogs. " + err;
      $("#main").append("<p>" + errorMessage + "</p>");
    });
};
