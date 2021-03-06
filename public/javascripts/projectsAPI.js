import { projectFieldInnerHtml, urlIdIdentifier } from "./api-utils.js";

window.addEventListener("DOMContentLoaded", async () => {
	const projectsTilesContainer = document.querySelector(".projectsTilesContainer");


	//set event listener for click
	//on click stop propagation
	//event target should be a ref
	
	projectsTilesContainer.addEventListener("submit", async (event) => {
		event.preventDefault();
		const eventProjectId = event.target.id;
		const urlId = urlIdIdentifier(window.location.href);
		try {
			const response = await fetch("/api-projects/", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ eventProjectId, urlId }),
			});
			const projects = await response.json();
			if (projects[1] == eventProjectId) window.location.href = "/projects";
			projectsTilesContainer.innerHTML = "";
			if (projects.length) projectFieldInnerHtml(projects[0]);
			else return;
		} catch (err) {
			console.error("DONE GOOFED IN projectsAPI.js trycatch", err);
		}
	});
});

// html functions down here
