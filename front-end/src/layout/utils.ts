export function camelCaseToProperText(input: string) {
  // Split camelCase string by finding all lowercase letters that are followed by uppercase letters
  // and splitting at those points
  const words = input.split(/(?=[A-Z])/);

  // Join words with a space and capitalize the first letter of each word
  let properText = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  properText = properText.replace("_", " ");

  return properText;
}

export function formatDateField(dateTimeString: string) {
  const date = new Date(dateTimeString);
  const dateString = date.toISOString().split("T")[0];
  return dateString;
}

export function formatTimeField(dateTimeString: string) {
  const date = new Date(dateTimeString);
  const timeString = date.toISOString().split("T")[1].split(".")[0];
  return timeString;
}

export function parseFilter(searchParams: URLSearchParams): string {
  const filterArray: string[] = [];
  searchParams.forEach((value, key) => {
    if (
      value != "" &&
      value != null &&
      value != undefined &&
      key != "size" &&
      key != "page"
    ) {
      if (key === "from_date") {
        filterArray.push(`${key} >= '${formatDate(value, "from_date")}'`);
      } else if (key === "to_date") {
        filterArray.push(`${key} <= '${formatDate(value, "to_date")}'`);
      } else {
        filterArray.push(`${key} = '${value}'`);
      }
    }
  });

  return filterArray.join(" && ");
}

function formatDate(inputDate: string, type: string) {
  // Split the input date string into month, day, and year
  const [month, day, year] = inputDate.split("/");

  let formattedDate = "";

  if (type === "from_date") {
    formattedDate = `${year}-${month}-${day} 00:00:00.000Z`;
  }
  if (type === "to_date") {
    formattedDate = `${year}-${month}-${day} 23:59:59.999Z`;
  }

  return formattedDate;
}

// import { faker } from '@faker-js/faker';

// function getFormattedDate(now: Date) {
// 	const year = now.getUTCFullYear();
// 	const month = String(now.getUTCMonth() + 1).padStart(2, '0');
// 	const day = String(now.getUTCDate()).padStart(2, '0');

// 	const hours = String(now.getUTCHours()).padStart(2, '0');
// 	const minutes = String(now.getUTCMinutes()).padStart(2, '0');
// 	const seconds = String(now.getUTCSeconds()).padStart(2, '0');
// 	const milliseconds = String(now.getUTCMilliseconds()).padStart(3, '0');

// 	const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}Z`;
// 	return formattedDate;
// }

// for (let i = 0; i < 300; i++) {
// 	const employee = faker.person.fullName();
// 	const fromDate = getFormattedDate(faker.date.anytime());
// 	const toDate = getFormattedDate(faker.date.anytime());
// 	const reasons = faker.lorem.sentence();
// 	const data = {
// 		from_date: fromDate,
// 		to_date: toDate,
// 		reasons: reasons,
// 		employee: employee
// 	};
// 	// console.log(data);
// 	(async () => {
// 		try {
// 			const record = await pb.collection('leave').create(data);
// 			console.log(record);
// 		} catch (error: any) {
// 			console.log(error);
// 		}
// 	})();
// }
