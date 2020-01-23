const db = require("../../database/dbConfig.js");

module.exports = {
  addExperience,
  getExperiences,
  getExperienceById,
  deleteExperience,
  editExperience,
  getExperienceWithUserById
};

///// EXPERIENCE /////
async function addExperience(newExperience) {
  const [id] = await db("experiences").insert(newExperience);
  return getExperiences();
}

function getExperiences() {
  return db("experiences");
}
function getExperienceById(id) {
  return db("experiences")
    .where({ id })
    .first();
}

function deleteExperience(id) {
  return db("experiences")
    .where({ id })
    .del();
}

function editExperience(id, changes) {
  return db("experiences")
    .where({ id })
    .update(changes);
}

function getExperienceWithUserById(id) {
  return db("experiences")
    .where({ "experiences.user_id": id })
    .first()
    .join("users", "users.id", "experiences.user_id")
    .select(
      "users.id",
      "users.username",
      "users.first_name",
      "users.last_name",
      "users.email",
      "users.city"
    );
}
