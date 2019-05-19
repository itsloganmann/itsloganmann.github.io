async function fetchBooking(url, status) {
	const jwt = localStorage.getItem('jwt');
	let dataFromdb = [];
	let contentStrings = [];
	await fetch(url, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + jwt
		}
	}).then((res) => {
		return res.json()
	}).then((db) => {
		dataFromdb = db
	}).catch(error => console.log(error));
	console.log(dataFromdb);
	function build() {
		for (i = 0; i < dataFromdb.length; i++) {
			if (status == "pending") {
				contentStrings[i] = "<div class='card-panel col-md-5'>"
					+ "<div class='price-card-text-wrapper'><div class='price-card-text-lg'>$" + dataFromdb[i].cost.toFixed(2) + "</div><div class='price-card-text-sm'>pending</div></div>"
					+ "<div class='card-text-lg'>" + dataFromdb[i].startTime.split("T")[0] + "</div>"
					+ "<div class='card-text-md'>" + (dataFromdb[i].startTime.split("T")[1].split(":00.000Z")[0]).replace(/^0+/, '') + "-"
					+ (dataFromdb[i].endTime.split("T")[1].split(":00.000Z")[0]).replace(/^0+/, '') + "</div>"
					+ "<div class='card-text-md'>Charger: " + dataFromdb[i].cName + "</div>"
					+ "<div class='card-text-sm'>" + dataFromdb[i].city + ", " + dataFromdb[i].province + "</div>"
					+ "</div></div>";
			}
			else if (status == "complete") {
				contentStrings[i] = "<div class = 'col-11 tab-section-data row'><div class='card-panel col-md-5'>"
					+ "<div class='right'><div class='cost'>" + dataFromdb[i].cost + "</div></div>"
					+ "<div class = 'date'>" + dataFromdb[i].startTime.split("T")[0] + "</div>"
					+ "<div class = 'address'>" + dataFromdb[i].address + "</div>" + "<div class ='city'>" + dataFromdb[i].city
					+ "<div class = 'province'>" + dataFromdb[i].province + "</div>" + "<div class='hostName'>"
					+ dataFromdb[i].host + "</div>" + "</div></div>"
			}
			else {
				contentStrings[i] = "<div class='card-panel col-md-5'><div class='price-card-text-wrapper'>"
					+ "<div class='price-card-text-lg'>$" + dataFromdb[i].cost.toFixed(2) 
					+ "</div><div class='price-card-text-sm "
					+ ((status == "paid") ? "green-highlight" : "orange-highlight") + "'>" + status + "</div></div>"
					+ "<div class='card-text-lg " + ((status == "paid") ? "green-highlight" : "orange-highlight") + "'>" + dataFromdb[i].startTime.split("T")[0] + "</div>"
					+ "<div class='card-text-md'>" + (dataFromdb[i].startTime.split("T")[1].split(":00.000Z")[0]).replace(/^0+/, '') + "-"
					+ (dataFromdb[i].endTime.split("T")[1].split(":00.000Z")[0]).replace(/^0+/, '') + "</div>"
					+ ((status == "paid") ? "<div class='card-text-sm'>" + dataFromdb[i].address + "</div>" : "<div class='card-text-md'> Charger: " + dataFromdb[i].cName + "</div>")
					+ "<div class='card-text-sm'>" + dataFromdb[i].city + ", " + dataFromdb[i].province + "</div>"
					+ "</div></div>";
			}
		}

	};
	$("#tab-content").children().remove();
	build();
	return contentStrings;

};