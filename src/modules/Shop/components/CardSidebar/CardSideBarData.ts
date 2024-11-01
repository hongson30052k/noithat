export const menus = [
  {
    name: "Ghế văn phòng",
    link: "/shop/ghe-van-phong",
    type: "page",
  },
  {
    name: "Ghế giám đốc",
    link: "/shop/ghe-giam-doc",
    type: "page",
    children: [
      {
        name: "Hindi Movies",
        link: "/pages/movies/hindi",
        type: "page",
        children: [
          {
            name: "Action Movies",
            link: "/pages/movies/hindi/action",
            type: "page",
            children: [
              {
                name: "2021",
                link: "/pages/movies/hindi/action/2021",
                type: "page",
              },
            ],
          },
          {
            name: "Romantic Movies",
            link: "/pages/movies/hindi/romantic",
            type: "page",
            children: [
              {
                name: "Adult",
                link: "/pages/movies/hindi/romantic/adult",
                type: "page",
              },
            ],
          },
        ],
      },
      {
        name: "Telugu Movies",
        link: "/pages/movies/telugu",
        type: "page",
        children: [
          {
            name: "Action Movies",
            link: "/pages/movies/telugu/action",
            type: "page",
          },
        ],
      },
    ],
  },
  {
    name: "Bàn làm việc",
    link: "/shop/bon-lam-viec",
    type: "page",
    children: [
      {
        name: "Comedy",
        link: "/pages/series/comedy",
        type: "page",
      },
    ],
  },
  {
    name: "Bàn giám đốc",
    link: "/shop/bon-giam-doc",
    type: "page",
    children: [
      {
        name: "Comedy",
        link: "/pages/series/comedy",
        type: "page",
      },
    ],
  },
  {
    name: "Bàn họp văn phòng",
    link: "/shop/bon-hop-van-phong",
    type: "page",
    children: [
      {
        name: "Comedy",
        link: "/pages/series/comedy",
        type: "page",
      },
    ],
  },
];
