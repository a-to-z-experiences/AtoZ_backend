const Experiences = require("../experiences/experiences_models.js");

module.exports = server => {
  server.get("/api/experiences", experiences);
  server.get("/api/experiences/:id", experienceById);
  server.get("/api/users/:id/host_experiences", userHostExperiences);
  server.post("/api/experiences", postExperience);
  server.put("/api/experiences/:id", updateExperience);
  server.delete("/api/experiences/:id", deleteExperience);
};

///// GET EXPERIENCES /////
function experiences(req, res) {
  let experience = req.body;
  Experiences.getExperiences(experience)
    .then(experiences => {
      res.status(200).json({ experiences });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Sorry, Theres been an error getting experiences" });
    });
}

/////GET EXPERIENCES BY ID /////
function experienceById(req, res) {
  const id = req.params.id;
  Experiences.getExperienceById(id)
    .then(experience => {
      res.status(200).json(experience);
    })
    .catch(err => {
      res.status(500).json({
        message: "Sorry, but something went wrong while getting that experience"
      });
    });
}

///// GET HOST EXPERIENCES /////
function userHostExperiences(req, res) {
  const id = req.params.id;

  Experiences.getExperienceWithUserById(id)
    .then(users => {
      Experiences.getExperiences()
        .where({ user_id: id })
        .then(experiences => {
          users.experiences = experiences;
          return res.status(200).json(users);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Sorry, but something went wrong while getting that hosts experiences"
      });
    });
}

///// POST EXPERIENCE /////
function postExperience(req, res) {
  const { title, date, location } = req.body;
  if (!title || !date || !location) {
    res.status(400).json({
      message: "Sorry, all new experiences require a title, date, and location."
    });
  } else {
    Experiences.addExperience(req.body)
      .then(experience => {
        res.status(201).json(experience);
      })
      .catch(err => {
        res.status(500).json({
          message: "Sorry, but something went wrong while added the experience"
        });
      });
  }
}

///// UPDATE EXPERIENCE /////
function updateExperience(req, res) {
  const id = req.params.id;
  const changes = req.body;
  const { title, date, description } = req.body;

  Experiences.editExperience(id, changes)
    .then(updatedExperience => {
      res
        .status(201)
        .json(
          { message: "Your experience has been successfully update" },
          updatedExperience
        );
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Sorry, but something went wrong while updating that experience"
      });
    });
  // }
}

///// DELETE EXPERIENCE /////
function deleteExperience(req, res) {
  const id = req.params.id;
  Experiences.deleteExperience(id)
    .then(deleted => {
      res.status(200).json({ message: `${deleted} experience was deleted.` });
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Sorry, but something went wrong while deleting that experience"
      });
    });
}
