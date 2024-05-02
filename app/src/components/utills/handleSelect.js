const handleSelect = (setActivity, setSuggestedActivityNames) => (event) => {
    const activity = event.target.value;
    setActivity(activity);
  let newSuggestedActivityNames = [];

  switch (activity) {
      case "sleep":
          newSuggestedActivityNames = ["Nap", "Rest", "Doze"];
          break;
      case "physical":
          newSuggestedActivityNames = ["Run", "Swim", "Bike"];
          break;
      case "focus":
          newSuggestedActivityNames = [
              "Working on project",
              "Solving a puzzle",
              "Reading a book",
              "Learning a new skill",
          ];
          break;
      case "play":
          newSuggestedActivityNames = [
              "Playing chess",
              "",
              "Playing guitar",
              "Painting",
          ];
          break;
      case "timein":
          newSuggestedActivityNames = [
              "Journaling",
              "Meditation",
              "Completing a daily log of routines",
          ];
          break;
      case "downtime":
          newSuggestedActivityNames = [
              "Taking a leisurely walk",
              "Listening to music or podcasts",
              "Thinking and reflecting",
              "Daydreaming",
          ];
          break;
      case "connecting":
          newSuggestedActivityNames = [
              "Spending time with family",
              "Sharing a meal with friends",
          ];
          break;
      default:
          newSuggestedActivityNames = [];
  }

  setSuggestedActivityNames(newSuggestedActivityNames);
};

export default handleSelect;