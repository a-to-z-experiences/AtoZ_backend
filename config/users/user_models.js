const db = require("../../database/dbConfig.js");

module.exports = {
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  getUsersAttendingExperiences,
  addUsersAttendingExperiences,
  deleteUsersAttendingExperiences
};

///// USERS /////
function getUsers() {
  return db("users").select(
    "users.id",
    "users.username",
    "users.first_name",
    "users.last_name",
    "users.email",
    "users.city"
  );
}

function getUserById(id) {
  return db("users")
    .where({ id })
    .first()
    .select(
      "users.id",
      "users.username",
      "users.first_name",
      "users.last_name",
      "users.email",
      "users.city"
    );
  // db("experiences")
  //   .where({ "experiences.user_id": id })
  //   .join("users", "users.id", "experiences.user_id")
}

function editUser(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

function deleteUser(id) {
  return db("users")
    .where({ id })
    .del();
}

async function getUsersAttendingExperiences(id) {
  try {
    console.log("id:", id);
    const event = await db("attendance")
      .join("experiences", "attendance.experience_id", "experiences.id")
      .where("attendance.user_id", id);

    return "user.username", event;
  } catch (error) {}
}

async function deleteUsersAttendingExperiences(id) {
  // try {
  //   console.log("id:", id);
  //   const event = await db("attendance")
  //     .join("experiences", "attendance.experience_id", "experiences.id")
  //     .where("attendance.user_id", id)
  //     .del(event);

  //   return "user.username ", event;
  // } catch (error) {}
  id = await db("attendance").del(attend);

  return id;
}

async function addUsersAttendingExperiences(attend) {
  const id = await db("attendance").insert(attend);

  return id;
}
