const Users = require("../users/user_models.js");

module.exports = server => {
  server.get("/api/users", users);
  server.get("/api/users/:id", userById);
  server.get("/api/users/:id/experiences_attending", usersAttendingExperiences);
  server.put("/api/users/:id", updateUser);
  server.post("/api/experiences/attend", addUsersAttendingExperiences);
  server.delete("/api/users/:id", deleteUser);
  server.delete(
    "/api/users/:id/experiences_attending",
    deleteAttendingExperience
  );
};

///// GET USERS /////
function users(req, res) {
  let user = req.body;
  Users.getUsers(user)
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error getting users" });
    });
}

////GET USER BY ID /////
function userById(req, res) {
  const id = req.params.id;
  Users.getUserById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Sorry, but something went wrong while getting that user profile"
      });
    });
}

///// DELETE USER /////
function deleteUser(req, res) {
  const id = req.params.id;
  Users.deleteUser(id)
    .then(deleted => {
      res
        .status(200)
        .json({ message: `${deleted} successfully user was deleted.` });
    })
    .catch(err => {
      res.status(500).json(err, {
        message: "Sorry, but something went wrong while deleting that user"
      });
    });
}

/////UPDATE USER //////
function updateUser(req, res) {
  const id = req.params.id;
  const changes = req.body;
  // const { title, date, description } = req.body;
  // if (!username || !password || !description) {
  //   res
  //     .status(400)
  //     .json({ message: "Experiences require a title, date, and location." });
  // } else {
  Users.editUser(id, changes)
    .then(updatedUser => {
      res.status(201).json({
        message: `Your profile has been successfully updated`
      });
    })
    .catch(err => {
      res.status(500).json({
        message: `Sorry, but something went wrong while updating that profile`
      });
    });
  // }
}

///// GET USERS ATTENDING EXPERIENCES //////
function usersAttendingExperiences(req, res) {
  const id = req.params.id;
  Users.getUsersAttendingExperiences(id)
    .then(event => {
      // console.log("event:", event);
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json({
        message: `Error getting users attending experiences`
      });
    });
}

///// ADDS USER ATTENDING EXPERIENCES /////
function addUsersAttendingExperiences(req, res) {
  const attend = req.body;
  Users.addUsersAttendingExperiences(attend)
    .then(event => {
      console.log("experience:", attend);
      res.status(200).json({
        message: `You have successfully registered for this experience! See you there!`
      });
    })
    .catch(err => {
      res.status(500).json({
        message: `Sorry, there was an error registering for the experience`
      });
    });
}

///// DELETE ATTENDING /////
function deleteAttendingExperience(req, res) {
  const notAttend = req.body;

  Users.deleteUsersAttendingExperiences(notAttend)
    .then(deleted => {
      console.log("experience?:", deleted);
      res
        .status(200)
        .json({ message: `You are no longer attending this experience.` });
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Sorry, but something went wrong while deleting that experience."
      });
    });
}
