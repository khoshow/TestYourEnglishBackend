

exports.getPublicUserScore = (req, res) => {
    const username = req.params.username
  
    UserScore.findOne({ username })
      .then((user) => {
      
        res.json(user);
      })
      .catch((err) => {
        console.error("my err",err);
        res.status(500).json({ error: err });
      });
  };