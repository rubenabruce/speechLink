"use strict";

// Selecting the surrounding records div for malnipulation
const recordList = document.querySelector(".record-list");

// Retreiving records from JSON object
// Done in a way where it would be a reusable function for the future for retieving other JSON objects
const getJSON = async (recordsPath) => {
	let promise = await fetch(recordsPath);
	let recordsJson = await promise.json();
	return recordsJson;
};

// Function to update the DOM with fetched records
const initChildRecords = async () => {
	const fetchedRecords = await getJSON("./childRecords.json");
	let childRecords = fetchedRecords.children;

	for (let i = 0; i < childRecords.length; i++) {
		const record = document.createElement("div");
		record.classList.add("record");
		record.innerHTML += `<span class='record-name'>${childRecords[i].forname} ${childRecords[i].surname}</span><span>DOB: ${childRecords[i].date_of_birth}</span>`;
		recordList.appendChild(record);
	}
};

// Code for setting list in alphevetical order
const setAlphebetically = () => {
	const key = (a) => a.querySelector(".record-name").textContent.trim();

	Array.from(recordList.children)
		.sort((a, b) => key(a).localeCompare(key(b)))
		.forEach((child) => recordList.appendChild(child));
};

// Code for searching specific names
const searchForename = () => {
	const searchParam = document.getElementById("search-box").value;
	// If user doesn't specify anything then it'll load all children
	if (!searchParam) {
		Array.from(recordList.children).forEach((childNode) => {
			childNode.style.display = "block";
		});
	} else {
		Array.from(recordList.children).forEach((child) =>
			child.innerText.toLowerCase().includes(searchParam.toLowerCase())
				? (child.style.display = "block")
				: (child.style.display = "none")
		);
	}
};

// Calling on initalising of records at page load
initChildRecords();

// If the enter key is pressed then it'll run the searchForename function to aid UX
document.addEventListener("keyup", function (event) {
	if (event.code === "Enter") {
		searchForename();
	}
});
