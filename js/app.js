/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const sections = document.querySelectorAll("section");

const navbarList = document.querySelector("#navbar__list");

// Fragment container for list items
const fragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const createNavLink = function (section) {
  // Get Section name from data-* attribute
  const sectioName = section.dataset.nav;

  // Get id
  const sectionId = section.id;

  // Create LI
  const listItem = document.createElement("LI");

  // Create Link
  const navLink = document.createElement("A");

  // Set href attribute, Class & innerContent
  navLink.setAttribute("href", `#${sectionId}`);
  navLink.classList.add("menu__link");
  navLink.innerText = sectioName;

  // Append the link to LI
  listItem.appendChild(navLink);

  // return create LI
  return listItem;
};

const inViewpoint = function (element) {
  // Get window offset top on scrolling
  const windowOffsetTop = window.pageYOffset;

  // Get Element offset top
  const elementOffsetTop = element.offsetTop;

  // Get Element height
  const elementHeight = element.offsetHeight;

  // return true if the half of the element in the viewpoint ( for better UX )
  return elementOffsetTop - elementHeight / 2 <= windowOffsetTop;
};

const removeClassFromSiblings = function (childElement, className) {
  childElement.parentElement
    .querySelectorAll(childElement.nodeName)
    .forEach((sibling) => sibling.classList.remove(className));
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// Build menu
// 01 - Create Links
sections.forEach((section) => {
  const li = createNavLink(section);

  // Append Li to fragment
  fragment.appendChild(li);
});

// 02 - Append created links to DOM
navbarList.appendChild(fragment);

// Scroll to section on link click
// Add listener for each nav link
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // prevent Default ( Which is that we gonna do manually )
    e.preventDefault();

    // Get 'href' from this clicked link and that's the id for target section
    const targetId = this.getAttribute("href");

    // Get the offsetTop of the target section element
    let offsetTop = document.querySelector(targetId).offsetTop;

    // for better UX
    offsetTop -= navbarList.offsetHeight; // Remove nav menu height from offset
    offsetTop -= 50; // Extra

    // Scroll to that offsetTop smoothly
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  });
});

// Set sections as active
document.addEventListener("scroll", function () {
  sections.forEach((section) => {
    // Check if it's on the view point
    if (inViewpoint(section)) {
      // Remove class from section siblings
      removeClassFromSiblings(section, "your-active-class");

      // Add active class to visiable (half visiable) section
      section.classList.add("your-active-class");
    }
  });
});
