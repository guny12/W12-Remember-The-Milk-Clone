const express = require("express");
const apiTaskRouter = express.Router();
const { requireAuth } = require("../auth");
const { Task, Project } = require("../db/models");
const { asyncHandler, deleteItem, findCurrentProjectId } = require("./utils");

apiTaskRouter.delete(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const { taskEventId, urlId } = req.body;
		// console.log(urlId, "URL ID 12 -----------------------------");
		const currentTask = urlId[1] === "task" ? urlId[0] : null;
		console.log(currentTask, "==================== CURRENT TASK");
		const task = await Task.findByPk(taskEventId);

		// REDIRECT BACK TO PROJECT/ID page if you delete current task from inside notes
		let currentProjectId = await findCurrentProjectId(urlId);
		console.log(currentProjectId, "CURRENT PROJECTID ----------------------");
		try {
			await deleteItem(taskEventId, Task);
		} catch (error) {
			console.log(error);
			// use next(error) and fix up if you want to allow non Owners to delete project
		}

		const allTasks = await Task.findAll({ where: { projectId: task.projectId } });
		res.json([allTasks, currentTask, currentProjectId]);
	})
);

module.exports = apiTaskRouter;
