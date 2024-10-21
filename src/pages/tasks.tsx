import React, { useState, useEffect, useRef, useContext } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/tasksservice";
import { getProjects } from "../services/projectsservice";
import { Button, Label, TextInput, Modal, Select, Radio } from "flowbite-react";
import { TableComponent } from "../components/Table";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function CreateTaskModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const taskDescriptionRef = useRef(null);
  const taskNameRef = useRef(null);
  const projectIdRef = useRef(null);
  const [projectsId, setProjectsId] = useState(null);

  function createTaskHandler(e) {
    e.preventDefault();
    if (
      taskNameRef.current &&
      taskDescriptionRef.current &&
      projectIdRef.current
    ) {
      createTask(
        projectIdRef.current.value,
        taskNameRef.current.value,
        taskDescriptionRef.current.value,
      ).then((value) => {
        if (value && typeof value !== "boolean") {
          setIsOpen(false);
        }
      });
    }
  }

  useEffect(() => {
    getProjects().then((value) => {
      if (value && typeof value !== "boolean") {
        setProjectsId(value.map((project) => project.id));
      }
    });
  }, []);

  return (
    <>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>New Task</Modal.Header>
        <Modal.Body>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={createTaskHandler}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="projectId" value="Project Id" />
              </div>
              <Select id="projectId" required ref={projectIdRef}>
                {projectsId?.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="taskName" value="Task Name" />
              </div>
              <TextInput
                id="taskName"
                type="text"
                placeholder="Task name."
                required
                ref={taskNameRef}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="taskDescription" value="Task Description" />
              </div>
              <TextInput
                id="taskDescription"
                type="text"
                placeholder="Task description."
                required
                ref={taskDescriptionRef}
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
              <Button type="submit">Create Task</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

function UpdateTaskModal({
  isOpen,
  setIsOpen,
  name,
  description,
  task_id,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  description: string;
  task_id: string;
}) {
  const taskDescriptionRef = useRef(null);
  const taskNameRef = useRef(null);
  const [taskStatus, setTaskStatus] = useState("TODO");

  const [projectsId, setProjectsId] = useState(null);

  function updateTaskHandler(e) {
    e.preventDefault();
    if (taskNameRef.current && taskDescriptionRef.current && taskStatus) {
      updateTask(
        task_id,
        taskNameRef.current.value,
        taskDescriptionRef.current.value,
        taskStatus,
      ).then((value) => {
        if (value && typeof value !== "boolean") {
          setIsOpen(false);
        }
      });
    }
  }

  useEffect(() => {
    getProjects().then((value) => {
      if (value && typeof value !== "boolean") {
        setProjectsId(value.map((project) => project.id));
      }
    });
  }, []);

  return (
    <>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Update Task</Modal.Header>
        <Modal.Body>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={updateTaskHandler}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="taskName" value="Task Name" />
              </div>
              <TextInput
                id="taskName"
                type="text"
                placeholder="Task name."
                required
                ref={taskNameRef}
                value={name}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="taskDescription" value="Task Description" />
              </div>
              <TextInput
                id="taskDescription"
                type="text"
                placeholder="Task description."
                required
                ref={taskDescriptionRef}
                value={description}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <p className="my-2">Task Status</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Radio
                      id="todoRadioInput"
                      name="status"
                      value={taskStatus}
                      onSelect={() => setTaskStatus("TODO")}
                      defaultChecked
                    />
                    <Label htmlFor="todoRadioInput">To Do</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="inprogressRadioInput"
                      name="status"
                      value={taskStatus}
                      onSelect={() => setTaskStatus("IN_PROGRESS")}
                    />
                    <Label htmlFor="inprogressRadioInput">In Progress</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="completeRadioInput"
                      name="status"
                      value={taskStatus}
                      onSelect={() => setTaskStatus("DONE")}
                    />
                    <Label htmlFor="completeRadioInput">DONE</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                color="failure"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update Task</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default function TasksPage() {
  const [projects, setProjects] = useState<Array<any> | null>(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [taskId, setsetTaskId] = useState(null);

  useEffect(() => {
    getTasks().then((value) => {
      if (value && typeof value !== "boolean") {
        setProjects(value);
      }
    });
  }, []);

  function createTaskHandler() {
    setOpenCreateModal(true);
  }

  function deleteTaskHandler(task_id: string) {
    deleteTask(task_id).then((value) => {
      if (value && typeof value !== "boolean") {
        navigate(0);
      }
    });
  }

  function updateTaskHandler(task_id: string) {
    setOpenUpdateModal(true);
    setsetTaskId(task_id);
  }

  return (
    <div className="mt-32 flex flex-col items-center justify-center gap-6">
      <h2 className="text-2xl font-bold">Tasks</h2>
      <div>
        {projects && typeof projects === "object" && projects.length > 0 ? (
          <TableComponent
            tableHeaders={Object.keys(projects[0])}
            tableRows={projects}
            isSubscribe={userContext?.userInfo?.subscription_id}
            onRowDelete={deleteTaskHandler}
            onRowUpdate={updateTaskHandler}
          />
        ) : (
          <p>No tasks</p>
        )}
      </div>
      <div className="my-4">
        <Button onClick={createTaskHandler}>Create Task</Button>
        {openCreateModal && (
          <CreateTaskModal
            isOpen={openCreateModal}
            setIsOpen={setOpenCreateModal}
          />
        )}
      </div>
      <div className="my-4">
        {openUpdateModal && (
          <UpdateTaskModal
            task_id={taskId}
            isOpen={openUpdateModal}
            setIsOpen={setOpenUpdateModal}
          />
        )}
      </div>
    </div>
  );
}
