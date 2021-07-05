const { projects } = require("./Projects");

async function projectDetails() {
  const projects_Detaile = await projects();

  const neededProjects = [
    "b.12469613-6f90-42c3-b49c-4bb22e440e30",
    "b.c74e65d3-cb3f-4863-9378-479ce0d4f995",
    "b.79a6bff3-34b1-435f-8964-282f78ae1ef5", //*
    "b.0063f0d4-abdc-4d09-851e-3aa550c8dc81",
    "b.5449d573-5229-45c1-832c-371769347b35",
    "b.5172f7a8-7376-4765-a871-ba3b8fcce946",
    "b.b85d407c-f4ed-41d1-b42a-2796292dbf0b",
    "b.302c59a2-597e-4eea-9540-f4a83b6862d9",
    "b.9a7ce2f5-2391-4bf5-8da6-aaacedaab911",

    "b.218d67d8-ac96-4d87-9ea6-80d380ac4d61",
    "b.a9a41e9c-3a75-4fca-bb88-acd926c7bbdc",
    "b.1f7a0c34-b82d-4ed0-b118-7d9c4a73ec80",
    "b.0630eed8-da2c-411f-8633-9e6e356d31c9",
    "b.6beb8bd5-a3df-494f-b4fd-02aa88e623c3",
    "b.4bfecd50-0f6b-4486-8e68-fbf5259d2333",
    "b.40365bf1-68ff-4782-91ed-9e8c404aa9c2",
    "b.b5fe1a20-d41d-4d55-b8b8-26afdac22b55",
    "b.cd4a18ca-ce41-4674-ab00-aa14603f1733",
  ];

  const oldId = await projects_Detaile.filter((detail) => {
    const isInclude = neededProjects.includes(detail.id);
    if (isInclude) {
      return true;
    } else {
      false;
    }
  });
  const neededIds = projects_Detaile.map((project) => {
    // console.log(project.id);
    return { projectId: project.id, projectName: project.attributes.name };
  });

  return neededIds;
}

module.exports = { projectDetails };
