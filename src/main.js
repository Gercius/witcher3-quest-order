import { questData } from "./data.js";

const tbody = document.querySelector("main table tbody");

const quests = questData;
console.log(quests[1]);
console.log(quests[1].extraDetails.length);

if (quests[10].extraDetails.length) console.log("nice");

for (const quest of quests) {
    const parentTr = document.createElement("tr");

    const locationTd = document.createElement("td");
    locationTd.textContent = quest.location;
    locationTd.rowSpan = quest.extraDetails.length || 1;
    parentTr.append(locationTd);

    const nameTd = document.createElement("td");
    nameTd.textContent = quest.questInfo.name;
    nameTd.rowSpan = quest.extraDetails.length || 1;
    parentTr.append(nameTd);

    const isCompletedTd = document.createElement("td");
    const isCompletedCheckbox = document.createElement("input");
    isCompletedCheckbox.type = "checkbox";
    isCompletedTd.append(isCompletedCheckbox);
    isCompletedTd.rowSpan = quest.extraDetails.length || 1;
    parentTr.append(isCompletedTd);

    // Add the first extra detail (or placeholder if none)
    const firstExtraDetail = quest.extraDetails.length ? quest.extraDetails[0].description : "";
    const firstExtraDetailTd = document.createElement("td");
    firstExtraDetailTd.textContent = firstExtraDetail;
    parentTr.append(firstExtraDetailTd);

    tbody.append(parentTr);

    // Add additional rows for remaining extra details, if any
    if (quest.extraDetails.length > 1) {
        for (let i = 1; i < quest.extraDetails.length; i++) {
            const extraDetailTr = document.createElement("tr");

            const extraDetailsTd = document.createElement("td");
            extraDetailsTd.textContent = quest.extraDetails[i].description || quest.extraDetails[i].hyperlink;
            extraDetailTr.append(extraDetailsTd);

            tbody.append(extraDetailTr);
        }
    }
}