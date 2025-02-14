document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id');

  function getCourseDetails(id) {
    const courses = [
      {
        id: "html_basics",
        title: "HTML Basics",
        description: "Introduction to HTML, covering basic tags, elements, and structure.",
        details: [
          "Understanding HTML Document Structure",
          "Basic HTML Tags",
          "Creating Forms in HTML",
          "HTML5 Semantic Elements"
        ]
      },
      {
        id: "css_fundamentals",
        title: "CSS Fundamentals",
        description: "Advanced CSS techniques including flexbox, grid, and animations.",
        details: [
          "CSS Basics and Syntax",
          "Selectors and Specificity",
          "Flexbox Layout",
          "Grid Layout",
          "CSS Animations"
        ]
      },
      {
        id: "js_essentials",
        title: "JavaScript Essentials",
        description: "Learn the basics of JavaScript, including variables, functions, and events.",
        details: [
          "JavaScript Syntax and Basics",
          "Working with the DOM",
          "Event Handling",
          "Functions and Scope",
          "Asynchronous JavaScript"
        ]
      },
      {
        id: "python_programming",
        title: "Python Programming",
        description: "Beginner to advanced Python programming, including data structures and OOP.",
        details: [
          "Python Basics",
          "Data Structures in Python",
          "Object-Oriented Programming",
          "Modules and Packages",
          "Error Handling and Exceptions"
        ]
      },
      {
        id: "data_science_python",
        title: "Data Science with Python",
        description: "Learn data science using Python, covering libraries like pandas and NumPy.",
        details: [
          "Introduction to Data Science",
          "Working with Pandas",
          "Data Visualization with Matplotlib",
          "Machine Learning with scikit-learn",
          "Data Cleaning and Preprocessing"
        ]
      },
      {
        id: "fullstack_development",
        title: "Fullstack Development",
        description: "Become a fullstack developer with both frontend and backend technologies.",
        details: [
          "Introduction to Fullstack Development",
          "Frontend with React",
          "Backend with Node.js",
          "Database Integration",
          "Deploying Applications"
        ]
      }
    ];

    return courses.find(course => course.id === id);
  }

  const course = getCourseDetails(courseId);
  if (course) {
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-description').textContent = course.description;

    const detailsList = document.getElementById('course-details');
    course.details.forEach(detail => {
      const li = document.createElement('li');
      li.textContent = detail;
      detailsList.appendChild(li);
    });

    document.getElementById('back-button').addEventListener('click', function () {
      window.history.back();
    });
  } else {
    alert('Course not found.');
    window.history.back();
  }
});