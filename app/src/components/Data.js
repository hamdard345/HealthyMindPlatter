//navbar related data if there is a token which means the user is logged in it will not show the sign up tab
export const pages = [
  {
    label: "Add Activity",
    path: "#/track"
  },
  {
    label: "All Activities",
    path: "#/allactivity"
  },
  {
    label:"Report",
    path:"#/report"
  },
  ...(localStorage.getItem('token') ? [] : [{
    label:"Sing up",
    path:"#/signup"
  }])
];