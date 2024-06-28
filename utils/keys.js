const getKey = (key) => {
  switch (key) {
    case "TOXICITY":
      return "toxicity";
    case "SEVERE_TOXICITY":
      return "severeToxisity";
    case "IDENTITY_ATTACK":
      return "identityAttack";
    case "INSULT":
      return "insult";
    case "PROFANITY":
      return "profanity";
    case "THREAT":
      return "threat";
  }
};

exports.getKey = getKey;
