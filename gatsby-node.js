const fetch = require(`node-fetch`);

exports.sourceNodes = async ({
	actions: { createNode },
	createContentDigest,
}) => {
	// get data from GitHub API at build time
	const result = await fetch(
		`https://www.revisedenglishversion.com/jsonrevexport.php?permission=yUp&autorun=1&what=bible`
	);
	const resultData = await result.json();
	// create node for build time data example in the docs
	createNode({
		rev: {
			bible: resultData.REV_Bible,
		},
		id: "rev-build-time-data",
		parent: null,
		children: [],
		internal: {
			type: "rev",
			contentDigest: createContentDigest(resultData.REV_Bible),
		},
	});
};
