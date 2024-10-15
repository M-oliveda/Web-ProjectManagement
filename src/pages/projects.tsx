import React, { useState, useEffect, useRef, useContext } from "react";
import {
  addNewProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../services/api_service";
import { Button, Label, TextInput, Modal } from "flowbite-react";
import { TableComponent } from "../components/Table";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function CreateProjectModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const projectDescriptionRef = useRef(null);
  const projectNameRef = useRef(null);

  function createProjectHandler(e) {
    e.preventDefault();
    if (projectNameRef.current && projectDescriptionRef.current) {
      addNewProject(
        projectNameRef.current.value,
        projectDescriptionRef.current.value,
      ).then((value) => {
        if (value && typeof value !== "boolean") {
          setIsOpen(false);
        }
      });
    }
  }

  return (
    <>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={createProjectHandler}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="projectName" value="Project Name" />
              </div>
              <TextInput
                id="projectName"
                type="text"
                placeholder="Project name."
                required
                ref={projectNameRef}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="projectDescription"
                  value="Project Description"
                />
              </div>
              <TextInput
                id="projectDescription"
                type="text"
                placeholder="Project name."
                required
                ref={projectDescriptionRef}
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                color="failure"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Project</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

function UpdateProjectModal({
  isOpen,
  setIsOpen,
  name,
  description,
  project_id,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  description: string;
  project_id: string;
}) {
  const projectDescriptionRef = useRef(null);
  const projectNameRef = useRef(null);

  function updateProjectHandler(e) {
    e.preventDefault();
    if (projectNameRef.current && projectDescriptionRef.current) {
      updateProject(
        project_id,
        projectNameRef.current.value,
        projectDescriptionRef.current.value,
      ).then((value) => {
        if (value && typeof value !== "boolean") {
          setIsOpen(false);
        }
      });
    }
  }

  return (
    <>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={updateProjectHandler}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="projectName" value="Project Name" />
              </div>
              <TextInput
                id="projectName"
                type="text"
                placeholder="Project name."
                required
                ref={projectNameRef}
                value={name}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="projectDescription"
                  value="Project Description"
                />
              </div>
              <TextInput
                id="projectDescription"
                type="text"
                placeholder="Project name."
                required
                ref={projectDescriptionRef}
                value={description}
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                color="failure"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update Project</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Array<any> | null>(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    getProjects().then((value) => {
      if (value && typeof value !== "boolean") {
        setProjects(value);
      }
    });
  }, []);

  function createProjectHandler() {
    setOpenCreateModal(true);
  }

  function deleteProjectHandler(project_id: string) {
    deleteProject(project_id).then((value) => {
      if (value && typeof value !== "boolean") {
        navigate(0);
      }
    });
  }

  function updateProjectHandler(project_id: string) {
    setOpenUpdateModal(true);
    setProjectId(project_id);
  }

  return (
    <div className="mt-32 flex flex-col items-center justify-center gap-6">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div>
        {projects && typeof projects === "object" && projects.length > 0 ? (
          <TableComponent
            tableHeaders={Object.keys(projects[0])}
            tableRows={projects}
            isSubscribe={userContext?.userInfo?.subscription_id}
            onRowDelete={deleteProjectHandler}
            onRowUpdate={updateProjectHandler}
          />
        ) : (
          <p>No projects</p>
        )}
      </div>
      <div className="my-4">
        <Button onClick={createProjectHandler}>Create Project</Button>
        {openCreateModal && (
          <CreateProjectModal
            isOpen={openCreateModal}
            setIsOpen={setOpenCreateModal}
          />
        )}
      </div>
      <div className="my-4">
        {openUpdateModal && (
          <UpdateProjectModal
            project_id={projectId}
            isOpen={openUpdateModal}
            setIsOpen={setOpenUpdateModal}
          />
        )}
      </div>
    </div>
  );
}
