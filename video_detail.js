document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('id');

  function getVideoDetails(id) {
    const videos = [
      {
        id: "html_basics_video",
        title: "HTML Basics Tutorial",
        description: "Introduction to HTML, covering basic tags, elements, and structure."
      },
      {
        id: "css_fundamentals_video",
        title: "CSS Fundamentals Tutorial",
        description: "Advanced CSS techniques including flexbox, grid, and animations."
      },
      {
        id: "js_essentials_video",
        title: "JavaScript Essentials Tutorial",
        description: "Learn the basics of JavaScript, including variables, functions, and events."
      },
      {
        id: "python_programming_video",
        title: "Python Programming Tutorial",
        description: "Beginner to advanced Python programming, including data structures and OOP."
      },
      {
        id: "data_science_python_video",
        title: "Data Science with Python Tutorial",
        description: "Learn data science using Python, covering libraries like pandas and NumPy."
      },
      {
        id: "fullstack_development_video",
        title: "Fullstack Development Tutorial",
        description: "Become a fullstack developer with both frontend and backend technologies."
      }
    ];

    return videos.find(video => video.id === id);
  }

  const video = getVideoDetails(videoId);
  if (video) {
    document.getElementById('video-title').textContent = video.title;
    document.getElementById('video-description').textContent = video.description;

    document.getElementById('back-button').addEventListener('click', function () {
      window.history.back();
    });
  } else {
    alert('Video not found.');
    window.history.back();
  }
});