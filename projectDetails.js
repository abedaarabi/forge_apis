const { projects } = require("./Projects");

async function projectDetails() {
  const projects_Detaile = await projects();
  // console.log(projects_Detaile);

  const neededProjects = [
    "b.12469613-6f90-42c3-b49c-4bb22e440e30",
    "b.c74e65d3-cb3f-4863-9378-479ce0d4f995",
    "b.79a6bff3-34b1-435f-8964-282f78ae1ef5",
    "b.0063f0d4-abdc-4d09-851e-3aa550c8dc81",
    "b.5449d573-5229-45c1-832c-371769347b35",
    "b.5172f7a8-7376-4765-a871-ba3b8fcce946",
    "b.b85d407c-f4ed-41d1-b42a-2796292dbf0b",
    "b.302c59a2-597e-4eea-9540-f4a83b6862d9",
  ];

  const oldId = await projects_Detaile.filter((detail) => {
    const isInclude = neededProjects.includes(detail.id);
    if (isInclude) {
      return true;
    } else {
      false;
    }
  });
  const neededIds = oldId.map((project) => {
    return { projectId: project.id, projectName: project.attributes.name };
  });

  return neededIds;
}
projectDetails();
module.exports = { projectDetails };
