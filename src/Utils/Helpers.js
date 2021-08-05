import fire from "../Firebase/firebase";

export const GeneralHelpers = {
  uniqueAppVersions: (users) => {
    const appVersions = users.filter((appVersion) => {
      return appVersion.version !== undefined;
    });

    const versions = appVersions.map((v) => {
      return v.version;
    });

    let uniqueVersions = [];
    versions.forEach((c) => {
      if (!uniqueVersions.includes(c)) {
        uniqueVersions.push(c);
      }
    });
    return uniqueVersions.sort((a, b) => {
      return a - b;
    });
  },
  fetchDatabaseRecord: (node) => {
    const nodeList = [];
    var dbNodeRef = fire.database().ref().child(node);
    dbNodeRef.on("value", (snap) => {
      const node = snap.val();
      for (let n in node) {
        nodeList.push(node[n]);
      }
    });
    return nodeList;
  },
};
