export const langObj: any = {
	uz: "Uz",
	lat: "Lat",
	ru: "Ru"
};
export const langObj2: any = {
	uz: "_uz_cyrl",
	lat: "_uz_latn",
	ru: "_ru"
};

export const getFieldNameByLang = (field: string, version: 1 | 2 = 1) => {
	const localLang: any = localStorage?.getItem("i18nextLng");
	const langObject = version === 1 ? langObj : langObj2;
	return `${field}${langObject[localLang]}`;
};

// For formating summa like: mln | mlrd
export const summaFormater = (sum: number | undefined | null, format: string, prefix: boolean = true, calculate: boolean = true) => {
	const mlrdSum = 1000000000;
	const mlnSum = 1000000;

	const mlrd: any = sum ? (sum / mlrdSum)?.toFixed(1) : 0;
	const mln: any = sum ? (sum / mlnSum)?.toFixed(1) : 0;
	const som: any = sum ? numberFormat(sum) : "0,0";

	const value: any = {
		mlrd: calculate
			? `${Number(mlrd)?.toLocaleString("ru-RU", {
					maximumFractionDigits: 1,
					minimumFractionDigits: 1
			  })} ${prefix ? "млрд сўм" : ""}`
			: mlrd,
		mln: calculate
			? `${Number(mln)?.toLocaleString("ru-RU", {
					maximumFractionDigits: 1,
					minimumFractionDigits: 1
			  })} ${prefix ? "млн сўм" : ""}`
			: mln,
		som: `${som} ${prefix ? "сўм" : ""}`
	};
	return value[format];
};

// Formating summa
export const numberFormat = (num: number = 0, fixedCount = 1, maxDigit: number = 1) =>
	Number((num || 0)?.toFixed(fixedCount))?.toLocaleString("ru-RU", {
		maximumFractionDigits: maxDigit,
		minimumFractionDigits: fixedCount
	});

// For increment sums
export const sumIncrement = (arr: any[], key: any, formatter: any = true) => {
	const array = arr?.reduce((prev: any, next: any) => (prev += next[key]), 0);
	if (array) {
		return formatter ? numberFormat(array) : array;
	}
	return "0,0";
};

export const DataFormatter = (date: any, prefix: string = ".") => {
	if (date) {
		const d = new Date(date);
		const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
		const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
		const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
		return `${da}${prefix}${mo}${prefix}${ye}`;
	} else {
		return null;
	}
};
