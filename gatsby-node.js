const fetch = require(`node-fetch`);

exports.sourceNodes = async ({
	actions: { createNode },
	createContentDigest,
}) => {
	// get data from GitHub API at build time
	const bibleData = await fetch(
		`https://www.revisedenglishversion.com/jsonrevexport.php?permission=yUp&autorun=1&what=bible`
	).then((res) => res.json());
	const appendicesData = await fetch(
		`https://www.revisedenglishversion.com/jsonrevexport.php?permission=yUp&autorun=1&what=appendices`
	).then((res) => res.json());
	const commentaryData = await fetch(
		`https://www.revisedenglishversion.com/jsonrevexport.php?permission=yUp&autorun=1&what=commentary`
	).then((res) => res.json());
	// create node for build time data example in the docs
	createNode({
		bible: bibleData.REV_Bible,
		appendices: appendicesData.REV_Appendices,
		commentary: commentaryData.REV_Commentary,
		id: "rev-build-time-data",
		parent: null,
		children: [],
		internal: {
			type: "rev",
			contentDigest: createContentDigest(bibleData.REV_Bible),
		},
	});
};
