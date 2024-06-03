// Get the data
var users = [
  {
    profilePic: "./images/img3.jpeg",
    dP: "./images/img3.jpeg",
    name: "Deepika",
    age: 22,
    interests: ["Music", "Travelling", "Painting"],
    bio: "Music enthusiast, painter, and travel lover. Let's explore the world together! 🎶🎨✈️",
    pendingMessage: 4,
    location: "Fathebaad, Hisar",
    isFriend: null,
  },
  {
    profilePic: "./images/img4.jpeg",
    dP: "./images/img4.jpeg",
    name: "Ananya",
    age: 23,
    interests: ["Reading", "Cooking", "Dancing"],
    bio: "Bookworm, chef at heart, and dance lover. Let's create beautiful moments together! 📚🍳💃",
    pendingMessage: 2,
    location: "Sirsa, Haryana",
    isFriend: null,
  },
  {
    profilePic: "./images/img5.jpeg",
    dP: "./images/img5.jpeg",
    name: "Riya",
    age: 21,
    interests: ["Fitness", "Photography", "Traveling"],
    bio: "Fitness fanatic, shutterbug, and travel enthusiast. Let's capture memories and stay fit! 🏋️📸🌍",
    pendingMessage: 6,
    location: "Delhi, India",
    isFriend: null,
  },
  {
    profilePic: "./images/img6.jpeg",
    dP: "./images/img6.jpeg",
    name: "Meera",
    age: 24,
    interests: ["Gardening", "Yoga", "Cooking"],
    bio: "Gardener, yogi, and culinary artist. Let's grow, relax, and savor flavors together! 🌱🧘‍♀️🍲",
    pendingMessage: 3,
    location: "Hisar, Haryana",
    isFriend: null,
  },
];

function select(elem) {
  return document.querySelector(elem);
}

let curr = 0;
let isAnimating = false;

function setData(index) {
    select(".profile-img img").src = users[index].profilePic;
    select(".badge h5").textContent = users[index].pendingMessage;
    select(".address h3").textContent = users[index].location;
    select(".name").textContent = users[index].name;
    select(".age").textContent = users[index].age;
    select(".bio p").textContent = users[index].bio;

    let clutter = ``;
    users[index].interests.forEach((interest) => {
      clutter += `<div class="tag flex gap-2 bg-white/40 px-3 py-1 rounded-full items-center">
                  <i class="text-zinc-700 text-sm ri-bard-fill"></i>
                  <h3 class="text-sm text-zinc-700">${interest}</h3>
                </div>`;
    });
    select(".tags").innerHTML = clutter;
  
}

(function setInitial() {
  select('.main-card img').src = users[curr].dP;
  select('.incoming-card img').src = users[curr + 1]?.dP;
  setData(curr);
  curr = 2;
})();

function imgChange() {
  if (!isAnimating) {
    isAnimating = true;
      let tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
          let main = select(".main-card");
          let incoming = select(".incoming-card");

          incoming.classList.remove("z-[2]");
          incoming.classList.add("z-[3]");

          incoming.classList.remove("incoming-card");

          main.classList.remove("z-[3]");
          main.classList.add("z-[2]");

          gsap.set(main, {
            scale: 1,
            opacity: 1,
          });

          if (curr === users.length) curr = 0;
          select(".main-card img").src = users[curr].dP;
          curr++;
          main.classList.remove("main-card");
          incoming.classList.add("main-card");
          main.classList.add("incoming-card");
        },
      });

      tl.to(
        ".main-card",
        {
          scale: 1.1,
          opacity: 0,
          ease: Power2,
          duration: 0.7,
        },
        "a"
      ).from(
        ".incoming-card",
        {
          scale: 1,
          opacity: 0,
          ease: Power2,
          duration: 0.7,
        },
        "a"
      );
  } 
};

let deny = select(".deny");
let accept = select(".accept");

deny.addEventListener("click", () => {
  imgChange();
  setData(curr-1);
            gsap.from(".details .dc", {
              y: "100%",
              opacity: 0,
              stagger: 0.06,
              ease: Power4.easeInOut,
              duration: 1.5,
            });
});
accept.addEventListener("click", () => {
  imgChange();
  setData(curr-1);
            gsap.from(".details .dc", {
              y: "100%",
              opacity: 0,
              stagger: 0.06,
              ease: Power4.easeInOut,
              duration: 1.5,
            });
});

(function containerCreator() {
  document.querySelectorAll('.dc').forEach((elem) => {
    let div = document.createElement('div');
    div.classList.add(`${elem.classList[1]}-container`, 'overflow-hidden');
    div.appendChild(elem);
    select('.details').appendChild(div);
  })
})();

